const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

let stars = [];
let scrollOffset = 0;

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

// Create stars
for (let i = 0; i < 260; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.4,
    speed: Math.random() * 0.4 + 0.1
  });
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(s => {
    s.y += s.speed;
    if (s.y > canvas.height) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y + scrollOffset * 0.15, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,215,130,0.9)";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(255,200,100,0.8)";
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

// Scroll parallax
addEventListener("scroll", () => {
  scrollOffset = scrollY;
});
