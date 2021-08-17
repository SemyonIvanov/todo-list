const inputTask = document.getElementById('input-task');
const buttonAddTask = document.getElementById('btn-add');
const tasksBody = document.getElementById('tasks');
let inputTaskValue = '';
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function render(collection) {
    collection.forEach((item, index) => {
        const newTask = document.createElement('div');
        let newTaskText;
        if (item.isEditing) {
            newTaskText = document.createElement('input');
            newTaskText.value = item.textTask;
            newTaskText.addEventListener("keyup", (e) => onChange(e, index));
            newTaskText.addEventListener("blur", (e) => editTask(e, index));
            window.setTimeout(() => newTaskText.focus(), 0);
        } else {
            newTaskText = document.createElement('p')
        }
        const checkedTask = document.createElement('input');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        newTask.classList.add('task');
        deleteBtn.classList.add('delete-button');
        editBtn.classList.add('edit-button');
        checkedTask.type = 'checkbox';
        newTaskText.className = item.checkedTask && !item.isEditing ? 'text-task done-text' : 'text-task';

        tasksBody.appendChild(newTask);
        newTask.appendChild(checkedTask);
        newTask.appendChild(newTaskText);
        newTask.appendChild(deleteBtn);
        newTask.appendChild(editBtn);

        newTaskText.innerHTML = item.textTask;
        checkedTask.checked = item.checkedTask;

        checkedTask.addEventListener('change', () => onChBoxClick(index))
        deleteBtn.addEventListener('click', () => onBtnDelClick(index));
        editBtn.addEventListener('click', () => onChangeText(index));
    });
}

render(tasks);

onInputTaskChange = () => inputTaskValue = inputTask.value;

inputTask.addEventListener('change', onInputTaskChange);

function onButtonAddClick() {
    if (inputTask.value) {
        tasks.push({textTask: inputTaskValue, checkedTask: false, isEditing: false});
        inputTask.value = '';
        inputTaskValue = '';
        while (tasksBody.firstChild) {
            tasksBody.removeChild(tasksBody.firstChild);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        render(tasks);
    }
}

buttonAddTask.addEventListener('click', onButtonAddClick);

function onBtnDelClick(index) {
    tasks.splice(index, 1);
    while (tasksBody.firstChild) {
        tasksBody.removeChild(tasksBody.firstChild);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render(tasks);
}

function onChBoxClick(index) {
    tasks[index].checkedTask = !tasks[index].checkedTask;
    while (tasksBody.firstChild) {
        tasksBody.removeChild(tasksBody.firstChild);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render(tasks);
}

function onChangeText(index) {
    tasks[index].isEditing = true;
    while (tasksBody.firstChild) {
        tasksBody.removeChild(tasksBody.firstChild);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render(tasks)
}

function editTask(e, index) {
    tasks[index].textTask = e.target.value;
    tasks[index].isEditing = false;
    while (tasksBody.firstChild) {
        tasksBody.removeChild(tasksBody.firstChild);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render(tasks);
}

function onChange(e, index) {
    event.preventDefault();
    if (event.keyCode === 13) {
        editTask(e, index);
    }
}
