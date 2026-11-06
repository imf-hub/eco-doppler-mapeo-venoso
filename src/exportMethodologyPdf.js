import {methodologyByStep} from './data/methodology.js';
import {mappingSteps,mappingSources} from './data/mapping.js';
const printable=s=>String(s).replace(/[\u2010-\u2015]/g,'-').replace(/≥/g,'>=').replace(/≤/g,'<=').replace(/…/g,'...');
export async function exportMethodologyPDF(){
 const {jsPDF}=await import('jspdf');const pdf=new jsPDF({unit:'mm',format:'a4'});let page=1,y=0;
 function header(){pdf.setTextColor('#a80f32');pdf.setFont('helvetica','bold');pdf.setFontSize(16);pdf.text('Aula IMF · Guía de metodología',15,18);pdf.setFont('helvetica','normal');pdf.setFontSize(9);pdf.setTextColor('#566d80');pdf.text('Eco-Doppler y mapeo venoso · Apoyo para práctica supervisada · Edición 1.2',15,25);y=36;}
 function nextPage(){pdf.addPage();page++;header();}
 function ensure(h){if(y+h>273)nextPage();}
 function lines(value,{bold=false,color='#425d73',size=10,indent=0,gap=4.6}={}){pdf.setFont('helvetica',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor(color);const all=pdf.splitTextToSize(printable(value),180-indent);for(const line of all){ensure(gap);pdf.setFont('helvetica',bold?'bold':'normal');pdf.setFontSize(size);pdf.setTextColor(color);pdf.text(line,15+indent,y);y+=gap;}}
 header();lines('Orden de trabajo: prepara, adquiere, comprueba y documenta.',{bold:true,size:11});lines('Adapta posición y técnica al objetivo y a la tolerancia. Si falta evidencia, repite o documenta la limitación. Los esquemas web no sustituyen un protocolo ni certifican destreza clínica.',{size:9.5});y+=5;
 for(const step of mappingSteps){const guide=methodologyByStep[step.id];const estimate=14+guide.quickGuide.reduce((n,s)=>n+pdf.splitTextToSize(printable(s),174).length*4.6,0)+pdf.splitTextToSize(printable('Detente y corrige: '+guide.stopRule),180).length*4.2+9;ensure(Math.min(estimate,90));pdf.setDrawColor('#d8e2ea');pdf.line(15,y-3,195,y-3);lines(`${String(step.number).padStart(2,'0')} · ${step.title}`,{bold:true,color:'#8e2f4c',size:11});y+=1;guide.quickGuide.forEach((line,i)=>lines(`${i+1}. ${line}`,{indent:3}));y+=2;lines('Detente y corrige: '+guide.stopRule,{color:'#886239',size:9.5,gap:4.2});y+=7;}
 ensure(35);lines('Fuentes y alcance',{bold:true,size:12});lines('El consenso latinoamericano regula representación. AIUM y SVS/AVF/AVLS complementan adquisición, posición, maniobras y documentación. Guías y demostraciones originales; no son un estudio clínico ni una garantía de ausencia de errores.',{size:9.5});
 for(const id of ['consensus','aium','svs']){const s=mappingSources[id];ensure(18);lines(s.title,{bold:true,size:9});lines(s.url,{size:8,color:'#496e8d',gap:4});y+=3;}
 const total=pdf.getNumberOfPages();for(let p=1;p<=total;p++){pdf.setPage(p);pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor('#6b7f92');pdf.text('Material educativo · No introducir datos identificables de pacientes en el aula web.',15,287);pdf.text(`${p} / ${total}`,195,287,{align:'right'});}
 pdf.setProperties({title:'Guía de metodología de mapeo venoso · Aula IMF',subject:'Preparación, adquisición, comprobación y documentación. Material educativo.'});pdf.save('guia-metodologia-mapeo-venoso-imf.pdf');return true;
}
