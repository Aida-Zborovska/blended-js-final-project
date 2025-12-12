import { COUNTER, THEME } from './constants';
import { refs } from './refs';
import { getThemeFromLS, loadFromLS, saveToLS, STORAGE_KEY } from './storage';

export function initHeader() {
  updateHeaderCounterCart();
  updateHeaderCounterWishlist();
}

export function updateHeaderCounterCart() {
  const cartItems = loadFromLS(STORAGE_KEY.cart);
  COUNTER.cart = cartItems.length;
  refs.cartCounter.textContent = COUNTER.cart;
}

export function updateHeaderCounterWishlist() {
  const wishlistItems = loadFromLS(STORAGE_KEY.wishlist);
  COUNTER.wishlist = wishlistItems.length;
  refs.wishlistCounter.textContent = COUNTER.wishlist;
}

export function toggleTheme() {
  const theme = getThemeFromLS();
  const newTheme = theme === THEME.light ? THEME.dark : THEME.light;
  refs.themeToggleBtn.innerHTML = newTheme === THEME.light ? '🌙' : '☀️';
  document.body.dataset.theme = newTheme;
  saveToLS(STORAGE_KEY.theme, newTheme);
}
