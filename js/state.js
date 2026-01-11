/**
 * Estado global de la aplicación
 * Guarda la vista actual, idioma, categoría e ítem seleccionado
 */
export const state = {
  view: "feed",        // Vista actual: "feed" o "menu"
  lang: "es",          // Idioma actual: es, en, it, fr, de
  categoryIndex: 0,    // Índice de la categoría actual
  itemIndex: 0         // Índice del plato actual dentro de la categoría
};
