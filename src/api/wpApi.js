import axios from 'axios';

// const BASE_URL = 'http://192.168.0.80:3003';
// const API_URL = '/wp-json/wc/v3';
const API_URL = '/wp-json/wc/store/v1';

const BASE_URL = 'http://192.168.0.80:4008';
const API_URL_V2 = '/wp-json/wp/v2';

const TAXONOMIES_URL = BASE_URL + API_URL_V2 + '/taxonomies';
const POSTS_URL = BASE_URL + API_URL_V2 + '/posts';
const USERS_URL = BASE_URL + API_URL_V2 + '/users';

const PRODUCTS_URL = BASE_URL + API_URL + '/products';
const PRODUCTS_CATEGORIES_URL = BASE_URL + API_URL + '/products/categories';
const COUPONS_URL = BASE_URL + API_URL + '/cart/coupons';

export const getTaxonomies = async () => {
  const { data } = await axios.get(TAXONOMIES_URL);
  //   console.log(data);
  return data;
};

export const getPosts = async () => {
  const { data } = await axios.get(POSTS_URL);
  // console.log(data);
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(USERS_URL);
  // console.log(data);
  return data;
};

export const getAllData = async () => {
  const { data } = await axios.get(BASE_URL + API_URL);
  // console.log(data);
  return data;
};

export const getAllCoupons = async () => {
  const { data } = await axios.get(COUPONS_URL);
  // console.log(data, 'getAllCoupons');
  return data;
};

export const getCouponId = async (id) => {
  const { data } = await axios.get(COUPONS_URL + id);
  // console.log(data);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await axios.get(PRODUCTS_URL);
  // console.log(data, 'getAllProducts');
  return data;
};

export const getProductsByCategoryId = async (categoryId) => {
  const { data } = await axios.get(PRODUCTS_URL + '?category=' + categoryId);
  // console.log(data, 'getAllProducts');
  return data;
};

export const getAllCategories = async () => {
  const { data } = await axios.get(PRODUCTS_CATEGORIES_URL);
  // console.log(data, 'getAllCategories');
  return data;
};

export const getCategoryById = async (id) => {
  const { data } = await axios.get(PRODUCTS_CATEGORIES_URL + '/' + id);
  // console.log(data, 'getCategoryById');
  return data;
};
