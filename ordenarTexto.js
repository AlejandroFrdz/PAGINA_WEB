
// ########### ANIMACIÓN APARICION DESORDENADA CON GSAP y js= opensource###########

export function ordenarTexto(targetSelector, finalText, options = {}) {
    const caracteres = options.chars || "*-X!$0_?@~";
    const maxIteraciones = options.iterations || 10;
    const delayEntreLetras = options.delay || 20;
  
    const spans = document.querySelectorAll(targetSelector);
    const letrasFinales = finalText.split("");
  
    letrasFinales.forEach((letraReal, i) => {
      const span = spans[i];
      if (!span) return;
  
      let iteracion = 0;
      const velocidad = options.speed || 20 + Math.random() * 20;
  
      const intervalo = setInterval(() => {
        const randomChar = caracteres[Math.floor(Math.random() * caracteres.length)];
        span.textContent = randomChar;
        iteracion++;
  
        if (iteracion >= maxIteraciones) {
          clearInterval(intervalo);
          span.textContent = letraReal;
        }
      }, velocidad + i * delayEntreLetras);
    });
  }
  