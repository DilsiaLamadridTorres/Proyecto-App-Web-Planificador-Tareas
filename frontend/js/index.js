const taskManager = new TaskManager();

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:8080/api/tasks');

        if (!response.ok) {
            throw new Error('Error al obtener las tareas');
        }

        const tasks = await response.json();

        taskManager.tasks = tasks;

        if (tasks.length > 0) {
            taskManager.currentId = Math.max(...tasks.map(task => task.id));
        }

        taskManager.render();

    } catch (error) {
        console.error('Error al conectar con el backend:', error);
    }
}

fetchTasks();

const form = document.querySelector('#newTaskForm');

form.addEventListener('submit', async function (event) {
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

     try {
    const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            dueDate: dueDate,
            status: status
        })
    });

    if (!response.ok) {
        throw new Error('Error al crear la tarea');
    }

    const newTask = await response.json();

    taskManager.tasks.push(newTask);
    taskManager.render();

    form.reset();

} catch (error) {
    console.error('Error al crear la tarea:', error);
} 

    } else {

        errorMessage.classList.remove('d-none');

    }
});

const taskList = document.querySelector('#taskList');

taskList.addEventListener('click', async function (event) {

    if (event.target.classList.contains('done-button')) {
        const parentTask = event.target.closest('.list-group-item');
        const taskId = Number(parentTask.dataset.taskId);

        const task = taskManager.getTaskById(taskId);

      try {
    const newStatus = task.status === 'DONE' ? 'PENDING' : 'DONE';

    const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: task.name,
            description: task.description,
            dueDate: task.dueDate,
            status: newStatus
        })
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
    }

    const updatedTask = await response.json();

    taskManager.tasks = taskManager.tasks.map(taskItem =>
        taskItem.id === updatedTask.id ? updatedTask : taskItem
    );

    taskManager.render();

} catch (error) {
    console.error('Error al actualizar la tarea:', error);
}

    }

 if (event.target.classList.contains('delete-button')) {

    const parentTask = event.target.closest('.list-group-item');
    const taskId = Number(parentTask.dataset.taskId);

    try {
        const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }

        taskManager.tasks = taskManager.tasks.filter(task => task.id !== taskId);

        taskManager.render();

    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
    }
}

});

function validFormFieldInput(data) {
    if (data.name === "") return false;
    if (data.description === "") return false;
    if (data.date === "") return false;
    if (data.status === "") return false;

    return true;
}