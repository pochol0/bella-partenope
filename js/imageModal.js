/**
 * Sistema de modal de imagen
 * Abre la imagen del plato a pantalla completa
 */

/**
 * Abre el modal con la imagen del plato
 * @param {string} imageSrc - Ruta de la imagen
 * @param {string} imageAlt - Texto alternativo de la imagen
 */
export function openImageModal(imageSrc, imageAlt) {
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt || "Imagen del plato";
  imageModal.classList.remove("hidden");
}

/**
 * Cierra el modal de imagen
 */
export function closeImageModal() {
  document.getElementById("imageModal").classList.add("hidden");
}

// Inicializar eventos de cierre
const imageModal = document.getElementById("imageModal");
if (imageModal) {
  // Cerrar al hacer click en cualquier parte del modal
  imageModal.addEventListener("click", closeImageModal);
  
  // Evitar que se cierre al hacer click en la imagen
  const modalImage = document.getElementById("modalImage");
  if (modalImage) {
    modalImage.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
}

