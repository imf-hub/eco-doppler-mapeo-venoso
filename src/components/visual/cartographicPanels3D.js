import {diagramBackground,markSVG,EXAMPLE_MAP,MAP_VIEWS} from '../../data/cartographyModel.js';

// Original cartographic drawings from the existing educational case; no PDF figures are copied.
export async function buildCartographicPanels(T){
 const group=new T.Group(),panels=[],disposables=[];
 for(let view=0;view<3;view++){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="1440" viewBox="0 0 200 480"><rect width="200" height="480" rx="7" fill="#f5f3ef"/>${diagramBackground(view,'derecho')}${EXAMPLE_MAP.entries.filter(e=>e.view===view).map(e=>markSVG(e)).join('')}<text x="100" y="16" text-anchor="middle" font-family="Arial" font-size="7" fill="#54687b">DERECHO · CASO SIMULADO</text></svg>`;
  const blob=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const img=new Image();await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=blob;});URL.revokeObjectURL(blob);
  const canvas=document.createElement('canvas');canvas.width=600;canvas.height=1440;canvas.getContext('2d').drawImage(img,0,0);const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
  const geometry=new T.PlaneGeometry(2.15,5.16),material=new T.MeshBasicMaterial({map:texture,transparent:true,opacity:1,side:T.DoubleSide});const panel=new T.Mesh(geometry,material);panel.position.set([-4.1,3.05,5.65][view],.15,.7);group.add(panel);panels.push(panel);disposables.push(texture);
  const frameGeometry=new T.EdgesGeometry(geometry),frameMaterial=new T.LineBasicMaterial({color:0x81b2cd,transparent:true,opacity:.7}),frame=new T.LineSegments(frameGeometry,frameMaterial);frame.position.z=-.015;panel.add(frame);
 }
 return {group,panels,disposables,update:(phase,camera)=>panels.forEach((panel,i)=>{panel.quaternion.copy(camera.quaternion);panel.material.opacity=.45+.55*Math.min(1,Math.max(0,phase*3-i+.5));})};
}
