document.addEventListener('DOMContentLoaded', () => {
  const token = document.querySelector('#input-token');
  const saveButton = document.querySelector('#save-button');

  saveButton.addEventListener('click', () => {
    localStorage.setItem('token', token.value);
  });
});
