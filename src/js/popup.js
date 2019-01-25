import '../css/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.querySelector('.input-token');

  tokenInput.value = localStorage.getItem('token') || '';

  const startTimeInput = document.querySelector('.input-starttime');
  const endTimeInput = document.querySelector('.input-endtime');
  const startTime = localStorage.getItem('start-time') || '';
  const endTime = localStorage.getItem('end-time') || '';

  startTimeInput.value = startTime;
  endTimeInput.value = endTime;

  tokenInput.addEventListener('input', () => {
    localStorage.setItem('token', tokenInput.value);
  });

  startTimeInput.addEventListener('input', () => {
    let time = startTimeInput.value;
    if (!time) {
      time = '09:00';
      startTimeInput.value = time;
    }
    localStorage.setItem('start-time', time);
  });

  endTimeInput.addEventListener('input', () => {
    let time = endTimeInput.value;
    if (!time) {
      time = '18:00';
      endTimeInput.value = time;
    }
    localStorage.setItem('end-time', time);
  });
});
