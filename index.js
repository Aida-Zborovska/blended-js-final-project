import"./assets/styles-DAE99nJD.js";import{a as r}from"./assets/vendor-2s9xPmg-.js";const l="https://dummyjson.com",c={CATEGORIES:"products/category-list",PRODUCTS:"products"},_=12;r.defaults.baseURL=l;async function g(){return(await r.get(c.CATEGORIES)).data}async function m(t){const s=(t-1)*12;return(await r.get(`${c.PRODUCTS}?limit=${_}&skip=${s}`)).data}const a={categoriesList:document.querySelector("ul.categories"),productsList:document.querySelector("ul.products")};function $(t){const e=["All",...t].map(o=>`<li class="categories__item">
      <button class="categories__btn" type="button">${o}</button>
    </li>`).join("");a.categoriesList.innerHTML=e}function y({products:t}){const s=t.map(({id:e,thumbnail:o,description:n,title:i,brand:p,category:u,price:d})=>`<li class="products__item" data-id="${e}">
    <img class="products__image" src="${o}" alt="${n}"/>
    <p class="products__title">${i}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span></p>${p}
    <p class="products__category">Category: ${u}</p>
    <p class="products__price">Price: ${d}$</p>
 </li>`).join("");a.productsList.innerHTML=s}async function L(){try{const t=await g();$(t)}catch(t){console.error(`Get categories error: ${t}`)}try{const t=await m(1);y(t)}catch(t){console.error(`Get products error: ${t}`)}}document.addEventListener("DOMContentLoaded",L);
//# sourceMappingURL=index.js.map
