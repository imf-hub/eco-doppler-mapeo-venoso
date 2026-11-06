export function appRoot(){return new URL('.',document.baseURI);}
export function methodologyHref(step='',moment=''){
 return new URL('mapeo/'+(step?encodeURIComponent(step)+'/':'')+(moment?encodeURIComponent(moment)+'/':''),appRoot()).href;
}
export function glossaryHref(term=''){
 return new URL('glosario/'+(term?encodeURIComponent(term)+'/':''),appRoot()).href;
}
export function consensusHref(chapter=''){
 return new URL('consenso/'+(chapter?encodeURIComponent(chapter)+'/':''),appRoot()).href;
}
export function readAcademyRoute(){
 const hash=window.location.hash.slice(1);
 if(hash&&!hash.startsWith('seccion-')){const [page,detail='',moment='']=hash.split('/');return {page,detail:decodeURIComponent(detail),moment:decodeURIComponent(moment)};}
 const path=window.location.pathname.slice(appRoot().pathname.length).split('/').filter(Boolean);
 return ['mapeo','glosario','consenso'].includes(path[0])?{page:path[0],detail:decodeURIComponent(path[1]||''),moment:decodeURIComponent(path[2]||'')}:{page:'mapeo',detail:'',moment:''};
}
