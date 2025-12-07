import {
  handleCategoryClick,
  handleClearSearchForm,
  handleLoadMore,
  handleProductClick,
  handleSearchForm,
  initHomePage,
} from './js/handlers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', handleProductClick);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);
refs.searhForm.addEventListener('submit', handleSearchForm);
refs.clearSearchFormBtn.addEventListener('click', handleClearSearchForm);
