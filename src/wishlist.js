import { handleProductClick, initWishlistPage } from './js/handlers';
import { toggleTheme } from './js/header';
import { closeModal } from './js/modal';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initWishlistPage);

refs.themeToggleBtn.addEventListener('click', toggleTheme);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.productsList.addEventListener('click', handleProductClick);
