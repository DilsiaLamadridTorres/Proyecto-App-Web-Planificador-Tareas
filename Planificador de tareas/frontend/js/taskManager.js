class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    addTask(name, description, dueDate, status) {
    this.currentId++;

    this.tasks.push({
        id: this.currentId,
        name: name,
        description: description,
        dueDate: dueDate,
        status: 'PORHACER'
    });
}
deleteTask(taskId) {
    const newTasks = [];

    for (let task of this.tasks) {
        if (task.id !== taskId) {
            newTasks.push(task);
        }
    }

    this.tasks = newTasks;
}
getTaskById(taskId) {

    let foundTask;

    for (let task of this.tasks) {

        if (task.id === taskId) {
            foundTask = task;
        }

    }

    return foundTask;
}

render() {
    const taskList = document.querySelector('#taskList');
    const template = document.querySelector('#taskTemplate');

    taskList.innerHTML = '';

    for (let task of this.tasks) {
        const taskElement = template.content.cloneNode(true);

        taskElement.querySelector('.task-name').textContent = task.name;
        if (task.status === 'DONE') {
    taskElement
        .querySelector('.task-name')
        .classList.add('text-decoration-line-through');
}
        taskElement.querySelector('.task-description').textContent = task.description;
        taskElement.querySelector('.task-date').textContent = task.dueDate;

        taskElement.querySelector('.list-group-item').dataset.taskId = task.id;

        taskList.appendChild(taskElement);
    }
}

save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
}

load() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
        this.tasks = JSON.parse(tasks);
    }
}


}