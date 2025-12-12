import { handleProductClick, initCartPage } from './js/handlers';
import { toggleTheme } from './js/header';
import { closeModal } from './js/modal';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initCartPage);

refs.themeToggleBtn.addEventListener('click', toggleTheme);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.productsList.addEventListener('click', handleProductClick);

// клік по кнопці Buy Products виводить повідомлення про успішне придбання товарів (для повідомлень
//  використовуй бібліотеку iziToast)
