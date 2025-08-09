const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 保存されたタスクを読み込み
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// 追加ボタン
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    taskInput.value = '';
    saveAndRender();
  }
});

// タスク表示
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.done) li.classList.add('done');

    // 完了切替
    li.addEventListener('click', () => {
      tasks[index].done = !tasks[index].done;
      saveAndRender();
    });

    // 削除ボタン
    const delBtn = document.createElement('button');
    delBtn.textContent = '削除';
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// 保存＋描画
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
