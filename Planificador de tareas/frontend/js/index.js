const taskManager = new TaskManager();
const initialTasks = [
    {
        id: 1,
        name: 'Estudiar Spring Boot',
        description: 'Estudiar conceptos básicos de Spring Boot para el desarrollo del backend.',
        dueDate: '2026-08-12',
        status: 'PORHACER'
    },
    {
        id: 2,
        name: 'Diseñar Login',
        description: 'Crear la interfaz de inicio de sesión para la aplicación.',
        dueDate: '2026-08-13',
        status: 'ENPROGRESO'
    },
    {
        id: 3,
        name: 'Crear API REST',
        description: 'Crear los endpoints principales de la aplicación.',
        dueDate: '2026-08-15',
        status: 'COMPLETADA'
    }
];

taskManager.load();
if (taskManager.tasks.length === 0) {
    taskManager.tasks = initialTasks;
    taskManager.currentId = initialTasks.length;
    taskManager.save();
}

taskManager.render();

const form = document.querySelector('#newTaskForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('#newTaskNameInput').value;
    const description = document.querySelector('#newTaskDescriptionInput').value;
    const dueDate = document.querySelector('#newTaskDateInput').value;
    const status = document.querySelector('#newTaskStatusInput').value;

    const data = {
        name: name,
        description: description,
        date: dueDate,
        status: status
    };

    const errorMessage = document.querySelector('#formError');

    if (validFormFieldInput(data)) {

        errorMessage.classList.add('d-none');

        taskManager.addTask(
            name,
            description,
            dueDate,
            status
        );

        taskManager.save();
        taskManager.render();

        form.reset();

    } else {

        errorMessage.classList.remove('d-none');

    }
});

const taskList = document.querySelector('#taskList');

taskList.addEventListener('click', function (event) {

    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.closest('.list-group-item');
        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

        if (task.status === 'DONE') {
            task.status = 'PORHACER';
        } else {
            task.status = 'DONE';
        }

        taskManager.save();
        taskManager.render();
    }

    if (event.target.classList.contains('delete-button')) {

        const parentTask = event.target.closest('.list-group-item');
        const taskId = Number(parentTask.dataset.taskId);

        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
    }

});

function validFormFieldInput(data) {
    if (data.name === "") return false;
    if (data.description === "") return false;
    if (data.date === "") return false;
    if (data.status === "") return false;

    return true;
}