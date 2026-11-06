export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const wavelengthMM=frequencyMHz=>1540/(frequencyMHz*1000);
export const echoMicroseconds=depthCM=>2*(depthCM/100)/1540*1e6;
export const dopplerHz=(frequencyMHz,velocityCMS,angle)=>2*frequencyMHz*1e6*(velocityCMS/100)*Math.cos(angle*Math.PI/180)/1540;
export const aliasFrequency=(hz,prfHz)=>((hz+prfHz/2)%prfHz+prfHz)%prfHz-prfHz/2;
export const refluxThreshold=segment=>['femoral-comun','femoral','poplitea'].includes(segment)?1:0.5;
export function loadSaved(key,fallback){try{const data=JSON.parse(localStorage.getItem('imf-eco-'+key));if(Array.isArray(fallback))return Array.isArray(data)?data.filter(x=>typeof x==='string'):fallback;if(fallback&&typeof fallback==='object')return data&&typeof data==='object'&&!Array.isArray(data)?data:fallback;return data??fallback;}catch{return fallback;}}
export function save(key,value){try{localStorage.setItem('imf-eco-'+key,JSON.stringify(value));return true;}catch{return false;}}
export function download(name,content,type='application/json'){const a=document.createElement('a');const url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
export const escapeXML=s=>String(s??'').replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
