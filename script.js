const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

let stars = [];
let planets = [];
let scrollOffset = 0;

/* 🔧 DPR SAFE RESIZE (PC + MOBILE FIX) */
function resize() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
resize();
window.addEventListener("resize", resize);

/* ⭐ STARS (Golden Dots) */
function createStars() {
  stars = [];
  for (let i = 0; i < 260; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.4 + 0.1
    });
  }
}

/* 🌍 PLANETS (Golden Flash Orbs) */
function createPlanets() {
  planets = [];
  for (let i = 0; i < 5; i++) {
    planets.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 30 + 25,
      glowPhase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.12 + 0.05
    });
  }
}

createStars();
createPlanets();

/* ⭐ DRAW STARS */
function drawStars() {
  stars.forEach(s => {
    s.y += s.speed;
    if (s.y > window.innerHeight) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y + scrollOffset * 0.15, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,215,130,0.9)";
    ctx.shadowBlur = 12;
    ctx.shadowColor = "rgba(255,200,120,0.8)";
    ctx.fill();
  });
}

/* 🌍 DRAW PLANETS */
function drawPlanets() {
  planets.forEach(p => {
    p.y += p.speed;
    if (p.y > window.innerHeight + p.r) {
      p.y = -p.r;
      p.x = Math.random() * window.innerWidth;
    }

    p.glowPhase += 0.03;
    const pulse = Math.sin(p.glowPhase) * 15 + 35;

    ctx.beginPath();
    ctx.arc(
      p.x,
      p.y + scrollOffset * 0.08,
      p.r,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(255,190,90,0.95)";
    ctx.shadowBlur = pulse * 1.5; // PC brightness fix
    ctx.shadowColor = "rgba(255,210,130,1)";
    ctx.fill();
  });
}

/* 🎥 ANIMATION LOOP */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStars();
  drawPlanets();

  requestAnimationFrame(animate);
}
animate();

/* 📜 SCROLL PARALLAX */
window.addEventListener("scroll", () => {
  scrollOffset = window.scrollY;
});
