import { PER_PAGE, STATE } from './constants';
import { getProducts } from './products-api';
import { refs } from './refs';
import { renderProducts } from './render-function';

export function clearProductsList() {
  refs.productsList.innerHTML = '';
}

export function updateActiveCategory(activeEl) {
  const oldActiveEl = document.querySelector('.categories__btn--active');
  if (oldActiveEl) {
    oldActiveEl.classList.remove('categories__btn--active');
  }
  if (activeEl) {
    activeEl.classList.add('categories__btn--active');
  }
}

export async function loadProducts() {
  try {
    const { products, total } = await getProducts();
    if (products.length === 0) {
      showNotFoundBlock();
    } else {
      renderProducts(products);
      canLoadMore(total);
    }
  } catch (err) {
    console.error(`Get products error: ${err}`);
  }
}

export function showNotFoundBlock() {
  refs.notFoundBlock.classList.add('not-found--visible');
}

export function hideNotFoundBlock() {
  refs.notFoundBlock.classList.remove('not-found--visible');
}

export function canLoadMore(totalItems) {
  const totalPages = Math.ceil(totalItems / PER_PAGE);
  if (totalPages > STATE.PAGE) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}
