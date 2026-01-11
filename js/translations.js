/**
 * Sistema de traducciones de la aplicación
 * Contiene todos los textos traducibles en los diferentes idiomas
 */

// Textos traducibles por idioma
export const translations = {
  es: {
    presentation: "Presentación",
    menu: "Menú",
    ingredients: "Ingredientes",
    allergens: "Alérgenos",
    noneDetected: "Ninguno detectado",
    notAvailable: "No disponible"
  },
  en: {
    presentation: "Presentation",
    menu: "Menu",
    ingredients: "Ingredients",
    allergens: "Allergens",
    noneDetected: "None detected",
    notAvailable: "Not available"
  },
  it: {
    presentation: "Presentazione",
    menu: "Menù",
    ingredients: "Ingredienti",
    allergens: "Allergeni",
    noneDetected: "Nessuno rilevato",
    notAvailable: "Non disponibile"
  },
  fr: {
    presentation: "Présentation",
    menu: "Menu",
    ingredients: "Ingrédients",
    allergens: "Allergènes",
    noneDetected: "Aucun détecté",
    notAvailable: "Non disponible"
  },
  de: {
    presentation: "Präsentation",
    menu: "Menü",
    ingredients: "Zutaten",
    allergens: "Allergene",
    noneDetected: "Keine erkannt",
    notAvailable: "Nicht verfügbar"
  }
};

/**
 * Actualiza los textos de la página según el idioma seleccionado
 * @param {string} lang - Código del idioma (es, en, it, fr, de)
 */
export function translatePage(lang) {
  // Actualizar atributo lang del HTML
  document.documentElement.lang = lang;
  
  // Los botones del footer mantienen sus iconos (no se traducen)
}
