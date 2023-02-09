import { changeActiveBtn, stop } from "./control.js";
import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const todoListElem = document.querySelector('.todo__list');
const countElem = document.querySelector('.count_num');

const li = document.createElement('li');
li.classList.add('todo__item');

const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Добавить новую задачу';
li.append(todoAddBtn);


const getTodo = () => JSON.parse(localStorage.getItem('pomodoro') || '[]');

const addTodo = (title) => {
  const todo = {
    title,
    pomodoro:0,
    id: Math.random().toString(16).substring(2,8),
  };
  const todoList = getTodo();
  todoList.push(todo);
  localStorage.setItem('pomodoro', JSON.stringify(todoList));
  return todo;
};

const updateTodo = (todo) => {
  const todoList = getTodo();
  const todoItem = todoList.find((item) => item.id === todo.id);
  todoItem.title = todo.title;
  todoItem.pomodoro = todo.pomodoro;
  localStorage.setItem('pomodoro', JSON.stringify(todoList));
};

const deleteTodo = (todo) => {
  const todoList = getTodo();
  const newTodoList = todoList.filter((item) => item.id !== todo.id);
  if (todo.id === state.activeToDo.id) {
    state.activeToDo = newTodoList[newTodoList.length - 1];
  };
  localStorage.setItem('pomodoro', JSON.stringify(newTodoList));
}

const createTodoListItem = (todo) => {
    if (todo.id !== 'default') {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo__item');

      const todoItemWrap = document.createElement('div');
      todoItemWrap.classList.add('todo__item-wrapper');
      todoItem.append(todoItemWrap);

      const todoBtn = document.createElement('button');
      todoBtn.classList.add('todo__btn');
      todoBtn.textContent = todo.title;

      const editBtn = document.createElement('button');
      editBtn.classList.add('todo__edit');
      editBtn.arialLabel = 'Редактировать задачу';

      const delBtn = document.createElement('button');
      delBtn.classList.add('todo__del');
      delBtn.arialLabel = 'Удалить задачу';

      todoItemWrap.append(todoBtn, editBtn, delBtn);

      todoListElem.prepend(todoItem);

      todoBtn.addEventListener('click', () => {
        state.activeToDo = todo,
        showTodo();
        changeActiveBtn('work');
        stop();
      });

      editBtn.addEventListener('click', () => {
        todo.title = prompt('Имя задачи', todo.title);
        todoBtn.textContent = todo.title;
        if (todo.id === state.activeToDo.id) {
          state.activeToDo.title = todo.title
        };
        showTodo();
        updateTodo(todo);
      });

      delBtn.addEventListener('click', () => {
        deleteTodo(todo);
        showTodo();
        todoItem.remove();
      });
    }
  };

const renderTodoList = (list) => {
  todoListElem.textContent = '';
  list.forEach(createTodoListItem);
  todoListElem.append(li);
}

const showTodo = () => {
  if (state.activeToDo) {
    titleElem.textContent = state.activeToDo.title;
    countElem.textContent = state.activeToDo.pomodoro;
  } else {
    titleElem.textContent = '';
    countElem.textContent = 0;
  }
};

export const initTodo = () => {
  const todoList = getTodo();

  if (!todoList.length) {
    state.activeToDo =  {
      id:'default',
      pomodoro: 0,
      title: 'Ваша задача',
    };
  } else {
    state.activeToDo = todoList[todoList.length - 1];
  }

  showTodo();

  renderTodoList(todoList);

  todoAddBtn.addEventListener('click', () => {
    const title = prompt('Введите имя задачи');
    const todo = addTodo(title);
    createTodoListItem(todo);
  })
}