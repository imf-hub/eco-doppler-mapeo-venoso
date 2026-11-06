import {createMapSVG,MAP_CONDITIONS,MAP_VIEWS} from './data/cartographyModel.js';

// Built-in PDF fonts support Spanish accents, but not arbitrary Unicode symbols.
const printable=value=>String(value??'').replace(/[\u2010-\u2015]/g,'-').replace(/≥/g,'>=').replace(/≤/g,'<=').replace(/…/g,'...');

export async function exportMapPDF(entries,meta){
 const {jsPDF}=await import('jspdf');
 const svg=createMapSVG(entries,meta,{includeReport:false});
 const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
 try{
  const image=new Image();
  await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(new Error('No se pudo preparar el mapa para PDF. Usa SVG o JSON como copia.'));image.src=url;});
  const canvas=document.createElement('canvas');canvas.width=image.naturalWidth*2;canvas.height=image.naturalHeight*2;
  const ctx=canvas.getContext('2d');if(!ctx)throw new Error('No se pudo crear la exportación gráfica.');
  ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);
  const pdf=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
  const scale=Math.min(273/canvas.width,182/canvas.height),w=canvas.width*scale,h=canvas.height*scale;
  pdf.addImage(canvas.toDataURL('image/png'),'PNG',(297-w)/2,10,w,h,undefined,'FAST');
  let y=23;
  function reportPage(){pdf.addPage();y=23;pdf.setTextColor('#a80f32');pdf.setFont('helvetica','bold');pdf.setFontSize(15);pdf.text('IMF · Registro de cartografía educativa',12,14);pdf.setFont('helvetica','normal');pdf.setFontSize(10);pdf.setTextColor('#39495b');}
  function ensure(height){if(y+height>192)reportPage();}
  function block(label,value){
   const lines=pdf.splitTextToSize(printable(value||'Por documentar'),273);
   ensure(14);pdf.setFont('helvetica','bold');pdf.text(label,12,y);y+=5;pdf.setFont('helvetica','normal');
   for(const line of lines){ensure(6);pdf.text(line,12,y);y+=5;}y+=3;
  }
  reportPage();
  block('Caso ficticio y lateralidad',`${meta.code} · Miembro ${meta.side}`);
  block('Pregunta clínica del ejercicio',meta.indication);
  block('Posición y maniobra',`${meta.position||'Por documentar'} · ${meta.maneuver||'Por documentar'}`);
  block('Informe descriptivo',meta.notes);
  block('Limitaciones',meta.limitations);
  ensure(20);pdf.setFont('helvetica','bold');pdf.text('Registro de hallazgos: cotejar cada fila con el mapa y la evidencia dúplex',12,y);y+=7;
  for(const entry of entries){
   const measure=[entry.diameter&&`Diámetro ${entry.diameter} mm`,entry.reflux&&`Retrógrado ${entry.reflux} s`,entry.length&&`Longitud ${entry.length} cm`,entry.height&&`Altura ${entry.height} cm desde ${entry.reference||'referencia pendiente'}`,entry.flowRole,entry.wall&&'Engrosamiento parietal',entry.synechiae&&'Sinequias',entry.surgery&&'Safenectomía documentada'].filter(Boolean).join(' · ');
   const identity=`${entry.label||'Sin identificación'} · ${MAP_VIEWS[entry.view]} · ${MAP_CONDITIONS[entry.condition]?.name||'Anotación'}${entry.region?' · '+entry.region:''}`;
   const lines=pdf.splitTextToSize(printable(measure||'Sin medidas consignadas'),273);
   ensure(12+lines.length*5);pdf.setDrawColor('#dde3e9');pdf.line(12,y-3,285,y-3);pdf.setFont('helvetica','bold');pdf.text(printable(identity),12,y);y+=5;pdf.setFont('helvetica','normal');
   for(const line of lines){ensure(6);pdf.text(line,12,y);y+=5;}y+=3;
  }
  const total=pdf.getNumberOfPages();
  for(let page=1;page<=total;page++){pdf.setPage(page);pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor('#667487');pdf.text('EJERCICIO FICTICIO · Revisión documental; no certifica validez anatómica, hemodinámica ni competencia clínica.',12,202);pdf.text(`${page} / ${total}`,285,202,{align:'right'});}
  pdf.setProperties({title:'Cartografía educativa IMF',subject:'Ejercicio ficticio. No utilizar como informe clínico.'});
  pdf.save('mapa-venoso-practica.pdf');return true;
 }finally{URL.revokeObjectURL(url);}
}

