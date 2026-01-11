/**
 * Renderizado y manejo del menú lateral de categorías
 */

import { menuData } from "./data.js";
import { state } from "./state.js";
import { renderFeed } from "./renderFeed.js";
import { closeSideMenu, switchView } from "./navigation.js";

/**
 * Renderiza todas las categorías en el menú lateral
 */
export function renderCategories() {
  const categoriesNav = document.getElementById("categories");
  categoriesNav.innerHTML = "";

  menuData.forEach((category, index) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.className = "category-btn";
    categoryBtn.textContent = category.name[state.lang] || category.name["es"];
    
    categoryBtn.addEventListener("click", () => {
      state.categoryIndex = index;
      state.itemIndex = 0;
      
      // Si estamos en modo feed, cambiar la categoría
      if (state.view === "feed") {
        renderFeed();
        closeSideMenu();
      } else {
        // Si estamos en modo menú, hacer scroll hasta la categoría
        switchView("menu");
        closeSideMenu();
        
        // Scroll suave hasta la categoría seleccionada
        setTimeout(() => {
          const categoryElement = document.getElementById(`category-${category.id}`);
          if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    });
    
    categoriesNav.appendChild(categoryBtn);
  });
}
