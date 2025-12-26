const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

let stars = [];
let planets = [];
let scrollOffset = 0;

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

/* ⭐ STARS */
for (let i = 0; i < 260; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.4,
    speed: Math.random() * 0.4 + 0.1
  });
}

/* 🌍 PLANETS */
for (let i = 0; i < 5; i++) {
  planets.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 35 + 25,
    glow: 0,
    speed: Math.random() * 0.12 + 0.05
  });
}

function drawStars() {
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
}

function drawPlanets() {
  planets.forEach(p => {
    p.y += p.speed;
    if (p.y > canvas.height + p.r) {
      p.y = -p.r;
      p.x = Math.random() * canvas.width;
    }

    p.glow += 0.03;

    const pulse = Math.sin(p.glow) * 10 + 25;

    ctx.beginPath();
    ctx.arc(
      p.x,
      p.y + scrollOffset * 0.08,
      p.r,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(255,190,80,0.9)";
    ctx.shadowBlur = pulse;
    ctx.shadowColor = "rgba(255,200,120,0.9)";
    ctx.fill();
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars();
  drawPlanets();

  requestAnimationFrame(animate);
}
animate();

/* 📜 Scroll Parallax */
addEventListener("scroll", () => {
  scrollOffset = scrollY;
});
