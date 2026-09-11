// Modal controls
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('show');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('show');
}

function closeModalOnBackdrop(e, id) {
  if (e.target.classList.contains('modal-backdrop')) {
    closeModal(id);
  }
}

// RSVP form handler
let selectedRsvpChoice = 'yes';
function selectRsvpOption(el, choice) {
  document.querySelectorAll('.rsvp-option').forEach(opt => opt.classList.remove('selected'));
  el.classList.add('selected');
  selectedRsvpChoice = choice;
}

function openRsvpNameModal() {
  const modal = document.getElementById('rsvp-modal');
  if (modal) {
    modal.classList.add('show');
    setTimeout(() => {
      const input = document.getElementById('rsvp-modal-name-input');
      if (input) input.focus();
    }, 150);
  }
}

function handleRsvpModalSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('rsvp-modal-name-input');
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) return;

  try {
    localStorage.setItem('wedding_guest_rsvp', JSON.stringify({
      name: name,
      choice: selectedRsvpChoice,
      date: new Date().toISOString()
    }));
  } catch(err) {}

  closeModal('rsvp-modal');
  if (nameInput) nameInput.value = '';
  showSuccessAlert('Рақмет! Сіздің жауабыңыз қабылданды! 🙏');
}

function scrollToRsvp() {
  const el = document.getElementById('rsvp-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function closeToast() {
  const toast = document.getElementById('top-toast');
  if (toast) toast.style.display = 'none';
}

function showSuccessAlert(msg) {
  const alert = document.getElementById('success-alert');
  const text = document.getElementById('success-alert-text');
  if (alert && text) {
    text.textContent = msg;
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), 4000);
  }
}

// Audio Player
const audio = document.getElementById('wedding-audio');
const audioBtn = document.getElementById('audio-toggle-btn');
const audioLabel = document.getElementById('audio-btn-label');
let isPlaying = false;

function toggleAudio() {
  if (!audio) return;
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    if (audioBtn) audioBtn.classList.remove('audio-playing');
    if (audioLabel) audioLabel.textContent = 'Әуен қосу';
  } else {
    audio.play().then(() => {
      isPlaying = true;
      if (audioBtn) audioBtn.classList.add('audio-playing');
      if (audioLabel) audioLabel.textContent = 'Әуен тоқтату';
    }).catch(() => {});
  }
}

function initAutoplay() {
  const startAudio = () => {
    if (!isPlaying && audio) {
      audio.play().then(() => {
        isPlaying = true;
        if (audioBtn) audioBtn.classList.add('audio-playing');
        if (audioLabel) audioLabel.textContent = 'Әуен тоқтату';
      }).catch(() => {});
    }
    window.removeEventListener('click', startAudio);
    window.removeEventListener('touchstart', startAudio);
    window.removeEventListener('scroll', startAudio);
  };
  window.addEventListener('click', startAudio, { once: true });
  window.addEventListener('touchstart', startAudio, { once: true });
  window.addEventListener('scroll', startAudio, { once: true });
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  document.querySelectorAll('.anim-init').forEach(el => {
    observer.observe(el);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initAutoplay();
});
