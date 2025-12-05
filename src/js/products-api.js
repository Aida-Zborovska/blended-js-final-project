import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, PER_PAGE } from './constants';

axios.defaults.baseURL = API_BASE_URL;

export async function getCategories() {
  const response = await axios.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
}

export async function getProducts(page) {
  const skip = (page - 1) * 12;
  const response = await axios.get(
    `${API_ENDPOINTS.PRODUCTS}?limit=${PER_PAGE}&skip=${skip}`
  );
  return response.data;
}
