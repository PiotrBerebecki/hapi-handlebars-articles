

const loginRegisterLinkDOM = document.getElementById('js-login-link');
const overlayDOM = document.getElementById('js-overlay');
const dialogCloseBtnDOM = document.getElementById('js-dialog-close-btn');

loginRegisterLinkDOM.addEventListener('click', toggleModalDisplay);
dialogCloseBtnDOM.addEventListener('click', toggleModalDisplay);

function toggleModalDisplay(e) {
  e.preventDefault();
  overlayDOM.classList.toggle('overlay-active');
}


// ******************************************************
// LOGIN FORM
// ******************************************************
const loginFormDOM = document.getElementById('js-login-form');

loginFormDOM.addEventListener('submit', handleLoginSubmit);

function handleLoginSubmit(e) {
  console.log('form submitted', e);
  // e.preventDefault();
}
