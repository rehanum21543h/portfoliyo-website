const hero = document.querySelector('.hero-box');

document.addEventListener('mousemove', (e) => {
  let x = (window.innerWidth / 2 - e.pageX) / 30;
  let y = (window.innerHeight / 2 - e.pageY) / 30;
  hero.style.transform = rotateY(${x}deg) rotateX(${y}deg);
});

document.addEventListener('mouseleave', () => {
  hero.style.transform = rotateY(0deg) rotateX(0deg);
});
