import '../css/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.querySelector('.input-token');
  const saveButton = document.querySelector('.save-button');
  const token = localStorage.getItem('token') || '';

  tokenInput.value = token;

  const startTimeInput = document.querySelector('.input-starttime');
  const endTimeInput = document.querySelector('.input-endtime');
  const startTime = localStorage.getItem('start-time') || '';
  const endTime = localStorage.getItem('end-time') || '';

  startTimeInput.value = startTime;
  endTimeInput.value = endTime;

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
