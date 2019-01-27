import '../css/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.querySelector('.input-token');

  tokenInput.value = localStorage.getItem('token') || '';

  const openTimeInput = document.querySelector('.input-opentime');
  const closedTimeInput = document.querySelector('.input-closedtime');
  const openTime = localStorage.getItem('open-time') || '';
  const closedTime = localStorage.getItem('closed-time') || '';

  openTimeInput.value = openTime;
  closedTimeInput.value = closedTime;

  tokenInput.addEventListener('input', () => {
    localStorage.setItem('token', tokenInput.value);
  });

  openTimeInput.addEventListener('input', () => {
    let time = openTimeInput.value;
    if (!time) {
      time = '09:00';
      openTimeInput.value = time;
    }
    localStorage.setItem('open-time', time);
  });

  closedTimeInput.addEventListener('input', () => {
    let time = closedTimeInput.value;
    if (!time) {
      time = '18:00';
      closedTimeInput.value = time;
    }
    localStorage.setItem('closed-time', time);
  });
});
