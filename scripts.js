// =======================
// 🎡 Carrusel 3D
// =======================
const carousel = document.getElementById("carousel-container");
let isDragging = false;
let startX;
let currentRotation = 0;
let rotation = 0;
let autoRotate = true;
const speed = 0.7;

// Arrastre mouse
carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  carousel.style.transition = "none";
  autoRotate = false;
});

// Arrastre táctil
carousel.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  carousel.style.transition = "none";
  autoRotate = false;
});

// Movimiento
const handleMove = (clientX) => {
  if (!isDragging) return;
  const delta = (clientX - startX) * 0.3;
  rotation = currentRotation + delta;
  carousel.style.transform = `translateZ(-300px) rotateY(${rotation}deg)`;
};

document.addEventListener("mousemove", (e) => handleMove(e.clientX));
document.addEventListener("touchmove", (e) => handleMove(e.touches[0].clientX));

// Soltar mouse/touch
const endDrag = () => {
  if (!isDragging) return;
  isDragging = false;
  currentRotation = rotation;
  carousel.style.transition = "transform 1s ease-out";
  autoRotate = true;
};

document.addEventListener("mouseup", endDrag);
document.addEventListener("touchend", endDrag);

// Animación automática
function animateCarousel() {
  if (autoRotate && !isDragging) {
    rotation += speed;
    carousel.style.transform = `translateZ(-300px) rotateY(${rotation}deg)`;
    currentRotation = rotation;
  }
  requestAnimationFrame(animateCarousel);
}
animateCarousel();

// =======================
// 🪩 Modal
// =======================
const texto = document.querySelector(".neon-text");
const modal = document.getElementById("modal");
const cerrar = document.getElementById("cerrarModal");

texto.addEventListener("click", () => {
  modal.classList.add("mostrar");
});

cerrar.addEventListener("click", () => {
  modal.classList.remove("mostrar");
});

// =======================
// 🎵 Reproductor de Música
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const playlist = [
    { title: "Tu Poeta", artist: "Alex Campos", src: "sound/TUPOETAAlexCamposVídeoOficial.mp3", cover: "img/cancion.jpeg" },
    { title: "Un veso y una flor", artist: "Hillsong United", src: "sound/unbesoyunaflor.mp3", cover: "img/cancion2.jpeg" }
  ];

  const bgMusic = document.getElementById("bg-music");
  const playPauseBtn = document.getElementById("btn-play-pause");
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");
  const timeline = document.getElementById("timeline-slider");
  const currentTimeEl = document.getElementById("current-time");
  const totalTimeEl = document.getElementById("total-time");
  const songTitle = document.getElementById("song-title");
  const artistName = document.getElementById("artist-name");
  const albumArt = document.getElementById("album-art");

  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");
  const btnShuffle = document.getElementById("btn-shuffle");
  const btnLoop = document.getElementById("btn-loop");

  let isPlaying = false;
  let intervalId = null;
  let currentTrack = 0;
  let isLooping = false;
  let isShuffling = false;

  function loadSong(index) {
    const song = playlist[index];
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    albumArt.src = song.cover;
    bgMusic.src = song.src;
    bgMusic.load();
    if (isPlaying) bgMusic.play();
  }

  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) pausePlayback();
    else startPlayback();
  });

  function startPlayback() {
    isPlaying = true;
    iconPlay.classList.add("hidden");
    iconPause.classList.remove("hidden");
    bgMusic.play();
    clearInterval(intervalId);
    intervalId = setInterval(updateProgress, 200);
  }

  function pausePlayback() {
    isPlaying = false;
    iconPlay.classList.remove("hidden");
    iconPause.classList.add("hidden");
    bgMusic.pause();
    clearInterval(intervalId);
  }

  btnNext.addEventListener("click", () => {
    if (isShuffling) currentTrack = Math.floor(Math.random() * playlist.length);
    else currentTrack = (currentTrack + 1) % playlist.length;
    loadSong(currentTrack);
    startPlayback();
  });

  btnPrev.addEventListener("click", () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadSong(currentTrack);
    startPlayback();
  });

  btnLoop.addEventListener("click", () => {
    isLooping = !isLooping;
    bgMusic.loop = isLooping;
    btnLoop.classList.toggle("text-purple-400", isLooping);
  });

  btnShuffle.addEventListener("click", () => {
    isShuffling = !isShuffling;
    btnShuffle.classList.toggle("text-purple-400", isShuffling);
  });

  bgMusic.addEventListener("loadedmetadata", () => {
    const totalSeconds = Math.floor(bgMusic.duration);
    totalTimeEl.textContent = `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
    timeline.max = totalSeconds;
  });

  function updateProgress() {
    timeline.value = bgMusic.currentTime;
    const currentSeconds = Math.floor(bgMusic.currentTime);
    currentTimeEl.textContent = `${Math.floor(currentSeconds / 60)}:${String(currentSeconds % 60).padStart(2, '0')}`;
  }

  timeline.addEventListener("input", () => {
    bgMusic.currentTime = timeline.value;
    updateProgress();
  });

  bgMusic.addEventListener("ended", () => {
    if (isLooping) bgMusic.play();
    else btnNext.click();
  });

  loadSong(currentTrack);
});
