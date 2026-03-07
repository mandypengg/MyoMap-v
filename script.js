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

  function updateHotspots() {
    const hotspots = document.querySelectorAll('.muscle-hotspot');
    hotspots.forEach(hotspot => {
      const name = hotspot.getAttribute('slot');
      const hotspotData = model.queryHotspot(name);
      if (hotspotData) {
        if (hotspotData.visible) {
          hotspot.style.pointerEvents = 'auto';
          hotspot.style.opacity = '1';
        } else {
          hotspot.style.pointerEvents = 'none';
          hotspot.style.opacity = '0';
        }
      }
    });
  }

  model.addEventListener('camera-change', updateHotspots);
  model.addEventListener('finished', updateHotspots);

  // catches clicks that don't trigger 'finished'
  model.addEventListener('mouseup', () => {
    setTimeout(updateHotspots, 50);
  });

  const hotspots = document.querySelectorAll('.muscle-hotspot');
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const muscle = hotspot.getAttribute('data-muscle');
      window.location.href = `muscles/${muscle}.html`;
    });
  });

});