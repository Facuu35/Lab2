/*Variables*/
const sortByDateCheckbox = document.getElementById('sortByDate');
const filterCompletedCheckbox = document.getElementById('filterCompleted');

sortByDateCheckbox.addEventListener('change', toggleAndRenderTasks);
filterCompletedCheckbox.addEventListener('change', toggleAndRenderTasks);

let tasks = []; // Initialize an empty array

/*GENERAL*/
class Task {
    constructor({ text, date, done, id }) {
        this.text = text;
        this.date = date;
        this.done = done;
        this.id = id;
    }

    toHTML() {
        return `
            <li class="task-box ${this.done ? 'completed' : ''}">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="task-text ${this.done ? 'completed' : ''}">${this.text}</span>
                    </div>
                    <div class="d-flex">
                        <span class="date">${this.prettyDate()}</span>
                        <button onclick="updateTask(${this.id})" class="bi bi-check-circle btn btn-outline-success"></button>
                        <button onclick="deleteTask(${this.id})" class="bi bi-trash btn btn-outline-danger"></button>
                    </div>
                </div>
            </li>
        `;
    }
    prettyDate() {
        const [year, month, day] = this.date.split('-');
        return `${month}/${day}/${year}`;
    }

    toggle() {
        this.done = !this.done;
    }

}

function updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function readStorage() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = storedTasks ? storedTasks.map(task => new Task(task)) : [];
}

function toggleAndRenderTasks() {
    tasks.forEach(task => {
        task.toggle();
    });
    renderTasks();
}

function toggleAndRenderTasks() {
    const sortByDateChecked = sortByDateCheckbox.checked;
    const filterCompletedChecked = filterCompletedCheckbox.checked;

    let filteredTasks = tasks.slice(); // Create a copy to avoid modifying the original array

    if (filterCompletedChecked) {
        // Toggle tasks only if filterCompletedCheckbox is checked
        filteredTasks.forEach(task => {
            task.toggle();
        });
    }

    if (sortByDateChecked) {
        // Sort tasks by date (newest to oldest)
        filteredTasks = filteredTasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderTasks(filteredTasks);
}

function renderTasks(tasksToRender) {
    const tasksContainer = document.querySelector('.task-container');
    tasksContainer.innerHTML = '';

    if (tasksToRender) {
        tasksToRender.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.innerHTML = task.toHTML();
            tasksContainer.appendChild(taskElement);
        });
    }
}

function createTask() {
    const inputText = document.getElementById('newTask').value;
    const inputDate = document.getElementById('newTaskDate').value;

    if (inputText && inputDate) {
        const newTask = new Task({
            text: inputText,
            date: inputDate,
            done: false,
            id: Date.now()
        });

        tasks.push(newTask);
        updateStorage();
        renderTasks();

        // Clear form fields after creating a task
        document.getElementById('newTask').value = '';
        document.getElementById('newTaskDate').value = '';
    } else {
        alert('Please fill in both task name and deadline.');
    }
}

function updateTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.toggle();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateStorage();
    renderTasks();
}

// Initialization
readStorage();
renderTasks();
