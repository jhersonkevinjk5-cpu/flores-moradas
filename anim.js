const starCount = 300;
const stars = [];

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("div");
  const size = Math.random() * 3;
  star.style.position = "absolute";
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.background = "#fff";
  star.style.borderRadius = "50%";
  star.style.top = Math.random() * window.innerHeight + "px";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.opacity = 0.3 + Math.random() * 0.7;
  star.dataset.speed = 0.2 + Math.random() * 0.8;
  document.body.appendChild(star);
  stars.push(star);
}

function animateStars() {
  stars.forEach(star => {
    let top = parseFloat(star.style.top);
    top -= star.dataset.speed;
    if (top < 0) {
      top = window.innerHeight;
      star.style.left = Math.random() * window.innerWidth + "px";
    }
    star.style.top = top + "px";
  });
  requestAnimationFrame(animateStars);
}
animateStars();