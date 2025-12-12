import {
  handleCategoryClick,
  handleClearSearchForm,
  handleLoadMore,
  handleProductClick,
  handleSearchForm,
  initHomePage,
} from './js/handlers';
import { toggleTheme } from './js/header';
import { closeModal } from './js/modal';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initHomePage);
refs.themeToggleBtn.addEventListener('click', toggleTheme);
refs.categoriesList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', handleProductClick);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.loadMoreBtn.addEventListener('click', handleLoadMore);
refs.searchForm.addEventListener('submit', handleSearchForm);
refs.clearSearchFormBtn.addEventListener('click', handleClearSearchForm);
