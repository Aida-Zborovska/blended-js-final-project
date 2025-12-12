import { STATE, THEME } from './constants';
import {
  clearActiveCategory,
  clearProductsList,
  loadAllProductsFromLS,
  hideLoadMore,
  hideNotFoundBlock,
  loadProducts,
  updateActiveCategory,
} from './helpers';
import { getCategories, getProductById } from './products-api';
import { openModal } from './modal';
import { refs } from './refs';
import { renderCategories, renderProduct } from './render-function';
import { initHeader } from './header';
import { STORAGE_KEY, getThemeFromLS } from './storage';

export async function initHomePage() {
  initTheme();
  initHeader();
  try {
    const categories = await getCategories();
    renderCategories(categories);
  } catch (err) {
    console.error(`Get categories error: ${err}`);
  }
  await loadProducts();
}

export async function initWishlistPage() {
  initTheme();
  initHeader();
  loadAllProductsFromLS(STORAGE_KEY.wishlist);
}

export async function initCartPage() {
  initTheme();
  initHeader();
}

export async function handleCategoryClick(e) {
  const btnElem = e.target.closest('.categories__btn');
  if (!btnElem) {
    return;
  }
  STATE.PAGE = 1;
  STATE.QUERY = btnElem.textContent;
  STATE.QUERY === 'All' ? (STATE.FLAG = 'All') : (STATE.FLAG = 'Category');
  updateActiveCategory(btnElem);
  clearProductsList();
  hideNotFoundBlock();
  hideLoadMore();
  await loadProducts();
}

export async function handleProductClick(e) {
  const liElem = e.target.closest('li.products__item');
  if (!liElem) {
    return;
  }
  const id = liElem.dataset.id;
  try {
    const product = await getProductById(id);
    renderProduct(product);
  } catch (err) {
    console.error(`Get product error: ${err}`);
  }
  openModal();
}

export async function handleSearchForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const queryCandidate = formData.get('searchValue').trim();
  if (!queryCandidate) {
    alert('type something');
    return;
  }
  clearActiveCategory();
  clearProductsList();
  hideNotFoundBlock();
  hideLoadMore();
  STATE.QUERY = queryCandidate;
  STATE.PAGE = 1;
  STATE.FLAG = 'Search';
  loadProducts();
}

export async function handleClearSearchForm() {
  refs.searchForm.reset();
  STATE.QUERY = 'All';
  STATE.PAGE = 1;
  STATE.FLAG = 'All';
  clearProductsList();
  hideNotFoundBlock();
  clearActiveCategory();
  await loadProducts();
}

export async function handleLoadMore() {
  STATE.PAGE += 1;
  await loadProducts();
}

function initTheme() {
  const theme = getThemeFromLS();
  document.body.setAttribute('data-theme', theme);
  document.body.dataset.theme = theme;
  refs.themeToggleBtn.innerHTML = theme === THEME.light ? '🌙' : '☀️';
}
