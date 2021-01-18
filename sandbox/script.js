var input;
var button;

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    input = document.querySelector('#add-photo');
    button = document.querySelector('.add-btn');

    button.addEventListener('click', (_) => takePicture(readFile));
});

function takePicture(handler) {
    input.value = '';
    input.addEventListener('change', handler);
    input.click();
}

function readFile(event) {
    const file = input.files[0];
    confirm(file.name);
    input.removeEventListener('change', readFile);
}