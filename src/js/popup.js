import '../css/style.scss';
import StorageAccessor from './storage-accessor';

document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.querySelector('.input-token');

  tokenInput.value = StorageAccessor.getToken() || '';

  const openTimeInput = document.querySelector('.input-opentime');
  const closedTimeInput = document.querySelector('.input-closedtime');
  const openTime = StorageAccessor.getOpenTime() || '';
  const closedTime = StorageAccessor.getClosedTime() || '';

  openTimeInput.value = openTime;
  closedTimeInput.value = closedTime;

  tokenInput.addEventListener('input', () => {
    StorageAccessor.setToken(tokenInput.value);
  });

  openTimeInput.addEventListener('input', () => {
    let time = openTimeInput.value;
    if (!time) {
      time = '09:00';
      openTimeInput.value = time;
    }
    StorageAccessor.setOpenTime(time);
  });

  closedTimeInput.addEventListener('input', () => {
    let time = closedTimeInput.value;
    if (!time) {
      time = '18:00';
      closedTimeInput.value = time;
    }
    StorageAccessor.setClosedTime(time);
  });
});
