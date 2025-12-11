import { STATE } from './constants';
import { refs } from './refs';
import {
  addProductToLS,
  isProductInLS,
  removeProductFromLS,
  STORAGE_KEY,
} from './storage';

const BTN_TEXT = {
  addToCart: 'Add to Cart',
  removeFromCart: 'Remove from Cart',
  addToWishlist: 'Add to Wishlist',
  removeFromWishlist: 'Remove from Wishlist',
};

// Додавання товарів у кошик.
//коли відкрите модальне вікно з продуктом, клік в кнопку Add to Cart додає ID продукту до масиву
//  і записує в localStorage (ключ cart), кнопка змінює текстовий контент на Remove from Cart.
// при відкритті модального вікна, потрібно перевірити, чи є ID відкритого продукту в масиві кошику -
// якщо є, текстовий контент кнопки повинен змінитись на Remove from cart . Якщо товар відсутній - кнопка
// має текстовий контент Add to cart
// 2. Видалення товарів з кошику.
// клік в кнопку Remove from cart видаляє ID відкритого в модальному вікні продукту з масиву кошика і
// перезаписує в localStorage (ключ cart)
// 3. Оновлення кількості продуктів
//при додаванні або видаленні продуктів в card потрібно оновлювати в навігації кількість продуктів - span.nav__count
refs.addToCardBtn.addEventListener('click', handleCartBtnClick);
refs.addToWishlistBtn.addEventListener('click', handleWishlistBtnClick);

export function openModal() {
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', handleEscapePress);
  refs.modal.addEventListener('click', hanleBackdroppClick);
  STATE.ID = refs.modal.querySelector('.modal-product__content').dataset.id;
  initCartBtn();
  initWishlistBtn();
}

export function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleEscapePress);
  refs.modal.removeEventListener('click', hanleBackdroppClick);
}

function handleCartBtnClick(e) {
  const btnElem = e.target;
  if (btnElem.textContent === BTN_TEXT.addToCart) {
    addProductToLS(STORAGE_KEY.cart);
    btnElem.textContent = BTN_TEXT.removeFromCart;
  } else {
    removeProductFromLS(STORAGE_KEY.cart);
    btnElem.textContent = BTN_TEXT.addToCart;
  }
}

function handleWishlistBtnClick(e) {
  const btnElem = e.target;
  if (btnElem.textContent === BTN_TEXT.addToWishlist) {
    addProductToLS(STORAGE_KEY.wishlist);
    btnElem.textContent = BTN_TEXT.removeFromWishlist;
  } else {
    removeProductFromLS(STORAGE_KEY.wishlist);
    btnElem.textContent = BTN_TEXT.addToWishlist;
  }
}

function handleEscapePress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function hanleBackdroppClick(e) {
  if (e.target === refs.modal) {
    closeModal();
  }
}

function initWishlistBtn() {
  const inWishlist = isProductInLS(STORAGE_KEY.wishlist);
  refs.addToWishlistBtn.textContent = inWishlist
    ? BTN_TEXT.removeFromWishlist
    : BTN_TEXT.addToWishlist;
}

function initCartBtn() {
  const inCart = isProductInLS(STORAGE_KEY.cart);
  refs.addToCardBtn.textContent = inCart
    ? BTN_TEXT.removeFromCart
    : BTN_TEXT.addToCart;
}
