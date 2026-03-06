const welcome = document.getElementById('welcome');
const main = document.getElementById('main');

setTimeout(() => {
    welcome.classList.add('fade-out');

    setTimeout(() => {
        welcome.style.display = 'none';
        main.style.display = 'flex';
        main.classList.add('fade-in');
    }, 1000);

}, 1350);

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');

  if (sidebar.classList.contains('open')) {
    menuBtn.style.display = 'none';
  } else {
    menuBtn.style.display = 'block';
  }

});

const closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  menuBtn.style.display = 'block';
});