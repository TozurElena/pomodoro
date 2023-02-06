import { alarm } from "./alarm.js";
import { state } from "./state.js"
import { addZero } from "./util.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

export const showTime = (seconds) => {
  minutesElem.textContent = addZero(Math.floor(seconds / 60));
  secondsElem.textContent = addZero(seconds % 60);
}

export const startTimer = () => {
  state.timeLeft -=5;

  showTime(state.timeLeft);

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  if (state.timeLeft <= 0) {
    alarm();

    if (state.status === 'work') {
      state.activeToDo.pomodoro +=1;

      if (state.activeToDo.pomodoro % state.count) {
        state.status = 'break'
      } else {
        state.status = 'relax';
      }
      
    } else {
      state.status = 'work'
    }

    state.timeLeft = state[state.status] * 60;
    startTimer();
  }
}