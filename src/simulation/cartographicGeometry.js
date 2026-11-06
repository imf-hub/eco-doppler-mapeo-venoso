// Geometry of drawing conventions only. No anatomical or diagnostic inference.
export function validContour(points){
 if(!Array.isArray(points)||points.length<3)return false;
 const orient=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
 const on=(a,b,c)=>Math.abs(orient(a,b,c))<1e-8&&c[0]>=Math.min(a[0],b[0])&&c[0]<=Math.max(a[0],b[0])&&c[1]>=Math.min(a[1],b[1])&&c[1]<=Math.max(a[1],b[1]);
 let area=0;
 for(let i=0;i<points.length;i++){
  const a=points[i],b=points[(i+1)%points.length];area+=a[0]*b[1]-b[0]*a[1];
  if(Math.hypot(b[0]-a[0],b[1]-a[1])<1e-8)return false;
  for(let j=i+2;j<points.length;j++){
   if(i===0&&j===points.length-1)continue;
   const c=points[j],d=points[(j+1)%points.length],o1=orient(a,b,c),o2=orient(a,b,d),o3=orient(c,d,a),o4=orient(c,d,b);
   if((o1*o2<0&&o3*o4<0)||on(a,b,c)||on(a,b,d)||on(c,d,a)||on(c,d,b))return false;
  }
 }
 return Math.abs(area)>1e-8;
}
export function perpendicularMarks(points,{crosses=false,spacing=crosses?16:12}={}){
 const marks=[];
 for(let i=1;i<points.length;i++){
  const [ax,ay]=points[i-1],[bx,by]=points[i],length=Math.hypot(bx-ax,by-ay);
  if(length<1e-9)continue;
  const tx=(bx-ax)/length,ty=(by-ay)/length,nx=-ty,ny=tx;
  for(let d=7;d<length;d+=spacing){
   const x=ax+tx*d,y=ay+ty*d;
   if(crosses){for(const sign of [-1,1])marks.push([[x-tx*3-nx*3*sign,y-ty*3-ny*3*sign],[x+tx*3+nx*3*sign,y+ty*3+ny*3*sign]]);}
   else marks.push([[x-nx*4,y-ny*4],[x+nx*4,y+ny*4]]);
  }
 }
 return marks;
}
export function contourHatch(points,spacing=4){
 if(points.length<3)return [];
 const lines=[],root=Math.SQRT1_2;
 for(const sign of [-1,1]){
  const d=[root,sign*root],n=[-sign*root,root],projection=p=>p[0]*n[0]+p[1]*n[1];
  const low=Math.min(...points.map(projection)),high=Math.max(...points.map(projection));
  for(let offset=Math.ceil(low/spacing)*spacing;offset<high;offset+=spacing){
   const intersections=[];
   for(let i=0;i<points.length;i++){
    const a=points[i],b=points[(i+1)%points.length],pa=projection(a),pb=projection(b);
    if((pa<=offset&&pb>offset)||(pb<=offset&&pa>offset)){
     const t=(offset-pa)/(pb-pa),x=a[0]+t*(b[0]-a[0]),y=a[1]+t*(b[1]-a[1]);
     intersections.push(x*d[0]+y*d[1]);
    }
   }
   intersections.sort((a,b)=>a-b);
   for(let j=0;j+1<intersections.length;j+=2)lines.push(intersections.slice(j,j+2).map(t=>[d[0]*t+n[0]*offset,d[1]*t+n[1]*offset]));
  }
 }
 return lines;
}
