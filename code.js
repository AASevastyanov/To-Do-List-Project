const textarea = document.getElementById('new-task__desk'); 
const phrases = ["Сходить в школу в четверг", "Покормить собаку", "Пойти в пятницу к Кириллу к 18:45",
  "Встретится с подружками возле магазина на Баумана", "Приготовить пасту по рецепту из ТикТока"];
let y = 0;

setInterval(() => {
  y = (y + 1) % phrases.length;
  textarea.placeholder = phrases[y];
}, 3000);

textarea.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

let taskList = document.querySelector('.task-list');
const addButton = document.getElementById('new-task__add');

let i = 0;  
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // *** Загружаем задачи из localStorage при загрузке страницы

// Функция для отрисовки задачи
function renderTask(taskText) { // *** Добавил эту функцию для перерисовки задач
  let task = document.createElement('div');
  task.classList.add('task');
  i += 1; // Номер задачи
  task.innerHTML = `<p><u>Заметка №${i} </u><br>• ${taskText}</p>`;
  taskList.append(task);

  let closeTask = document.createElement('p');
  let importantTask = document.createElement('p');    
  closeTask.classList.add('task-done', 'task-func');
  importantTask.classList.add('task-imp', 'task-func');
  closeTask.innerHTML = 'Выполнено';
  importantTask.innerHTML = 'Важное!';
  task.append(closeTask, importantTask);

  (task || closeTask || importantTask).addEventListener('mouseenter', () => {
    closeTask.style.opacity= '100%';
    importantTask.style.opacity= '100%';
    closeTask.style.top= '-70px';
    importantTask.style.top= '-70px';
  });

  (task || closeTask || importantTask).addEventListener('mouseleave', () => {
    setTimeout(() => {
      closeTask.style.opacity = '0';
      importantTask.style.opacity = '0';
    }, 2000);
  });

  importantTask.addEventListener('click', () => {
    if (task.style.backgroundColor != 'rgba(228, 97, 83, 0.31)') {
      task.style.backgroundColor = '#e461534f';
      task.style.border = '4px solid #e45853';
    } else {
      task.style.backgroundColor = '#f6f3dc9f';
      task.style.border = '2px solid rgb(193, 193, 163)';
    }
  });

  closeTask.onclick = () => {
    task.remove();
    tasks = tasks.filter(t => t !== taskText); // *** Удаляем задачу из массива
    localStorage.setItem('tasks', JSON.stringify(tasks)); // *** Сохраняем обновлённый массив
  };
}

// Отображаем задачи при загрузке страницы
tasks.forEach(task => renderTask(task)); // *** Перерисовываем все сохранённые задачи

// Добавление новой задачи
addButton.addEventListener('click', function(){
  let desk = textarea.value;
  if (desk){
    tasks.push(desk); // *** Добавляем новую задачу в массив
    localStorage.setItem('tasks', JSON.stringify(tasks)); // *** Сохраняем задачи в localStorage
    renderTask(desk); // *** Добавляем задачу на страницу
    textarea.value = '';
    textarea.style.height = 'auto';
  } else {
    addButton.style.backgroundColor = 'red';
    setTimeout(() => addButton.style.backgroundColor = '#5386E4', 1000);
  }
});
