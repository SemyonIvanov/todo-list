const inputTask = document.getElementById('input-task');
const buttonAddTask = document.getElementById('btn-add');
const tasksBody = document.getElementById('tasks');
let tasks;

window.onload = async function init() {
  const resp = await fetch('http://localhost:8001/allTasks',
      {
        method: 'GET'
      });
  tasks = await resp.json();
  render(tasks);
}

buttonAddTask.addEventListener('click', onButtonAddClick);

function render(collection) {
  while (tasksBody.firstChild) {
    tasksBody.removeChild(tasksBody.firstChild);
  }
  collection.forEach((item, index) => {
    const newTask = document.createElement('div');
    let newTaskText;
    if (item.isEditing) {
      newTaskText = document.createElement('input');
      newTaskText.value = item.text;
      newTaskText.addEventListener("keyup", (e) => onChange(e, index));
      newTaskText.addEventListener("blur", (e) => editTask(e, index));
      window.setTimeout(() => newTaskText.focus(), 0);
    } else {
      newTaskText = document.createElement('p');
    }
    const checkedTask = document.createElement('input');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    newTask.classList.add('task');
    deleteBtn.classList.add('delete-button');
    editBtn.classList.add('edit-button');
    checkedTask.type = 'checkbox';
    newTaskText.className = item.isCheck && !item.isEditing ? 'text-task done-text' : 'text-task';

    tasksBody.appendChild(newTask);
    newTask.appendChild(checkedTask);
    newTask.appendChild(newTaskText);
    newTask.appendChild(deleteBtn);
    newTask.appendChild(editBtn);

    newTaskText.innerHTML = item.text;
    checkedTask.checked = item.isCheck;

    checkedTask.addEventListener('change', () => onChBoxClick(index))
    deleteBtn.addEventListener('click', () => onBtnDelClick(index));
    editBtn.addEventListener('click', () => onChangeText(index));
  });
}

async function onButtonAddClick() {
  if (inputTask.value) {
    const resp = await fetch('http://localhost:8001/createTask',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            text: inputTask.value,
            isCheck: false,
          })
        });
    tasks = await resp.json();
    render(tasks);
    inputTask.value = '';
  }
}

async function onBtnDelClick(index) {
  const itemId = tasks[index]._id;
  console.log(itemId)
  const resp = await fetch(`http://localhost:8001/deleteTask?id=${itemId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
      });
  tasks = await resp.json();
  render(tasks);
}

async function onChBoxClick(index) {
  const itemId = tasks[index]._id;
  const resp = await fetch('http://localhost:8001/updateTask',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          id: itemId,
          isCheck: !tasks[index].isCheck
        })
      });
  tasks = await resp.json();
  render(tasks);
}

function onChangeText(index) {
  tasks[index].isEditing = true;
  render(tasks);
}

async function editTask(e, index) {
  tasks[index].isEditing = false;
  const itemId = tasks[index]._id;
  const resp = await fetch('http://localhost:8001/updateTask',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          id: itemId,
          text: e.target.value,
        })
      });
  tasks = await resp.json();
  render(tasks);
}

async function onChange(e, index) {
  e.preventDefault();
  if (e.keyCode === 13) {
    await editTask(e, index);
  }
}
