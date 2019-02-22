import '../css/style.scss';
import StorageAccessor from './storage-accessor';
import * as Constants from './constants';

document.addEventListener('DOMContentLoaded', () => {
  // token
  {
    const tokenInput = document.querySelector('.input-token');

    tokenInput.value = StorageAccessor.getToken() || '';

    tokenInput.addEventListener('blur', () => {
      StorageAccessor.setToken(tokenInput.value);
    });
  }

  // open time, closed time
  {
    const openTimeInput = document.querySelector('.input-opentime');
    const closedTimeInput = document.querySelector('.input-closedtime');
    const openTime = StorageAccessor.getOpenTime() || '';
    const closedTime = StorageAccessor.getClosedTime() || '';

    openTimeInput.value = openTime;
    closedTimeInput.value = closedTime;

    openTimeInput.addEventListener('blur', () => {
      let time = openTimeInput.value;
      if (!time) {
        time = Constants.DEFAULT.OPEN_TIME;
        openTimeInput.value = time;
      }
      StorageAccessor.setOpenTime(time);
    });

    closedTimeInput.addEventListener('blur', () => {
      let time = closedTimeInput.value;
      if (!time) {
        time = Constants.DEFAULT.CLOSED_TIME;
        closedTimeInput.value = time;
      }
      StorageAccessor.setClosedTime(time);
    });
  }

  // Day of the week
  {
    const dayOfTheWeekForm = document.querySelector('.dayoftheweek-form');
    const days = StorageAccessor.getDayOfTheWeek() || [];

    days.forEach(day => {
      (dayOfTheWeekForm.querySelector(`.input-dayoftheweek[value=${day}]`) || {}).checked = true;
    });

    dayOfTheWeekForm.addEventListener('input', () => {
      const checks = Array.from(dayOfTheWeekForm.querySelectorAll('.input-dayoftheweek:checked')).map(a => a.value);
      StorageAccessor.setDayOfTheWeek(checks);
    });
  }

  // emoji
  {
    const emojiInput = document.querySelector('.input-emoji');
    const emoji = StorageAccessor.getEmoji() || '';

    emojiInput.value = emoji;

    emojiInput.addEventListener('blur', () => {
      let emoji = emojiInput.value;
      if (!emoji) {
        emoji = Constants.DEFAULT.EMOJI;
        emojiInput.value = emoji;
      }
      StorageAccessor.setEmoji(emoji);
    });
  }

  // urls
  {
    const urlsTextarea = document.querySelector('.textarea-urls');

    urlsTextarea.value = (StorageAccessor.getURLs() || []).join('\n');

    urlsTextarea.addEventListener('blur', () => {
      const urls = (() => {
        const text = urlsTextarea.value;
        return text ? text.split(/\n/) : [];
      })();

      StorageAccessor.setURLs(urls);
    });
  }
});
