import { API_ENDPOINTS, STATE } from './constants';
import {
  canLoadMore,
  clearProductsList,
  hideNotFoundBlock,
  showNotFoundBlock,
  updateActiveCategory,
} from './helpers';
import { openModal } from './modal';
import {
  getCategories,
  getAllProducts,
  getProductsByCategory,
  getProductById,
} from './products-api';
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
  try {
    const { products, total } = await getAllProducts(STATE.PAGE);
    renderProducts(products);
    canLoadMore(total);
  } catch (err) {
    console.error(`Get products error: ${err}`);
  }
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
  const query = btnElem.textContent;
  if (query === 'All') {
    try {
      const { products, total } = await getAllProducts(STATE.PAGE);
      renderProducts(products);
      canLoadMore(total);
    } catch (err) {
      console.error(`Get products error: ${err}`);
    }
  } else {
    STATE.QUERY = query;
    try {
      const { products, total } = await getProductsByCategory(
        STATE.QUERY,
        STATE.PAGE
      );
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
}
