import { refs } from './refs';

export function clearProductsList() {
  refs.productsList.innerHTML = '';
}

export function updateActiveCategory(activeEl) {
  const oldActiveEl = document.querySelector('.categories__btn--active');
  if (oldActiveEl) {
    oldActiveEl.classList.remove('categories__btn--active');
  }
  activeEl.classList.add('categories__btn--active');
}

export function showNotFoundBlock() {
  refs.notFoundBlock.classList.add('not-found--visible');
}

export function hideNotFoundBlock() {
  refs.notFoundBlock.classList.remove('not-found--visible');
}
