// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const startBtn = document.querySelector(`[data-start]`);

startBtn.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
     iziToast.error({
    title: 'Error',
       message: "Please choose a date in the future",
  position:"topCenter",
});
      startBtn.disabled = true;
      userSelectedDate = null;
      return;
    }
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
   
  },
};


flatpickr("#datetime-picker", options);

startBtn.addEventListener(`click`, () => {
   document.querySelector(`#datetime-picker`).disabled = true; 
  if (!userSelectedDate) return;
  startBtn.disabled = true;
  const timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;
    if (diff < 0) {
      clearInterval(timerId);
      document.querySelector(`#datetime-picker`).disabled = false;
      return;
    } const { days, hours, minutes, seconds } = convertMs(diff);
   

  
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    console.log("Time left:", diff);
  }, 1000)
})
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

