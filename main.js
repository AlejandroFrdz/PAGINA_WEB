// ###############PUNTERO###############

//Velocidad del puntero
//VARIABLES
let followSpeed = 0.1; //Ajustarlo

const circle = document.getElementById("circuloCursor");
let ratonX= window.innerWidth / 2;
let ratonY= window.innerHeight / 2;
let circuloX = ratonX;
let circuloY = ratonY;

//LÓGICA
//Animación del puntero (POSICIÓN)

document.addEventListener("mousemove", (e) => {
    ratonX = e.clientX;
    ratonY = e.clientY;
});

//Animación suave usando requestAnimationFrame
function animate() {
    //Suavidad del puntero
    circuloX += (ratonX - circuloX) * followSpeed;
    circuloY += (ratonY - circuloY) * followSpeed;
    circle.style.transform = `translate(${circuloX}px, ${circuloY}px)`;
    requestAnimationFrame(animate);
}

animate();

