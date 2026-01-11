/**
 * Detección de gestos swipe (deslizar) para móviles
 * Permite cambiar de plato deslizando hacia arriba o abajo
 */

/**
 * Inicializa la detección de gestos swipe en un contenedor
 * @param {HTMLElement} container - Elemento donde detectar el swipe
 * @param {Function} onSwipeUp - Función a ejecutar al deslizar hacia arriba (siguiente)
 * @param {Function} onSwipeDown - Función a ejecutar al deslizar hacia abajo (anterior)
 */
export function initSwipe(container, onSwipeUp, onSwipeDown) {
  let startY = 0;
  let isSwiping = false;

  // Guardar posición inicial del toque
  container.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
    isSwiping = false;
  }, { passive: true });

  // Prevenir el pull-to-refresh cuando se está deslizando
  container.addEventListener("touchmove", e => {
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    const absDiff = Math.abs(diff);
    
    // Si el deslizamiento es vertical y significativo
    if (absDiff > 10) {
      isSwiping = true;
      
      // Prevenir pull-to-refresh en cualquier dirección cuando hay un swipe activo
      // Esto evita que el navegador intente refrescar la página
      if (absDiff > 20) {
        e.preventDefault();
      }
    }
  }, { passive: false });

  // Detectar dirección del deslizamiento
  container.addEventListener("touchend", e => {
    if (!isSwiping) return;
    
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    
    // Deslizamiento mínimo de 50px para activar
    if (diff > 50) {
      e.preventDefault(); // Prevenir cualquier comportamiento por defecto (pull-to-refresh)
      onSwipeUp(); // Deslizar hacia arriba = siguiente
    } else if (diff < -50) {
      e.preventDefault(); // Prevenir cualquier comportamiento por defecto
      onSwipeDown(); // Deslizar hacia abajo = anterior
    }
    
    isSwiping = false;
  }, { passive: false });
}
