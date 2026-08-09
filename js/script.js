const opening = document.getElementById('opening');
const openInvitationButton = document.getElementById('openInvitation');
const invitation = document.getElementById('invitation');
const musicButton = document.getElementById('musicButton');
const musicIcon = document.getElementById('musicIcon');
const musicLabel = document.getElementById('musicLabel');
const audio = document.getElementById('backgroundMusic');
const toast = document.getElementById('toast');

const eventDate = new Date('2026-09-12T18:30:00-06:00');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-showing');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove('is-showing');
  }, 3200);
}

function openInvitation() {
  if (opening.classList.contains('is-opening')) return;

  opening.classList.add('is-opening');
  document.body.style.overflow = 'hidden';

  window.setTimeout(() => {
    invitation.hidden = false;
    window.scrollTo(0, 0);
  }, 620);

  window.setTimeout(() => {
    opening.classList.add('is-gone');
    document.body.style.overflow = '';
    initRevealObserver();
    buildSparkles();
  }, 1250);
}

openInvitationButton.addEventListener('click', openInvitation);

function updateMusicButton(isPlaying) {
  musicButton.setAttribute('aria-pressed', String(isPlaying));
  musicIcon.textContent = isPlaying ? 'Ⅱ' : '▶';
  musicLabel.textContent = isPlaying ? 'Pausar música' : 'Reproducir música';
}

musicButton.addEventListener('click', async () => {
  if (!audio.paused) {
    audio.pause();
    updateMusicButton(false);
    return;
  }

  try {
    await audio.play();
    updateMusicButton(true);
  } catch (error) {
    updateMusicButton(false);
    showToast('Agrega el archivo assets/audio/cancion-xv.mp3 para activar la música.');
  }
});

audio.addEventListener('error', () => {
  updateMusicButton(false);
});

function pad(value) {
  return String(Math.max(0, value)).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const difference = eventDate - now;

  if (difference <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById('days').textContent = pad(days);
  document.getElementById('hours').textContent = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

function initRevealObserver() {
  const items = document.querySelectorAll('.reveal:not(.is-visible)');

  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14,
    rootMargin: '0px 0px -7% 0px'
  });

  items.forEach(item => observer.observe(item));
}

function buildSparkles() {
  const layer = document.getElementById('sparkleLayer');
  if (!layer || layer.children.length) return;

  const fragment = document.createDocumentFragment();
  const amount = window.innerWidth < 500 ? 28 : 40;

  for (let i = 0; i < amount; i += 1) {
    const star = document.createElement('span');
    star.className = 'sparkle';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2.2 + Math.random() * 3.8}s`);
    star.style.animationDelay = `${-Math.random() * 4}s`;
    fragment.appendChild(star);
  }

  layer.appendChild(fragment);
}
