import { initCartPage } from './js/handlers';
import { toggleTheme } from './js/header';
import { closeModal } from './js/modal';
import { refs } from './js/refs';

document.addEventListener('DOMContentLoaded', initCartPage);

refs.themeToggleBtn.addEventListener('click', toggleTheme);
refs.closeModalBtn.addEventListener('click', closeModal);

// при переході на сторінку Cart потрібно прочитати масив з ID продуктів з localStorage,
//  зробити запити за цими продуктами по ендпоінту №3 (використовуй Promise.all()) і
// відрендерити в списку ul.products
// порахуй загальну кількість товарів у Cart і відобрази в боковому меню в Items
// порахуй загальну вартість товарів у Cart і відобрази в боковому меню в Total
// також має працювати на цій сторінці відкриття модального вікна з одним продуктом і можливість
//  додавання/видалення до Wishlist або Cart
// клік по кнопці Buy Products виводить повідомлення про успішне придбання товарів (для повідомлень
//  використовуй бібліотеку iziToast)
