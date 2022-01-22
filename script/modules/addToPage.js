import { createRow } from "./createElements.js";

export const addProductToPage = (product) => {
  const tableBody = document.querySelector(".table__body");
  tableBody.append(createRow(product));
};
