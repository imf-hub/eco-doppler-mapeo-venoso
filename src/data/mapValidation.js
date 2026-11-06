// Educational documentation checks only. No inference of diagnosis or anatomical correctness.
const normal = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
const textPresent = value => normal(value).length > 0;
const numberValue = value => {
  if (value === '' || value === null || value === undefined) return null;
  if (typeof value !== 'number' && typeof value !== 'string') return NaN;
  if (typeof value === 'string' && !value.trim()) return null;
  return Number(typeof value === 'string' ? value.trim().replace(',', '.') : value);
};
const knownConditions = new Set(['competent', 'reflux', 'ablated', 'thrombosed', 'lymph', 'nonvascular', 'unknown', 'not-evaluated']);
const named = (entry, vein) => new RegExp(`(?:^|[^a-z])${vein}(?:$|[^a-z])`, 'i').test(normal(entry.label));
const vascularType = entry => ['vessel', 'perforator', 'gulf'].includes(entry.type);
const unavailable = entry => ['annotation', 'note'].includes(entry.type) && /no evaluad|no visualiz|no interpretable|limitad/.test(normal(entry.label));
const referenceText = entry => entry.reference || entry.distanceReference || '';

/**
 * Returns documentation and data-integrity issues for a fictitious learning map.
 * It does not validate vessel identity, competence, reflux thresholds, or treatment.
 * Existing entries use {id,view,type,label,condition,plane,points,diameter,reflux,length,height,reference}.
 * Optional extensions: entry.region, entry.flowRole and meta.indication, meta.views, meta.limitations.
 */
