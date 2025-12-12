import { STATE } from './constants';
import { updateHeaderCounterCart, updateHeaderCounterWishlist } from './header';
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
  updateHeaderCounterCart();
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
  updateHeaderCounterWishlist();
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
