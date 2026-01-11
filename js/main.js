/**
 * Archivo principal de la aplicación
 * Inicializa todos los módulos y configura los event listeners
 */

import { renderFeed } from "./renderFeed.js";
import { renderMenu } from "./renderMenu.js";
import { initSwipe } from "./swipe.js";
import { state } from "./state.js";
import { switchView, toggleSideMenu, closeSideMenu } from "./navigation.js";
import { menuData } from "./data.js";
import { renderCategories } from "./categories.js";
import { translatePage } from "./translations.js";

// ============================================
// INICIALIZACIÓN
// ============================================

// Renderizar contenido inicial
renderFeed();
renderMenu(menuData, state.lang);
renderCategories();

// ============================================
// MENÚ HAMBURGUESA
// ============================================

// Toggle del menú lateral al hacer click
document.getElementById("burgerBtn").addEventListener("click", toggleSideMenu);

// Cerrar menú lateral al hacer click fuera
document.addEventListener("click", (e) => {
  const sideMenu = document.getElementById("sideMenu");
  const burgerBtn = document.getElementById("burgerBtn");
  
  if (!sideMenu.contains(e.target) && 
      e.target !== burgerBtn && 
      !sideMenu.classList.contains("hidden")) {
    closeSideMenu();
  }
});

// ============================================
// SELECTOR DE IDIOMA
// ============================================

const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");
const langCodes = { es: "ES", en: "EN", it: "IT", fr: "FR", de: "DE" };

// Actualizar texto del botón de idioma
function updateLangButton() {
  langBtn.textContent = langCodes[state.lang] || "ES";
}
updateLangButton();

// Abrir/cerrar menú de idiomas
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langMenu.classList.toggle("hidden");
});

// Cerrar menú de idiomas al hacer click fuera
document.addEventListener("click", (e) => {
  if (!langMenu.contains(e.target) && e.target !== langBtn) {
    langMenu.classList.add("hidden");
  }
});

// Cambiar idioma al seleccionar uno
document.querySelectorAll(".lang-option").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const lang = btn.dataset.lang;
    state.lang = lang;
    updateLangButton();
    langMenu.classList.add("hidden");
    
    // Actualizar contenido con el nuevo idioma
    translatePage(lang);
    renderFeed();
    renderMenu(menuData, lang);
    renderCategories();
  });
});

// ============================================
// NAVEGACIÓN DEL FEED (DESKTOP)
// ============================================

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Botón anterior
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (state.itemIndex > 0) {
      state.itemIndex--;
      renderFeed();
    }
  });
}

// Botón siguiente
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    const category = menuData[state.categoryIndex];
    if (state.itemIndex < category.items.length - 1) {
      state.itemIndex++;
      renderFeed();
    }
  });
}

// ============================================
// SWIPE PARA MÓVILES
// ============================================

initSwipe(
  document.getElementById("feed"),
  // Siguiente plato (swipe up)
  () => {
    const category = menuData[state.categoryIndex];
    if (state.itemIndex < category.items.length - 1) {
      state.itemIndex++;
      renderFeed();
    }
  },
  // Plato anterior (swipe down)
  () => {
    if (state.itemIndex > 0) {
      state.itemIndex--;
      renderFeed();
    }
  }
);

// ============================================
// NAVEGACIÓN FOOTER
// ============================================

// Cambiar entre vista Feed y Menú
document.querySelectorAll("footer button").forEach(btn => {
  btn.onclick = () => switchView(btn.dataset.view);
});
