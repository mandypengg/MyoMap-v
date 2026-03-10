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
  menuBtn.style.display = sidebar.classList.contains('open') ? 'none' : 'block';
});

document.getElementById('closeBtn').addEventListener('click', () => {
  sidebar.classList.remove('open');
  menuBtn.style.display = 'block';
});

const model = document.getElementById('anatomyModel');

model.addEventListener('load', () => {

  const hotspots = document.querySelectorAll('.muscle-hotspot');

  hotspots.forEach(hotspot => {

    // watch for data-visible attribute changes
    const observer = new MutationObserver(() => {
      const visible = hotspot.getAttribute('data-visible');
      if (visible === 'false') {
        hotspot.style.pointerEvents = 'none';
        hotspot.style.opacity = '0';
      } else {
        hotspot.style.pointerEvents = 'auto';
        hotspot.style.opacity = '1';
      }
    });

    observer.observe(hotspot, {
      attributes: true,
      attributeFilter: ['data-visible']
    });

    // click navigation
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const muscle = hotspot.getAttribute('data-muscle');
      window.location.href = `muscles/${muscle}.html`;
    });

  });

});