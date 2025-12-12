import { PER_PAGE, STATE } from './constants';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySearch,
} from './products-api';
import { refs } from './refs';
import { renderProducts } from './render-function';
import { loadFromLS } from './storage';

export async function loadProducts() {
  try {
    let getProducts = getProductsFetcher();
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

function getProductsFetcher() {
  let productsFetcher;
  switch (STATE.FLAG) {
    case 'All':
      productsFetcher = getAllProducts;
      break;
    case 'Category':
      productsFetcher = getProductsByCategory;
      break;
    case 'Search':
      productsFetcher = getProductsBySearch;
      break;
  }
  return productsFetcher;
}

export function canLoadMore(totalItems) {
  const totalPages = Math.ceil(totalItems / PER_PAGE);
  if (totalPages > STATE.PAGE) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}

export function showNotFoundBlock() {
  refs.notFoundBlock.classList.add('not-found--visible');
}

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

export function clearActiveCategory() {
  const oldActiveEl = document.querySelector('.categories__btn--active');
  if (oldActiveEl) {
    oldActiveEl.classList.remove('categories__btn--active');
  }
}

export function hideNotFoundBlock() {
  refs.notFoundBlock.classList.remove('not-found--visible');
}

export function hideLoadMore() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

export async function loadAllProductsFromLS(key) {
  const data = loadFromLS(key);
  const allPromises = await Promise.allSettled(
    data.map(id => getProductById(id))
  );
  const allProducts = allPromises
    .filter(promis => promis.status === 'fulfilled')
    .map(promis => promis.value);
  return allProducts;
}

export function refreshCart(products) {
  const amount = products.length;
  refs.cartCounter.textContent = amount;
  let price = 0;
  products.map(product => (price += product.price));
  refs.cartPriceCounter.textContent = `$${price.toFixed(2)}`;
}
