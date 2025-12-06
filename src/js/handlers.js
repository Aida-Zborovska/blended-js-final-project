import { STATE } from './constants';
import {
  clearProductsList,
  hideNotFoundBlock,
  loadProducts,
  updateActiveCategory,
} from './helpers';
import { openModal } from './modal';
import { getCategories, getProductById } from './products-api';
import { renderCategories, renderProduct } from './render-function';

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

export async function handleLoadMore() {
  STATE.PAGE += 1;
  await loadProducts();
}
