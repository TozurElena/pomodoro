import { state } from "./state.js";
import { showTime, startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');

const stop = () => {
  clearTimeout(state.timerId);
  state.isActive = false;
  btnStart.textContent = 'Старт';
  state.timeLeft = state[state.status] * 60;
  showTime(state.timeLeft);
}

export const initControl = () => {
  btnStart.addEventListener('click', () => {
    if (state.isActive) {
      clearTimeout(state.timerId);
      state.isActive = false;
      btnStart.textContent = 'Старт';
    } else {
      state.isActive = true;
      startTimer();
      btnStart.textContent = 'Пауза';
      }
  });

  btnStop.addEventListener('click', stop);
  showTime(state.timeLeft);
}
