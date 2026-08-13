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

});