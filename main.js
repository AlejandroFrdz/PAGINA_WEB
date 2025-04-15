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

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap((parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

    tl.to(
      item,
      { xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100), duration: distanceToLoop / pixelsPerSecond },
      0
    )
    .fromTo(
      item,
      { xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100) },
      {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );

    times[i] = distanceToStart / pixelsPerSecond;
  }

  tl.progress(1, true).progress(0, true);
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

document.addEventListener("DOMContentLoaded", function () {
  horizontalLoop(document.querySelectorAll(".pista-top .loop-item"), {
    paused: false,
    repeat: -1,
    speed: 1
  });

  horizontalLoop(document.querySelectorAll(".pista-abajo .loop-item"), {
    paused: false,
    repeat: -1,
    speed: 1,
    reversed: true
  });
});








