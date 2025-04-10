// ###############PUNTERO###############

//Velocidad del puntero
let followSpeed = 0.1;

const circle = document.getElementById("circuloCursor");

let ratonX = window.innerWidth / 2;
let ratonY = window.innerHeight / 2;
let circuloX = ratonX;
let circuloY = ratonY;

document.addEventListener("mousemove", (e) => {
  ratonX = e.clientX;
  ratonY = e.clientY;
});

function animate() {
  if (circle) {
    circuloX += (ratonX - circuloX) * followSpeed;
    circuloY += (ratonY - circuloY) * followSpeed;
    circle.style.transform = `translate(${circuloX}px, ${circuloY}px)`;
  }
  requestAnimationFrame(animate);
}

animate(); // SIEMPRE se ejecuta (en todas las páginas)


// ###############CARGA PÁGINAS###############

if (window.location.pathname.includes("CARGADOR.html")) {
  const params = new URLSearchParams(window.location.search);
  const nextPage = params.get("to") || "Index.html";

  setTimeout(() => {
    window.location.href = nextPage;
  }, 1600); // Duración de la animación
}


// ########### ANIMACIÓN SCROLL DE TEXTOS SINCRONIZADOS ###########

function sincronizarMarquees() {
  const velocidadPxPorSegundo = 100;
  const marquees = document.querySelectorAll('.marquee-content');

  marquees.forEach(marquee => {
    const spans = marquee.querySelectorAll('span');
    if(spans.length === 0) return;
    
    // Calculamos el ancho de un span + su padding
    const ancho = spans[0].scrollWidth + parseInt(window.getComputedStyle(spans[0]).paddingRight);
    
    // Ajustamos la duración para que sea perfectamente continua
    const duracion = (ancho * 2) / velocidadPxPorSegundo; // Multiplicamos por 2 por el contenido duplicado
    
    marquee.style.animationDuration = `${duracion}s`;
  });
}

// Ejecutar al cargar
window.addEventListener("load", sincronizarMarquees);
// Y también si cambias el tamaño de la ventana
window.addEventListener("resize", sincronizarMarquees);

