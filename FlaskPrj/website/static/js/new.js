function watched() {
  const buttonElement = document.querySelector('.js-watched-button');

  if (buttonElement.innerText === 'Watched?') {
    buttonElement.innerText = 'Watched!';
  } else {
    buttonElement.innerText = 'Watched?';
  }
}