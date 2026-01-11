/**
 * Utilidades generales
 */

/**
 * Formatea el nombre de un plato para mostrarlo correctamente
 * - Convierte guiones bajos (_) a espacios
 * - Capitaliza la primera letra de cada palabra
 * 
 * @param {string} name - Nombre del plato con guiones bajos
 * @returns {string} - Nombre formateado
 * 
 * @example
 * formatDishName("padellino_pan_de_ajo") // "Padellino Pan De Ajo"
 */
export function formatDishName(name) {
  if (!name) return "";
  
  return name
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
