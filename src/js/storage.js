import { STATE, THEME } from './constants';

export const STORAGE_KEY = {
  cart: 'cart',
  wishlist: 'wishlist',
  theme: 'theme',
};

export function getThemeFromLS() {
  try {
    const data = localStorage.getItem(STORAGE_KEY.theme);
    return data ? JSON.parse(data) : THEME.light;
  } catch (err) {
    console.error(`Error getting theme from LocalStorage: ${err}`);
    return THEME.light;
  }
}

export function saveToLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving to LocalStorage: ${err}`);
  }
}

export function loadFromLS(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`Error loading from LocalStorage: ${err}`);
    return [];
  }
}

export function isProductInLS(key) {
  const data = loadFromLS(key);
  return data.some(productId => productId === STATE.ID);
}

export function addProductToLS(key) {
  const data = loadFromLS(key);
  const isInLS = data.some(productId => productId === STATE.ID);
  if (isInLS) {
    return;
  }
  data.push(STATE.ID);
  saveToLS(key, data);
}

export function removeProductFromLS(key) {
  const data = loadFromLS(key);
  const productIndex = data.findIndex(productId => productId === STATE.ID);
  if (productIndex === -1) {
    return;
  }
  const newData = data.filter(index => index !== data[productIndex]);
  saveToLS(key, newData);
}
