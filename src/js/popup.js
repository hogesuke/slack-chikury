import '../css/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.querySelector('#input-token');
  const saveButton = document.querySelector('#save-button');
  const token = localStorage.getItem('token') || '';

  tokenInput.value = token;

  if (!tokenInput.value) {
    saveButton.disabled = true;
  }

  tokenInput.addEventListener('input', () => {
    saveButton.disabled = !tokenInput.value;
  });

  saveButton.addEventListener('click', () => {
    if (tokenInput.value) {
      localStorage.setItem('token', tokenInput.value);
    }
  });
});
