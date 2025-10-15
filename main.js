// loader.js
document.addEventListener("DOMContentLoaded", () => {
    let percent = 0;
    const text = document.querySelector('.loading-text');
    const progressBar = document.querySelector('.progress-bar-fill');

    const interval = setInterval(() => {
        if (percent < 100) {
            percent++;
            text.textContent = `Cargando cielo estrellado... ${percent}%`;
            progressBar.style.width = `${percent}%`; // Animar barra
        } else {
            clearInterval(interval);
            // Redirigir automáticamente a la otra página
            window.location.href = "flower.html"; // <- Cambia por tu URL
        }
    }, 20); // Actualiza cada 20ms
});
