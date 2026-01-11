/**
 * Renderizado de la vista Menú (lista horizontal de platos)
 * Muestra todas las categorías con sus platos en formato de cards
 */

import { openModal } from "./modal.js";
import { formatDishName } from "./utils.js";
import { openImageModal } from "./imageModal.js";

/**
 * Renderiza el menú completo con todas las categorías y platos
 * @param {Array} data - Datos del menú (categorías y platos)
 * @param {string} lang - Idioma para mostrar nombres y descripciones
 */
export function renderMenu(data, lang = "es") {
  const menuList = document.getElementById("menuList");
  menuList.innerHTML = "";

  data.forEach((category, categoryIndex) => {
    // Crear contenedor de categoría
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("menu-category");
    categoryDiv.id = `category-${category.id}`; // ID para navegación por anclas

    // Título de la categoría
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.name[lang] || category.name["es"];
    categoryDiv.appendChild(categoryTitle);

    // Crear card para cada plato de la categoría
    category.items.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("menu-card");

      // Imagen del plato (izquierda) - clickeable
      if (item.image) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = formatDishName(item.name) || "Imagen del plato";
        img.style.cursor = "pointer";
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          openImageModal(item.image, formatDishName(item.name));
        });
        itemDiv.appendChild(img);
      }

      // Contenedor de información (nombre, precio, descripción)
      const infoDiv = document.createElement("div");
      infoDiv.style.flex = "1";

      // Nombre del plato (formateado)
      const itemName = document.createElement("h3");
      itemName.textContent = formatDishName(item.name) || "Nombre no disponible";
      itemName.style.margin = "0 0 4px 0";
      infoDiv.appendChild(itemName);

      // Precio
      const itemPrice = document.createElement("p");
      itemPrice.textContent = item.price || "";
      itemPrice.style.margin = "0 0 4px 0";
      infoDiv.appendChild(itemPrice);

      // Descripción (según idioma)
      const itemDescription = document.createElement("p");
      itemDescription.textContent =
        (item.description && (item.description[lang] || item.description["es"])) || "";
      itemDescription.style.margin = "0";
      infoDiv.appendChild(itemDescription);

      itemDiv.appendChild(infoDiv);

      // Botón de información (esquina inferior derecha)
      const infoBtn = document.createElement("button");
      infoBtn.className = "info-btn";
      infoBtn.textContent = "ℹ️";
      infoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(item, lang);
      });
      itemDiv.appendChild(infoBtn);

      categoryDiv.appendChild(itemDiv);
    });

    menuList.appendChild(categoryDiv);
  });
}
