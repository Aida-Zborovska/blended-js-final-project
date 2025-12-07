import { STATE } from './constants';
import {
  canLoadMore,
  clearProductsList,
  hideNotFoundBlock,
  loadProducts,
  showNotFoundBlock,
  updateActiveCategory,
} from './helpers';
import { openModal } from './modal';
import { getCategories, getProductById, searchProducts } from './products-api';
import { refs } from './refs';
import {
  renderCategories,
  renderProduct,
  renderProducts,
} from './render-function';

export async function initHomePage() {
  try {
    const categories = await getCategories();
    renderCategories(categories);
  } catch (err) {
    console.error(`Get categories error: ${err}`);
  }
  await loadProducts();
}

export async function handleCategoryClick(e) {
  const btnElem = e.target.closest('.categories__btn');
  if (!btnElem) {
    return;
  }
  clearProductsList();
  updateActiveCategory(btnElem);
  hideNotFoundBlock();
  STATE.PAGE = 1;
  STATE.QUERY = btnElem.textContent;
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
    openModal();
  } catch (err) {
    console.error(`Get product error: ${err}`);
  }
}

export async function handleSearchForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const queryCandidate = formData.get('searchValue').trim();
  if (!queryCandidate) {
    alert('type something');
    return;
  }
  clearProductsList();
  hideNotFoundBlock();
  updateActiveCategory();
  STATE.QUERY = queryCandidate;
  STATE.PAGE = 1;
  try {
    const { products, total } = await searchProducts();
    if (products.length === 0) {
      showNotFoundBlock();
    } else {
      renderProducts(products);
      canLoadMore(total);
    }
  } catch (err) {
    console.error(`Get product error: ${err}`);
  }
  e.target.reset();
}

export async function handleClearSearchForm() {
  refs.searhForm.reset();
  STATE.QUERY = 'All';
  STATE.PAGE = 1;
  clearProductsList();
  hideNotFoundBlock();
  updateActiveCategory();
  await loadProducts();
}

export async function handleLoadMore() {
  STATE.PAGE += 1;
  await loadProducts();
}
