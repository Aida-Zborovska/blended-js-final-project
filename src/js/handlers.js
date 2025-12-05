import { STATE } from './constants';
import {
  clearProductsList,
  hideNotFoundBlock,
  showNotFoundBlock,
  updateActiveCategory,
} from './helpers';
import {
  getCategories,
  getAllProducts,
  getProductsByCategory,
} from './products-api';
import { refs } from './refs';
import { renderCategories, renderProducts } from './render-function';

export async function initHomePage() {
  try {
    const categories = await getCategories();
    renderCategories(categories);
  } catch (err) {
    console.error(`Get categories error: ${err}`);
  }
  try {
    const { products } = await getAllProducts(STATE.PAGE);
    renderProducts(products);
  } catch (err) {
    console.error(`Get products error: ${err}`);
  }
}

export async function handleCategoryClick(e) {
  const btnEl = e.target.closest('.categories__btn');
  if (!btnEl) {
    return;
  }
  clearProductsList();
  updateActiveCategory(btnEl);
  hideNotFoundBlock();
  STATE.PAGE = 1;
  const query = btnEl.textContent;
  if (query === 'All') {
    try {
      const { products } = await getAllProducts(STATE.PAGE);
      renderProducts(products);
    } catch (err) {
      console.error(`Get products error: ${err}`);
    }
  } else {
    STATE.QUERY = query;
    try {
      const { products } = await getProductsByCategory(STATE.QUERY, STATE.PAGE);
      if (products.length === 0) {
        showNotFoundBlock();
      } else {
        renderProducts(products);
      }
    } catch (err) {
      console.error(`Get products error: ${err}`);
    }
  }
}
