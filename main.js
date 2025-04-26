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
  }, 3500); // Duración de la animación
}


// ########### ANIMACIÓN SCROLL DE TEXTOS CON GSAP ###########

// Animar todas las .slide-text
document.querySelectorAll('.slide-text').forEach((slide) => {
  let width = slide.scrollWidth;

  gsap.to(slide, {
    x: -width / 2,
    duration: 20,
    ease: 'none',
    repeat: -1,
  });
});


//BOTON GSAP


// Animación al hacer hover
boton.addEventListener('mouseenter', () => {
  gsap.to(boton, {
    scale: 1.1,
    duration: 0.3,
    ease: "power1.out"
  });
});

boton.addEventListener('mouseleave', () => {
  gsap.to(boton, {
    scale: 1,
    duration: 0.3,
    ease: "power1.out"
  });
});











