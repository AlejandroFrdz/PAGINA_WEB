export function ordenarTexto(targetSelector, finalText, options = {}) {
  const caracteres = options.chars || "*-X!$0_?@~";
  const iteracionesPorLetra = options.iterations || 20; // Iteraciones por letra antes de mostrar la final
  const velocidad = options.speed || 1000; // Velocidad base (ms)

  const spans = document.querySelectorAll(targetSelector);
  const letrasFinales = finalText.split("");

  spans.forEach((span, i) => {
    if (!span || i >= letrasFinales.length) return;

    const letraFinal = letrasFinales[i];
    let iteracion = 0;

    // Animación para cada letra individual
    function animarLetra() {
      if (iteracion >= iteracionesPorLetra) {
        span.textContent = letraFinal; // Mostrar letra final
        return;
      }

      // Carácter aleatorio (excepto en la última iteración)
      const randomChar = caracteres[Math.floor(Math.random() * caracteres.length)];
      span.textContent = randomChar;

      iteracion++;
      setTimeout(animarLetra, velocidad + Math.random() * 50); // Variabilidad aleatoria
    }

    // Iniciar animación con un delay progresivo para efecto "ola"
    setTimeout(animarLetra, i * 150); // Delay entre letras
  });
}

