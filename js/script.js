import { initControl } from "./control.js";
import { state } from "./state.js";

const initPomodoro = () => {
  initControl();

  state.activeToDo = {
    id:'default',
    pomodoro: 3,
    title: 'Pomodoro',
  }
}

initPomodoro();