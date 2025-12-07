import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, PER_PAGE, STATE } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
  const response = await axios.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
}

export async function getProducts() {
  const skip = (STATE.PAGE - 1) * PER_PAGE;
  let head;
  if (STATE.QUERY === 'All') {
    head = API_ENDPOINTS.PRODUCTS;
  } else {
    head = `${API_ENDPOINTS.CATEGORY}${STATE.QUERY}`;
  }
  const response = await axios.get(`${head}?limit=${PER_PAGE}&skip=${skip}`);
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  return response.data;
}

export async function searchProducts() {
  const skip = (STATE.PAGE - 1) * PER_PAGE;
  const response = await axios.get(
    `${API_ENDPOINTS.SEARCH}?q=${STATE.QUERY}&limit=${PER_PAGE}&skip=${skip}`
  );
  return response.data;
}
