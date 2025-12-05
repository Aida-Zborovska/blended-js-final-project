import { getCategories, getProducts } from './products-api';
import { renderCategories, renderProducts } from './render-function';

export async function initHomePage() {
  try {
    const categories = await getCategories();
    renderCategories(categories);
  } catch (err) {
    console.error(`Get categories error: ${err}`);
  }
  try {
    const products = await getProducts(1);
    renderProducts(products);
  } catch (err) {
    console.error(`Get products error: ${err}`);
  }
}
