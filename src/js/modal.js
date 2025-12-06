import { refs } from './refs';

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', handleEscapePress);
  refs.modal.addEventListener('click', hanleBackdroppClick);
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleEscapePress);
  refs.modal.removeEventListener('click', hanleBackdroppClick);
}

function handleEscapePress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function hanleBackdroppClick(e) {
  if (e.target === refs.modal) {
    closeModal();
  }
}
