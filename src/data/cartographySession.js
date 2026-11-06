import {DEFAULT_META,parseMap} from './cartographyModel.js';

export const blankCartography=()=>({entries:[],meta:{...DEFAULT_META,views:[0,1,2]}});

// Opening the editor never paints a recovered exercise onto a fresh template.
// Recovery is explicit; reading a copy must not write back to storage.
export function startCartographySession(saved){
 const model=blankCartography();
 if(!saved)return {model,recovery:null,error:''};
 try{const recovery=parseMap(saved);return {model,recovery:recovery.entries.length||recovery.meta.notes?recovery:null,error:''};}
 catch{return {model,recovery:null,error:'La copia guardada no pudo leerse. Se conserva sin modificar; puedes recuperar una copia JSON válida.'};}
}

// UI consistency with the consensus' shared dotted stroke for aplasia/ablation.
// Choosing a stroke alone never classifies the clinical condition.
export function changeMarkCondition(mark,condition){
 const next={...mark,condition};
 if(mark.type==='vessel'){
  if(['ablated','aplastic'].includes(condition))next.plane='aplasia';
  else if(mark.plane==='aplasia')next.plane='subfascial';
 }
 return next;
}
export function changeMarkPlane(mark,plane){
 const next={...mark,plane},special=['ablated','aplastic'].includes(mark.condition);
 if((plane==='aplasia'&&!special)||(plane!=='aplasia'&&special))next.condition='';
 return next;
}
