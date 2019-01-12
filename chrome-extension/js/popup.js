document.addEventListener('DOMContentLoaded', () => {
  const token = document.querySelector('#input-token');
  const saveButton = document.querySelector('#save-button');

  saveButton.addEventListener('click', () => {
    console.log('before save');
    localStorage.setItem('token', token.value);
    console.log('save token', token.value);
  });
});
