// Interpolate an orbit around its point of interest; never take a chord through the model.
export function cameraPose(from,to,progress){
 const t=Math.max(0,Math.min(1,progress)),u=t*t*(3-2*t),mix=(a,b)=>a+(b-a)*u;
 const spherical=pose=>{const v=pose.position.map((x,i)=>x-pose.target[i]),r=Math.hypot(...v)||1;return {r,theta:Math.atan2(v[0],v[2]),phi:Math.acos(Math.max(-1,Math.min(1,v[1]/r)))};};
 const a=spherical(from),b=spherical(to),delta=((b.theta-a.theta+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
 const theta=a.theta+delta*u,phi=mix(a.phi,b.phi),radius=mix(a.r,b.r),target=from.target.map((v,i)=>mix(v,to.target[i]));
 return {target,position:[radius*Math.sin(phi)*Math.sin(theta),radius*Math.cos(phi),radius*Math.sin(phi)*Math.cos(theta)].map((v,i)=>v+target[i])};
}
