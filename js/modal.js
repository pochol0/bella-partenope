/**
 * Sistema de modal para mostrar información detallada de los platos
 * Muestra ingredientes y alérgenos de cada plato
 */

import { getAllergensFromIngredients } from "./allergens.js";
import { translations } from "./translations.js";
import { formatDishName } from "./utils.js";

/**
 * Abre el modal con la información del plato seleccionado
 * @param {Object} item - Objeto del plato con sus datos
 * @param {string} lang - Idioma para mostrar la información
 */
export function openInfoModal(item, lang = "es") {
  const modal = document.getElementById("infoModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalIngredients = document.getElementById("modalIngredients");
  const modalAllergens = document.getElementById("modalAllergens");

  // Título del plato (formateado)
  modalTitle.textContent = formatDishName(item.name) || translations[lang].notAvailable;

  // Títulos de secciones traducidos
  document.getElementById("modalIngredientsTitle").textContent = translations[lang].ingredients;
  document.getElementById("modalAllergensTitle").textContent = translations[lang].allergens;

  // Obtener descripción en el idioma seleccionado
  const description = (item.description && (item.description[lang] || item.description["es"])) || "";
  
  // Mostrar ingredientes (separados correctamente)
  showIngredients(modalIngredients, description, lang);

  // Mostrar alérgenos detectados
  showAllergens(modalAllergens, description, item.id, lang);

  // Mostrar el modal
  modal.classList.remove("hidden");
}

/**
 * Muestra los ingredientes separados correctamente
 * @param {HTMLElement} container - Contenedor donde mostrar los ingredientes
 * @param {string} description - Texto con la descripción del plato
 * @param {string} lang - Idioma actual
 */
function showIngredients(container, description, lang) {
  container.innerHTML = "";
  
  if (!description) {
    const li = document.createElement("li");
    li.textContent = translations[lang].notAvailable;
    container.appendChild(li);
    return;
  }

  // Separadores según el idioma
  const separators = {
    es: [" / ", " y "],
    en: [" / ", " and "],
    it: [" / ", " e "],
    fr: [" / ", " et "],
    de: [" / ", " und "]
  };
  
  const currentSeparators = separators[lang] || separators["es"];
  let ingredientsList = [description];
  
  // Aplicar separadores en orden para dividir correctamente
  currentSeparators.forEach(separator => {
    const newList = [];
    ingredientsList.forEach(item => {
      item.split(separator).forEach(part => {
        const trimmed = part.trim();
        if (trimmed) newList.push(trimmed);
      });
    });
    ingredientsList = newList;
  });
  
  // Crear lista de ingredientes
  ingredientsList.forEach(ingredient => {
    const li = document.createElement("li");
    li.textContent = ingredient.trim();
    container.appendChild(li);
  });
}

/**
 * Muestra los alérgenos detectados
 * @param {HTMLElement} container - Contenedor donde mostrar los alérgenos
 * @param {string} description - Texto con la descripción del plato
 * @param {string} itemId - ID del plato para verificar excepciones
 * @param {string} lang - Idioma actual
 */
function showAllergens(container, description, itemId, lang) {
  container.innerHTML = "";
  
  const allergens = getAllergensFromIngredients(description, itemId);
  
  if (allergens.length > 0) {
    allergens.forEach(allergen => {
      const li = document.createElement("li");
      li.textContent = allergen;
      container.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.textContent = translations[lang].noneDetected;
    container.appendChild(li);
  }
}

/**
 * Cierra el modal de información
 */
export function closeInfoModal() {
  document.getElementById("infoModal").classList.add("hidden");
}

// Inicializar eventos de cierre del modal
const closeBtn = document.getElementById("closeModal");
const modalContainer = document.getElementById("infoModal");

// Cerrar al hacer click en la X
if (closeBtn) {
  closeBtn.addEventListener("click", closeInfoModal);
}

// Cerrar al hacer click fuera del contenido del modal
if (modalContainer) {
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      closeInfoModal();
    }
  });
}

// Función de compatibilidad para el menú (usa el mismo modal)
export function openModal(item, lang = "es") {
  openInfoModal(item, lang);
}
