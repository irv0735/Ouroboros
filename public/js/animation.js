var textWrapper = document.querySelector('h1');
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: 'h1 .letter',
    opacity: [0, 1],
    easing: 'easeInOutQuad',
    duration: 2250,
    delay: (el, i) => 150 * (i + 1),
  })
  .add({
    targets: '.ml3',
    opacity: 0,
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 1000,
  });

anime({
  targets: '.dashboard-card',
  //   translateX: 250,
  scale: 1,
  rotate: '1turn',
  duration: 3000,
});
