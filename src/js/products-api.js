import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, PER_PAGE, STATE } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
  const response = await axios.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
}

export async function getAllProducts() {
  const skip = (STATE.PAGE - 1) * PER_PAGE;
  const response = await axios.get(
    `${API_ENDPOINTS.PRODUCTS}?limit=${PER_PAGE}&skip=${skip}`
  );
  return response.data;
}

export async function getProductsByCategory() {
  const skip = (STATE.PAGE - 1) * PER_PAGE;
  const response = await axios.get(
    `${API_ENDPOINTS.CATEGORY}${STATE.QUERY}?limit=${PER_PAGE}&skip=${skip}`
  );
  return response.data;
}

export async function getProductsBySearch() {
  const skip = (STATE.PAGE - 1) * PER_PAGE;
  const response = await axios.get(
    `${API_ENDPOINTS.SEARCH}?q=${STATE.QUERY}&limit=${PER_PAGE}&skip=${skip}`
  );
  return response.data;
}

export async function getProductById(id) {
  const response = await axios.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  return response.data;
}
