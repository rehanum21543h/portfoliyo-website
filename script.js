const canvas = document.getElementById("energy");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let time = 0;

function animate(){
  time += 0.02;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  // Background glow
  const bg = ctx.createRadialGradient(cx,cy,100,cx,cy,canvas.width);
  bg.addColorStop(0,"#1e1b4b");
  bg.addColorStop(1,"#000");
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Energy rays
  for(let i=0;i<60;i++){
    const angle = (Math.PI*2/60)*i + time;
    const len = 220 + Math.sin(time+i)*90;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(
      cx + Math.cos(angle)*len,
      cy + Math.sin(angle)*len
    );
    ctx.strokeStyle="rgba(125,211,252,0.18)";
    ctx.lineWidth=2;
    ctx.stroke();
  }

  // Core
  ctx.beginPath();
  ctx.arc(cx,cy,38+Math.sin(time)*6,0,Math.PI*2);
  ctx.fillStyle="#7dd3fc";
  ctx.shadowBlur=30;
  ctx.shadowColor="#7dd3fc";
  ctx.fill();
  ctx.shadowBlur=0;

  requestAnimationFrame(animate);
}

animate();
