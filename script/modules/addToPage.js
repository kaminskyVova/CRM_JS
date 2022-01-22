import { createRow } from "./createElements.js";
import { getTotalPrice } from "./getTotalPrice.js";
import { products } from "../../data.js";

export const addProductToPage = (product) => {
  const tableBody = document.querySelector(".table__body");
  tableBody.append(createRow(product));
  // getTotalPrice(products);
};
