const taskManager = new TaskManager();

console.log(taskManager.tasks);


const form = document.querySelector('#newTaskForm');

form.addEventListener('submit', function (event) {

    event.preventDefault();

    const name = document.querySelector('#newTaskNameInput').value;
    const description = document.querySelector('#newTaskDescriptionInput').value;
    const date = document.querySelector('#newTaskDateInput').value;
    const status = document.querySelector('#newTaskStatusInput').value;

    console.log('Nombre:', name);
    console.log('Descripción:', description);
    console.log('Fecha:', date);
    console.log('Estado:', status);

    const data = {
    name: name,
    description: description,
    date: date,
    status: status
};

const errorMessage = document.querySelector('#formError');

if (validFormFieldInput(data)) {
    errorMessage.classList.add('d-none');
} else {
    errorMessage.classList.remove('d-none');
}

console.log(validFormFieldInput(data));


function validFormFieldInput(data) {

    if (data.name === "") {
        return false;
    }

    if (data.description === "") {
        return false;
    }

    if (data.date === "") {
        return false;
    }

    if (data.status === "") {
        return false;
    }

    return true;
}


});