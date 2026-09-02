const taskManager = new TaskManager();

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

        form.reset();

        console.log(taskManager.tasks);

    } else {

        errorMessage.classList.remove('d-none');

    }
});

const completeButtons = document.querySelectorAll('.complete-task');

completeButtons.forEach(function (button) {

    button.addEventListener('click', function () {

        const taskCard = button.closest('.list-group-item');
        const taskName = taskCard.querySelector('h6');

        taskName.classList.toggle('text-decoration-line-through');

    });



});

function validFormFieldInput(data) {
    if (data.name === "") return false;
    if (data.description === "") return false;
    if (data.date === "") return false;
    if (data.status === "") return false;

    return true;
}