export function validateEducationalMap(entries, meta = {}) {
  const issues = [];
  const push = (id, severity, message, entryId) => issues.push({id, severity, message, ...(entryId ? {entryId} : {})});
  if (!Array.isArray(entries)) {
    push('entries-invalid', 'error', 'No se pudo leer la lista de elementos del ejercicio. Recupera una copia válida antes de continuar.');
    return issues;
  }
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) {
    push('metadata-invalid', 'error', 'Los datos de identificación del ejercicio no son válidos.');
    meta = {};
  }
  if (!entries.length) push('map-empty', 'warning', 'El mapa está vacío. Representa los ejes evaluados o registra de forma explícita las limitaciones.');
  if (!textPresent(meta.code)) push('case-code-missing', 'warning', 'Asigna un código ficticio para relacionar el mapa con su informe de práctica.');
  if (!['derecho', 'izquierdo', 'derecha', 'izquierda', 'right', 'left'].includes(normal(meta.side))) push('side-missing', 'error', 'Identifica el miembro derecho o izquierdo; la lateralidad no se puede deducir del dibujo.');
  if (!textPresent(meta.position)) push('position-missing', 'warning', 'Registra la posición real utilizada en la exploración del caso.');
  if (!textPresent(meta.maneuver)) push('maneuver-missing', 'warning', 'Registra la maniobra empleada; un valor de reflujo aislado no permite reconstruir cómo se obtuvo.');
  if (!textPresent(meta.indication || meta.clinicalQuestion)) push('indication-missing', 'warning', 'Añade la indicación o pregunta clínica del caso ficticio.');
  if (!textPresent(meta.notes)) push('report-missing', 'warning', 'Falta el informe descriptivo: documenta hallazgos, condiciones de adquisición y limitaciones.');
  if (Array.isArray(meta.views)) {
    const views = new Set(meta.views.map(view => typeof view === 'number' ? view : normal(view)));
    const numbered = [0,1,2].every(view => views.has(view));
    const namedViews = ['anteroexterna','anterointerna','posterior'].every(view => [...views].some(v => typeof v === 'string' && v.replace(/[-\s]/g, '') === view));
    if (!numbered && !namedViews) push('views-incomplete', 'warning', 'La salida debe mostrar las tres caras: anteroexterna, anterointerna y posterior. Una cara puede quedar sin elementos cuando corresponda.');
  } else {
    push('views-confirm', 'info', 'Comprueba que la exportación conserva las tres plantillas; no es necesario duplicar el mismo vaso en todas las caras.');
  }

  const validEntries = entries.filter(entry => entry && typeof entry === 'object' && !Array.isArray(entry));
  if (validEntries.length !== entries.length) push('entry-invalid', 'error', 'Hay un elemento ilegible en el ejercicio. Revísalo o recupéralo desde una copia válida.');
  const ids = new Set();
  for (let i = 0; i < validEntries.length; i++) {
    const entry = validEntries[i], id = textPresent(entry.id) ? String(entry.id) : `element-${i+1}`;
    if (ids.has(id)) push(`duplicate-${id}`, 'error', 'Dos elementos comparten el mismo identificador. Deben conservarse como registros distintos.', id);
    ids.add(id);
    if (!textPresent(entry.label)) push(`label-${id}`, 'warning', 'Identifica la vena, estructura o limitación que representa este elemento.', id);
    if (!Number.isInteger(entry.view) || entry.view < 0 || entry.view > 4) push(`view-${id}`, 'error', 'El elemento no tiene una cara o ampliación válida asignada.', id);
    const pointsValid = Array.isArray(entry.points) && entry.points.length > 0 && entry.points.every(p => Array.isArray(p) && p.length >= 2 && Number.isFinite(p[0]) && Number.isFinite(p[1]));
    if (!pointsValid) push(`points-${id}`, 'error', 'La posición del elemento contiene coordenadas inválidas. No puede exportarse con fiabilidad.', id);
    else if (entry.type === 'vessel' && entry.points.length < 2) push(`path-${id}`, 'error', 'Un trayecto necesita al menos dos puntos distintos.', id);
    else if (entry.type === 'vessel' && entry.points.every(p => p[0] === entry.points[0][0] && p[1] === entry.points[0][1])) push(`path-${id}`, 'warning', 'Los puntos del trayecto coinciden. Revisa que la vena tenga una representación visible.', id);
    if (vascularType(entry) && !textPresent(entry.condition)) push(`condition-missing-${id}`, 'error', 'La vena no tiene una condición documentada. No permitas que un color por defecto sustituya el hallazgo.', id);
    if (textPresent(entry.condition) && !knownConditions.has(entry.condition)) push(`condition-${id}`, 'warning', 'La condición elegida no pertenece a la leyenda disponible. Revísala antes de compartir el ejercicio.', id);
    if (vascularType(entry) && ['lymph', 'nonvascular'].includes(entry.condition)) push(`vascular-color-${id}`, 'error', 'El verde y el amarillo identifican estructuras no venosas. Revisa el tipo de elemento o su código de color.', id);
    if (entry.type === 'oval' && !['lymph','nonvascular','unknown','not-evaluated'].includes(entry.condition)) push(`structure-color-${id}`, 'warning', 'Para una estructura no vascular usa el código correspondiente: verde linfoganglionar o amarillo para las demás.', id);

    for (const [field, title, strictlyPositive, unusual] of [['diameter','diámetro en mm',true,100],['reflux','duración en s',false,30],['length','longitud en cm',true,150],['height','altura en cm',false,150]]) {
      const value = numberValue(entry[field]);
      if (value === null) continue;
      if (!Number.isFinite(value) || value < 0 || (strictlyPositive && value === 0)) push(`${field}-${id}`, 'error', `Revisa el ${title}: debe ser un número ${strictlyPositive?'mayor que cero':'no negativo'}.`, id);
      else if (value > unusual) push(`${field}-unit-${id}`, 'warning', `Comprueba la unidad y la magnitud del ${title}. El programa no determina si el valor es clínicamente correcto.`, id);
    }
    if (entry.condition === 'reflux' && vascularType(entry) && numberValue(entry.reflux) === null) push(`reflux-evidence-${id}`, 'warning', 'El trayecto está marcado como incompetente. Vincúlalo con su registro hemodinámico y duración en el informe; no deduzcas la condición por el diámetro.', id);
    if (entry.type !== 'perforator' && numberValue(entry.height) !== null && !textPresent(referenceText(entry))) push(`height-reference-${id}`, 'warning', 'La altura necesita una referencia anatómica explícita y unidad en cm.', id);
    if (entry.type === 'perforator') {
      if (numberValue(entry.diameter) === null) push(`pv-diameter-${id}`, 'warning', 'Registra el diámetro de la perforante, medido a nivel fascial, en mm.', id);
      if (numberValue(entry.height) === null) push(`pv-height-${id}`, 'warning', 'Localiza la perforante con una altura en cm y su referencia anatómica.', id);
      if (!textPresent(referenceText(entry))) push(`pv-reference-${id}`, 'warning', 'Para localizar esta perforante especifica la referencia: planta del pie en pierna o pliegue de rodilla en muslo.', id);
      if (!textPresent(entry.flowRole) && !/fuga|reentrada/.test(normal(entry.label))) push(`pv-role-${id}`, 'info', 'Describe si la perforante participa como fuga o reentrada en el circuito demostrado; su presencia o diámetro no bastan para inferirlo.', id);
    }
    if (['epifascial','synechiae','wall','surgery','aplasia','hypoplasia'].includes(entry.plane)) push(`stroke-confirm-${id}`, 'info', 'Confirma el plano o antecedente que justifica este trazo. El código no acredita por sí mismo la anatomía, trombosis previa o tratamiento.', id);
  }

  for (const vein of ['gsv','ssv']) {
    const veins = validEntries.filter(entry => named(entry, vein) && vascularType(entry));
    const limited = validEntries.some(entry => named(entry, vein) && unavailable(entry));
    if (!veins.length && !limited) push(`${vein}-missing`, 'warning', `No hay representación identificada de ${vein.toUpperCase()}. Inclúyela incluso si es competente, o documenta su variante o limitación demostrada.`);
    else if (limited) push(`${vein}-limited`, 'info', `${vein.toUpperCase()} figura como no evaluada. Conserva el motivo en el informe y evita una conclusión de estudio completo normal.`);
    if (veins.length && !veins.some(entry => Number.isFinite(numberValue(entry.diameter)) && numberValue(entry.diameter) > 0) && !veins.every(entry => ['ablated','not-evaluated','unknown'].includes(entry.condition) || entry.plane === 'aplasia')) push(`${vein}-diameter-missing`, 'warning', `Faltan medidas de diámetro para ${vein.toUpperCase()}; registra el nivel y la convención de medición.`);
  }
  const gsv = validEntries.filter(entry => named(entry, 'gsv') && vascularType(entry) && Number.isFinite(numberValue(entry.diameter)) && numberValue(entry.diameter) > 0);
  const thigh = gsv.some(entry => /muslo|thigh/.test(normal(entry.region)));
  const calf = gsv.some(entry => /pierna|calf|pantorrilla/.test(normal(entry.region)));
  if (gsv.length && (!thigh || !calf)) push('gsv-levels-confirm', 'info', 'Identifica al menos una medida de GSV en muslo y otra en pierna cuando sean evaluables. Las medidas repetidas en proyecciones distintas no sustituyen esos dos niveles.');
  push('clinical-review-required', 'info', 'Estas comprobaciones revisan documentación y formato. No validan la anatomía, el diagnóstico, la calidad dúplex ni la competencia del explorador.');
  return issues;
}

export default validateEducationalMap;
