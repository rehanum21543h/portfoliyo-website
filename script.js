/* GALAXY STARS */
const canvas=document.getElementById("galaxy");
const c=canvas.getContext("2d");
let w,h;
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;}
resize();window.onresize=resize;

const stars=[...Array(180)].map(()=>({
  x:Math.random()*w,
  y:Math.random()*h,
  r:Math.random()*1.5+0.5,
  dx:(Math.random()-.5)*0.3,
  dy:(Math.random()-.5)*0.3
}));

function animate(){
  c.clearRect(0,0,w,h);
  let g=c.createRadialGradient(w/2,h/2,100,w/2,h/2,w);
  g.addColorStop(0,"#1e1b4b");
  g.addColorStop(1,"#020617");
  c.fillStyle=g;
  c.fillRect(0,0,w,h);

  stars.forEach(s=>{
    s.x+=s.dx; s.y+=s.dy;
    if(s.x<0||s.x>w) s.dx*=-1;
    if(s.y<0||s.y>h) s.dy*=-1;
    c.beginPath();
    c.arc(s.x,s.y,s.r,0,Math.PI*2);
    c.fillStyle="rgba(255,255,255,0.8)";
    c.fill();
  });
  requestAnimationFrame(animate);
}
animate();

/* PARALLAX */
document.addEventListener("mousemove",e=>{
  document.querySelectorAll(".parallax").forEach(el=>{
    const x=(e.clientX-innerWidth/2)/40;
    const y=(e.clientY-innerHeight/2)/40;
    el.style.transform=translate(${x}px,${y}px);
  });
});
