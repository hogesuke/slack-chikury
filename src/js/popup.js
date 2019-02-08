import '../css/style.scss';
import StorageAccessor from './storage-accessor';

document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.querySelector('.input-token');

  tokenInput.value = StorageAccessor.getToken() || '';

  tokenInput.addEventListener('input', () => {
    StorageAccessor.setToken(tokenInput.value);
  });

  const openTimeInput = document.querySelector('.input-opentime');
  const closedTimeInput = document.querySelector('.input-closedtime');
  const openTime = StorageAccessor.getOpenTime() || '';
  const closedTime = StorageAccessor.getClosedTime() || '';

  openTimeInput.value = openTime;
  closedTimeInput.value = closedTime;

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

  const emojiInput = document.querySelector('.input-emoji');
  const emoji = StorageAccessor.getEmoji() || '';

  emojiInput.value = emoji;

  emojiInput.addEventListener('input', () => {
    let emoji = emojiInput.value;
    if (!emoji) {
      emoji = 'eyes';
      emojiInput.value = emoji;
    }
    StorageAccessor.setEmoji(emoji);
  });

  closedTimeInput.addEventListener('input', () => {
    let time = closedTimeInput.value;
    if (!time) {
      time = '18:00';
      closedTimeInput.value = time;
    }
    StorageAccessor.setClosedTime(time);
  });

  const urlsTextarea = document.querySelector('.textarea-urls');

  urlsTextarea.value = StorageAccessor.getURLs().join('\n') || '';

  urlsTextarea.addEventListener('input', () => {
    const urls = (() => {
      const text = urlsTextarea.value;
      return text ? text.split(/\n/) : [];
    })();

    StorageAccessor.setURLs(urls);
  });
});
