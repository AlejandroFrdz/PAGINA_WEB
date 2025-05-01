// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  // ##########################################
  // ########## FUNCIÓN ORDENAR TEXTO #########
  // ##########################################

  function ordenarTexto(targetSelector, finalText, options = {}) {
    const caracteres = options.chars || "*-X!$0_?@~";
    const iteracionesPorLetra = options.iterations || 20;
    const velocidad = options.speed || 1000;

    const spans = document.querySelectorAll(targetSelector);
    const letrasFinales = finalText.split("");

    spans.forEach((span, i) => {
      if (!span || i >= letrasFinales.length) return;

      const letraFinal = letrasFinales[i];
      let iteracion = 0;

      function animarLetra() {
        if (iteracion >= iteracionesPorLetra) {
          span.textContent = letraFinal;
          return;
        }

        const randomChar = caracteres[Math.floor(Math.random() * caracteres.length)];
        span.textContent = randomChar;

        iteracion++;
        setTimeout(animarLetra, velocidad + Math.random() * 50);
      }

      setTimeout(animarLetra, i * 150);
    });

    if (typeof options.onComplete === 'function') {
      setTimeout(options.onComplete, finalText.length * 150 + velocidad);
    }
  }

  // ##########################################
  // ########## ANIMACIÓN DE TEXTO ############
  // ##########################################

  let textoAnimado = false;

  ordenarTexto('.ordenar', 'FERNANDEZZZ', {
    speed: 10,
    onComplete: () => {
      textoAnimado = true;
      const indicador = document.querySelector('.scroll-indicator');
      if (indicador) indicador.style.opacity = '1';
    }
  });

  // ##########################################
  // ########## TRANSICIÓN CON SCROLL #########
  // ##########################################
// ... (mantén todo el código anterior hasta la animación de texto)

// ##########################################
// ########## TRANSICIÓN CON SCROLL #########
// ##########################################

gsap.registerPlugin(ScrollTrigger);

const presentation = document.querySelector('.presentacion');
const mainContent = document.querySelector('.container');
const yoSoySection = document.querySelector('.yoSoy');

// Configuración mejorada de ScrollTrigger
// ... (código anterior se mantiene igual)

// Configuración mejorada de ScrollTrigger
ScrollTrigger.create({
  trigger: ".yoSoy",
  start: "top center",
  end: "bottom center",
  onEnter: () => {
      if (presentation && textoAnimado) {
          presentation.classList.add('hide');
          mainContent.classList.add('show');
      }
  },
  onLeaveBack: () => {
      if (presentation) {
          presentation.classList.remove('hide');
          mainContent.classList.remove('show');
      }
  },
  markers: false
});

// Manejo mejorado del scroll manual
function checkScroll() {
  const yoSoyRect = yoSoySection.getBoundingClientRect();
  const triggerPoint = window.innerHeight / 2;
  
  if (yoSoyRect.top <= triggerPoint && textoAnimado) {
      presentation.classList.add('hide');
      mainContent.classList.add('show');
  } else {
      presentation.classList.remove('hide');
      mainContent.classList.remove('show');
  }
}

// ... (el resto del código se mantiene igual)

// Evento de scroll optimizado
window.addEventListener('scroll', () => {
    checkScroll();
}, {passive: true});

// Click en ambos indicadores de scroll
[document.querySelector('.scroll-indicator'), document.querySelector('.scroll-abajo')].forEach(element => {
    if (element) {
        element.addEventListener('click', () => {
            if (textoAnimado) {
                presentation.classList.add('hide');
                mainContent.classList.add('show');
                window.scrollTo({
                    top: yoSoySection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Asegurar que la animación se complete
window.addEventListener('load', () => {
    if (textoAnimado) {
        checkScroll();
    }
});

// ... (mantén el resto del código)

  // ##########################################
  // ########### ANIMACIÓN PUNTERO ############
  // ##########################################

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

  animate();

  // ##########################################
  // #### REDIRECCIÓN EN PÁGINA CARGADOR ######
  // ##########################################

  if (window.location.pathname.includes("CARGADOR.html")) {
    const params = new URLSearchParams(window.location.search);
    const nextPage = params.get("to") || "Index.html";

    setTimeout(() => {
      window.location.href = nextPage;
    }, 3500);
  }

  // ##########################################
  // ### ANIMACIÓN CONTINUA DE TEXTOS SLIDE ###
  // ##########################################

  document.querySelectorAll('.slide-text').forEach((slide) => {
    const width = slide.scrollWidth;

    gsap.to(slide, {
      x: -width / 2,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  });

});
