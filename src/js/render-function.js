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
