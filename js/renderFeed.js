/**
 * Renderizado de la vista Feed (estilo TikTok)
 * Muestra un plato a la vez en pantalla completa
 */

import { menuData } from "./data.js";
import { state } from "./state.js";
import { openInfoModal } from "./modal.js";
import { formatDishName } from "./utils.js";

/**
 * Renderiza el feed con el plato actual de la categoría seleccionada
 */
export function renderFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  const category = menuData[state.categoryIndex];
  
  // Asegurar que el índice esté dentro de los límites
  if (state.itemIndex >= category.items.length) {
    state.itemIndex = category.items.length - 1;
  }
  if (state.itemIndex < 0) {
    state.itemIndex = 0;
  }
  
  const item = category.items[state.itemIndex];
  const formattedName = formatDishName(item.name);

  // Crear contenedor del plato
  const div = document.createElement("div");
  div.className = "feed-item";

  div.innerHTML = `
    <img src="${item.image}" alt="${formattedName}">
    <div class="feed-info">
      <h2>${formattedName}</h2>
      <span>${item.price}</span>
      <p>${item.description[state.lang] || item.description["es"]}</p>
    </div>
    <button class="info-btn" data-item-id="${item.id}">ℹ️</button>
  `;

  // Agregar evento al botón de información
  const infoBtn = div.querySelector(".info-btn");
  infoBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openInfoModal(item, state.lang);
  });

  feed.appendChild(div);
}
