import { refs } from './refs';

export function renderCategories(categories) {
  const categoriesList = ['All', ...categories];
  const markup = categoriesList
    .map(
      item =>
        `<li class="categories__item">
      <button class="categories__btn" type="button">${item}</button>
    </li>`
    )
    .join('');
  refs.categoriesList.innerHTML = markup;
}

export function renderProducts({ products }) {
  const markup = products
    .map(
      ({
        id,
        thumbnail,
        description,
        title,
        brand,
        category,
        price,
      }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${description}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span></p>${brand}
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>`
    )
    .join('');
  refs.productsList.innerHTML = markup;
}
