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
    targets: 'h1',
    opacity: 0,
    duration: 1000,
    easing: 'easeOutExpo',
    delay: 1000,
  });

anime({
  targets: '.dashboard-card',
  scale: 1,
  rotate: '1turn',
  duration: 3000,
});

anime({
  targets: '.log-card',
  translateX: {
    value: [-500, 0],
    duration: 800,
  },
  scale: {
    value: [0.5, 1],
    duration: 1600,
    easing: 'easeInOutQuart',
  },
});
