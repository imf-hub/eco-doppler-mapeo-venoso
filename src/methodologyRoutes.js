export function appRoot(){return new URL('.',document.baseURI);}
export function methodologyHref(step='',moment=''){
 return new URL('mapeo/'+(step?encodeURIComponent(step)+'/':'')+(moment?encodeURIComponent(moment)+'/':''),appRoot()).href;
}
export function readAcademyRoute(){
 const hash=window.location.hash.slice(1);
 if(hash&&!hash.startsWith('seccion-')){const [page,detail='',moment='']=hash.split('/');return {page,detail:decodeURIComponent(detail),moment:decodeURIComponent(moment)};}
 const path=window.location.pathname.slice(appRoot().pathname.length).split('/').filter(Boolean);
 return path[0]==='mapeo'?{page:'mapeo',detail:decodeURIComponent(path[1]||''),moment:decodeURIComponent(path[2]||'')}:{page:'mapeo',detail:'',moment:''};
}
