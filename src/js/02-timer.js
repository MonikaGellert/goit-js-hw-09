import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');

let intervalId = null;

const buttonStart = document.querySelector('button[data-start]');
const buttonReset = document.querySelector('button[data-reset]');
const cunterDays = document.querySelector('span[data-days]');
const cunterHours = document.querySelector('span[data-hours]');
const cunterMinutes = document.querySelector('span[data-minutes]');
const cunterSeconds = document.querySelector('span[data-seconds]');
const inputDate = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      buttonStart.setAttribute('disabled', true);
      return Notiflix.Notify.info(
        'Please choose a date in the future! Do not look back..'
      );
    } else if (selectedDates[0] > new Date()) {
      buttonStart.removeAttribute('disabled');
    }

    buttonStart.addEventListener('click', interval);
    buttonReset.addEventListener('click', timerStop);

    function interval() {
      intervalId = setInterval(timer, 1000);
      buttonStart.setAttribute('disabled', true);
      inputDate.setAttribute('disabled', true);
    }
    function timer() {
      const delta = selectedDates[0] - new Date();

      if (delta < 1000) {
        clearInterval(intervalId);
      }
      const formatDelta = convertMs(delta);
      renderDate(formatDelta);
    }
    function timerStop(event) {
      clearInterval(intervalId);
      buttonStart.removeAttribute('disabled');
      inputDate.removeAttribute('disabled');
      const zero = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      renderDate(zero);
    }
  },
};

flatpickr('#datetime-picker', options);

function renderDate({ days, hours, minutes, seconds }) {
  cunterDays.textContent = addZero(days);
  cunterHours.textContent = addZero(hours);
  cunterMinutes.textContent = addZero(minutes);
  cunterSeconds.textContent = addZero(seconds);
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
