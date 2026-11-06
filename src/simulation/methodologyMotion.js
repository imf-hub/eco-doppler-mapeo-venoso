const poses={standing:0,reverse:-Math.PI/4,supine:-Math.PI/2};
export const METHOD_TRACE={baseline:143,startX:38,pixelsPerSecond:74.4,releaseX:186.8,reverseEndX:250.04};
const smooth=x=>{const t=Math.max(0,Math.min(1,x));return t*t*(3-2*t);};

// These values drive original conceptual drawings, never clinical presets.
export function interpolateVisual(from,to,progress){
 const t=smooth(progress),result={...(t<.5?from:to)};
 for(const key of ['level','rotation','pressure','tilt'])result[key]=(from[key]??0)+((to[key]??0)-(from[key]??0))*t;
 result.poseAngle=(from.poseAngle??poses[from.position]??0)+((to.poseAngle??poses[to.position]??0)-(from.poseAngle??poses[from.position]??0))*t;
 return result;
}
export function beamFlowAngle(rotation,tilt){return Math.acos(Math.min(1,Math.abs(Math.sin(rotation*Math.PI/180)*Math.sin(tilt*Math.PI/180))))*180/Math.PI;}
// Animate the intended action. Centering is not a pressure-release maneuver.
// Pressure numbers are illustration coordinates, not clinical force settings.
export function animateAcquisitionGesture(state,frameId,progress){
 const phase=Math.max(0,Math.min(1,progress)),result={...state};
 if(state.kind==='scan')result.level=Math.max(0,state.level-18)+phase*18;
 if(state.kind==='orient')result.tilt=state.tilt*phase;
 if(state.kind==='compression')result.pressure=frameId==='liberar-y-completar'?90*(1-phase):state.pressure>=90?phase*state.pressure:0;
 return result;
}
export function preparedForReflux(state){return !!(state.support&&state.unloaded&&['standing','reverse'].includes(state.position));}
export function scanCoverage(levels){
 const clean=levels.filter(Number.isFinite).map(v=>Math.min(100,Math.max(0,v)));
 const bins=new Set(clean.map(v=>Math.min(7,Math.floor(v/12.5))));
 const span=clean.length?Math.max(...clean)-Math.min(...clean):0;
 return {bins:bins.size,span,complete:bins.size>=6&&span>=65};
}
export function reviewedMethodology(guide,completed,stepId){return guide.frames.every(frame=>completed.includes(`method-${stepId}-${frame.id}`));}
