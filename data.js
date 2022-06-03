import { getTotalPrice } from "./script/modules/getTotalPrice.js";
import { deleteGood, renderGoods } from "./script/modules/goods.js";

export let products = [];
const panelFilter = document.querySelector(".panel__filter");
const enteredVal = document.querySelector(".panel__input");
let filteredGoods = "";

export const createSelect = async (className) => {
  const response = await fetch(`http://localhost:3000/api/category`);
  let productsFromDb = await response.json();

  productsFromDb.forEach((category) => {
    document
      .querySelector(`.${"filter-list"}`)
      .insertAdjacentHTML(
        "afterbegin",
        `<option value="${category}"></option>`
      );
  });
};

// createSelect();

export const getFilteredGoods = async (category) => {
  const response = await fetch(
    `http://localhost:3000/api/goods/category/${category}`
  );
  let productsFromDb = await response.json();

  if (category === "Все категории") {
    const response = await fetch(`http://localhost:3000/api/goods`);
    productsFromDb = await response.json();
  }

  renderGoods(productsFromDb);

  deleteGood(productsFromDb);

  getTotalPrice(productsFromDb);

  getFilteredGoodsBy(productsFromDb);

  return products;
};

panelFilter.addEventListener("change", () => {
  getFilteredGoods(panelFilter.value);
  panelFilter.placeholder = panelFilter.value;
  panelFilter.value = "";
  createSelect();
});

export const getFilteredGoodsBy = (products) => {
  if (enteredVal.value.length === 0) {
    renderGoods(products);
  }

  enteredVal.addEventListener("input", () => {
    if (enteredVal.value.length != 0) {
      filteredGoods = products.filter((obj) =>
        obj.title.includes(enteredVal.value)
      );

      renderGoods(filteredGoods);
      deleteGood(filteredGoods);

      getTotalPrice(filteredGoods);
    } else if (enteredVal.value.length === 0) {
      renderGoods(products);
    }
  });
};

export const getGoodsFromDb = async () => {
  const response = await fetch("http://localhost:3000/api/goods");
  let productsFromDb = await response.json();

  products = productsFromDb;

  getFilteredGoodsBy(products);

  deleteGood(products);

  getTotalPrice(products);

  return products;
};
