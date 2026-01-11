/**
 * Funciones de navegación entre vistas y menús
 */

import { state } from "./state.js";

/**
 * Cambia entre las vistas Feed y Menú
 * @param {string} view - "feed" o "menu"
 */
export function switchView(view) {
  state.view = view;
  
  // Remover clase active de todas las vistas
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  
  // Activar la vista seleccionada
  document.getElementById(`${view}View`).classList.add("active");
}

/**
 * Muestra u oculta el menú lateral de categorías
 */
export function toggleSideMenu() {
  document.getElementById("sideMenu").classList.toggle("hidden");
}

/**
 * Cierra el menú lateral de categorías
 */
export function closeSideMenu() {
  document.getElementById("sideMenu").classList.add("hidden");
}
