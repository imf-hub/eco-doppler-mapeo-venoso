"""Fetch accepted HeyGen assets only; never requests or retries synthesis."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import json, urllib.request, urllib.parse, hashlib, subprocess, unicodedata, re

ROOT=Path(__file__).resolve().parents[1]
JOBS={j['id']:j for j in json.loads((ROOT/'output/narration-v9/jobs.json').read_text(encoding='utf-8'))}
TARGET=ROOT/'public/media/concept-films'
TARGET.mkdir(parents=True,exist_ok=True)
normalize=lambda s:re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower())
def tc(t,separator='.'):
 ms=round(t*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02}{separator}{ms%1000:03}'
def prepare(path):
 raw=json.loads(path.read_text(encoding='utf-8'))
 if raw.get('isError'):return None
 r=json.loads(next(c['text'] for c in raw['content'] if c['type']=='text'))
 if not r.get('audio_url'):return None
 concept=path.name.removesuffix('-response.json');job=JOBS[concept]
 assert re.fullmatch(r'[a-z0-9-]+',concept)
 temp=TARGET/(concept+'.download.mp3')
 existing=list(TARGET.glob(concept+'-*.mp3'))
 if existing:temp=existing[-1]
 else:
  assert urllib.parse.urlparse(r['audio_url']).hostname.endswith('.heygen.ai')
  with urllib.request.urlopen(r['audio_url'],timeout=90) as response,temp.open('wb') as out:
   while chunk:=response.read(128*1024):out.write(chunk)
 assert temp.stat().st_size>1000
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration:stream=codec_name','-of','json',str(temp)],text=True))
 duration=float(probe['format']['duration']);assert any(s['codec_name']=='mp3' for s in probe['streams'])
 assert abs(duration-r['duration'])<.5,(concept,duration,r['duration'])
 sha=hashlib.sha256(temp.read_bytes()).hexdigest();filename=concept+'-'+sha[:12]+'.mp3';final=TARGET/filename
 if temp!=final:temp.replace(final)
 groups=[[]]
 for w in r.get('word_timestamps',[]):
  if w['word'].startswith('<break'):groups.append([])
  elif not w['word'].startswith('<'):groups[-1].append(w)
 groups=[g for g in groups if g]
 assert len(groups)==len(job['scenes']),(concept,'No alinea el número de tomas')
 for words,text in zip(groups,job['scenes']):
  assert normalize(' '.join(w['word'] for w in words))==normalize(text),(concept,'La transcripción no coincide')
 cues=[{'start':0 if i==0 else words[0]['start'],'end':groups[i+1][0]['start'] if i+1<len(groups) else duration,'text':job['scenes'][i]} for i,words in enumerate(groups)]
 captions=[]
 for words in groups:
  chunk=[]
  for w in words:
   if chunk and (len(' '.join(x['word'] for x in chunk+[w]))>74 or w['end']-chunk[0]['start']>6.5):
    captions.append({'start':chunk[0]['start'],'end':chunk[-1]['end'],'text':' '.join(x['word'] for x in chunk)});chunk=[]
   chunk.append(w)
  if chunk:captions.append({'start':chunk[0]['start'],'end':chunk[-1]['end'],'text':' '.join(x['word'] for x in chunk)})
 metadata={'id':concept,'file':filename,'duration':duration,'providerDuration':r['duration'],'hash':sha,'provider':'HeyGen','voiceId':job['voiceId'],'voiceName':'Rocío - Calm & Trustworthy','requestedEngine':'omitted; saved provider default','returnedEngine':r.get('engine'),'requestedSpeed':'omitted','playbackRate':1,'processing':'Original MP3, no speed or audio edits','scriptHash':job['scriptHash'],'ssml':job['text'],'cues':cues,'captions':captions,'word_timestamps':r.get('word_timestamps',[]),'requestId':r.get('request_id'),'sources':job['sources']}
 (TARGET/(concept+'.json')).write_text(json.dumps(metadata,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 (TARGET/(concept+'.vtt')).write_text('WEBVTT\n\n'+'\n\n'.join(f"{tc(c['start'])} --> {tc(c['end'])}\n{c['text']}" for c in captions)+'\n',encoding='utf-8')
 (TARGET/(concept+'.srt')).write_text('\n\n'.join(f"{i+1}\n{tc(c['start'],',')} --> {tc(c['end'],',')}\n{c['text']}" for i,c in enumerate(captions))+'\n',encoding='utf-8')
 return concept,{k:metadata[k] for k in ['file','duration','hash','cues','captions']}

if __name__=='__main__':
 # Each source response is retained locally; the public provenance omits expiring URLs.
 paths=list((ROOT/'output/narration-v9').glob('*-response.json'));manifest={};errors=[]
 with ThreadPoolExecutor(max_workers=4) as pool:
  for f in as_completed({pool.submit(prepare,p):p for p in paths}):
   try:
    result=f.result()
    if result:manifest[result[0]]=result[1]
   except Exception as e:errors.append(str(e))
 out=ROOT/'src/data/conceptFilmAudio.json';previous=json.loads(out.read_text()) if out.exists() else {}
 previous.update(manifest);out.write_text(json.dumps(previous,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(json.dumps({'accepted':len(previous),'missing':[k for k in JOBS if k not in previous],'errors':errors},ensure_ascii=False))
 if errors:raise SystemExit(1)
