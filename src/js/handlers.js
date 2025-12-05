import { getCategories } from './products-api';
import { renderCategories } from './render-function';

export async function initHomePage() {
  try {
    const categories = await getCategories();
    renderCategories(categories);
  } catch (err) {
    console.error(err);
  }
}
