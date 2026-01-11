/**
 * Sistema de detección de alérgenos en los ingredientes
 */

// Mapa de alérgenos y palabras clave para detectarlos en los ingredientes
const ALLERGENS_MAP = {
  "Lácteos": [
    "mozzarella", "burrata", "ricotta", "parmigiano",
    "pecorino", "gorgonzola", "scamorza", "nata",
    "queso", "bufala", "caciocavallo", "stracciatella",
    "bocconcino", "crema", "mantequilla", "formaggio"
  ],
  "Huevo": [
    "huevo", "yema", "ovo", "uovo"
  ],
  "Pescado": [
    "anchoas", "anchois", "atún", "thon", "salmón", "salmon", "salmone",
    "tonno", "acciughe", "sardinas", "pescado", "pesce"
  ],
  "Crustáceos": [
    "gambas", "gamberi", "camarones", "langostinos"
  ],
  "Frutos secos": [
    "nueces", "noci", "pistacchio", "pistacho", "pistache",
    "avellanas", "almendras"
  ],
  "Apio": [
    "apio", "sedano"
  ],
  "Sulfitos": [
    "sulfito", "solfiti"
  ]
};

// Platos que NO contienen gluten (excepciones)
const NO_GLUTEN_ITEMS = [
  "scamorza",
  "caciocavallo",
  "ensalada_mozzarella_bufala",
  "burrata_affumicata_pugliese"
];

/**
 * Detecta todos los alérgenos presentes en los ingredientes de un plato
 * @param {string} ingredientsText - Texto con los ingredientes
 * @param {string} itemId - ID del plato para verificar excepciones de gluten
 * @returns {Array<string>} - Lista de alérgenos detectados
 */
export function getAllergensFromIngredients(ingredientsText, itemId = null) {
  if (!ingredientsText) return [];
  
  const text = ingredientsText.toLowerCase();
  const detected = [];

  // Normalizar texto: eliminar acentos para mejor matching
  const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedText = normalize(text);

  // Añadir Gluten por defecto (excepto para platos sin gluten)
  if (!itemId || !NO_GLUTEN_ITEMS.includes(itemId)) {
    detected.push("Gluten");
  }

  // Buscar otros alérgenos en los ingredientes
  for (const [allergen, keywords] of Object.entries(ALLERGENS_MAP)) {
    const found = keywords.some(keyword => {
      const normalizedKeyword = normalize(keyword);
      const regex = new RegExp(`\\b${normalizedKeyword}\\b`, "i");
      return regex.test(normalizedText);
    });
    
    if (found && !detected.includes(allergen)) {
      detected.push(allergen);
    }
  }
  
  // Ordenar: Gluten primero, luego alfabéticamente
  detected.sort((a, b) => {
    if (a === "Gluten") return -1;
    if (b === "Gluten") return 1;
    return a.localeCompare(b);
  });

  return detected;
}
