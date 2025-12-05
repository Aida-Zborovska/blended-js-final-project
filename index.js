import"./assets/styles-DAE99nJD.js";import{a as e}from"./assets/vendor-2s9xPmg-.js";const n="https://dummyjson.com",r={CATEGORIES:"products/category-list"};e.defaults.baseURL=n;async function a(){return(await e.get(r.CATEGORIES)).data}const c={categoriesList:document.querySelector("ul.categories")};function i(t){const o=["All",...t].map(s=>`<li class="categories__item">
      <button class="categories__btn" type="button">${s}</button>
    </li>`).join("");c.categoriesList.innerHTML=o}async function u(){try{const t=await a();i(t)}catch(t){console.error(t)}}document.addEventListener("DOMContentLoaded",u);
//# sourceMappingURL=index.js.map
