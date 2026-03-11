const welcome = document.getElementById('welcome');
const main = document.getElementById('main');

setTimeout(() => {
  welcome.classList.add('fade-out');
  setTimeout(() => {
    welcome.style.display = 'none';
    main.style.display = 'flex';
    main.classList.add('fade-in');
  }, 750);
}, 1000);

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

const sourcesBtn = document.getElementById('sourcesBtn');
const sourcesPanel = document.getElementById('sourcesPanel');
const sourcesBack = document.getElementById('sourcesBack');

const sidebarFooter = document.querySelector('.sidebar-footer');

sourcesBtn.addEventListener('click', () => {
  sourcesPanel.classList.add('open');
  sidebarFooter.style.display = 'none';
});

sourcesBack.addEventListener('click', () => {
  sourcesPanel.classList.remove('open');
  sidebarFooter.style.display = 'flex';
});
// ── Muscle Data ──────────────────────────────────────────────
let muscleData = {};

fetch('muscles.json')
  .then(res => res.json())
  .then(data => { muscleData = data; });

// ── Panel logic ───────────────────────────────────────────────
const musclePanel = document.getElementById('musclePanel');
const musclePanelName = document.getElementById('musclePanelName');
const musclePanelFunction = document.getElementById('musclePanelFunction');
const musclePanelExercises = document.getElementById('musclePanelExercises');
const musclePanelImage = document.getElementById('musclePanelImage');

function openMusclePanel(muscleKey) {
  const data = muscleData[muscleKey];
  if (!data) return;

  const content = document.querySelector('.muscle-panel-content');
  const imageWrap = document.querySelector('.muscle-panel-image-wrap');

  if (musclePanel.classList.contains('open')) {
    // already open — animate content out, swap, animate back in
    content.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    imageWrap.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    content.style.opacity = '0';
    content.style.transform = 'translateY(-10px)';
    imageWrap.style.opacity = '0';
    imageWrap.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      musclePanelName.textContent = data.name;
      musclePanelFunction.textContent = data.function;
      musclePanelExercises.innerHTML = data.exercises;
      musclePanelImage.src = data.image;
      musclePanelImage.alt = data.name;

      content.style.transform = 'translateY(10px)';
      imageWrap.style.transform = 'translateY(10px)';

      requestAnimationFrame(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        imageWrap.style.opacity = '1';
        imageWrap.style.transform = 'translateY(0)';
      });
    }, 200);

  } else {
    musclePanelName.textContent = data.name;
    musclePanelFunction.textContent = data.function;
    musclePanelExercises.innerHTML = data.exercises;
    musclePanelImage.src = data.image;
    musclePanelImage.alt = data.name;

    main.classList.add('model-shifted');
    musclePanel.classList.add('open');
  }
}

function closeMusclePanel() {
  dragDistance = 0;
  main.classList.remove('model-shifted');
  musclePanel.classList.remove('open');
}

document.getElementById('musclePanelClose').addEventListener('click', closeMusclePanel);

// ── Model & hotspots ──────────────────────────────────────────
const model = document.getElementById('anatomyModel');

model.addEventListener('load', () => {
  const hotspots = document.querySelectorAll('.muscle-hotspot');

  hotspots.forEach(hotspot => {
    hotspot.style.opacity = '1';
    hotspot.style.pointerEvents = 'auto';
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      openMusclePanel(hotspot.getAttribute('data-muscle'));
    });
  });

  function updateHotspotVisibility() {
    const orbit = model.getCameraOrbit();
    const theta = orbit.theta;
    const phi = orbit.phi;

    const cx = Math.sin(phi) * Math.sin(theta);
    const cy = Math.cos(phi);
    const cz = Math.sin(phi) * Math.cos(theta);

    hotspots.forEach(hotspot => {
      const normalAttr = hotspot.getAttribute('data-normal');
      if (!normalAttr) return;

      const [nx, ny, nz] = normalAttr.trim().split(/\s+/).map(Number);
      const dot = nx * cx + ny * cy + nz * cz;

      hotspot.style.opacity = dot > 0 ? '1' : '0.30';
      hotspot.style.pointerEvents = dot > 0 ? 'auto' : 'none';
    });
  }

  model.addEventListener('camera-change', updateHotspotVisibility);
  updateHotspotVisibility();
});