const welcome = document.getElementById('welcome');
const main = document.getElementById('main');

setTimeout(() => {
    welcome.classList.add('fade-out');

    setTimeout(() => {
        welcome.style.display = 'none';
        main.style.display = 'flex';
        main.classList.add('fade-in');
    }, 1000);

}, 2500);