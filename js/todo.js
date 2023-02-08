import { state } from "./state.js";

const titleElem = document.querySelector('.title');
const todoListElem = document.querySelector('.todo__list');

const li = document.createElement('li');
li.classList.add('todo__item');

const todoAddBtn = document.createElement('button');
todoAddBtn.classList.add('todo__add');
todoAddBtn.textContent = 'Добавить новую задачу';
li.append(todoAddBtn);


const getTodo = () => {
  const todoList = JSON.parse(localStorage.getItem('pomodoro') || '[]');

  return todoList;
}

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

      todoBtn.addEventListener('click', () => {});
      editBtn.addEventListener('click', () => {});
      delBtn.addEventListener('click', () => {});
    }
  };

const renderTodoList = (list) => {
  todoListElem.textContent = '';
  list.forEach(createTodoListItem);
  todoListElem.append(li);
}

const showTodo = () => {
  titleElem.textContent = state.activeToDo.title;
};

export const initTodo = () => {
  const todoList = getTodo();

  if (!todoList.length) {
    state.activeToDo =  [{
      id:'default',
      pomodoro: 0,
      title: 'Pomodoro',
    }]
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