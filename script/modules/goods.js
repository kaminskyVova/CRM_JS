import { createRow } from "./createElements.js";
import { getTotalPrice } from "./getTotalPrice.js";

export function renderGoods(arr) {
  const tableBody = document.querySelector(".table__body");

  let startIdCount = Date.now();
  arr.forEach((item) => {
    startIdCount += 20;
    item.vendorId = "";
    tableBody.append(createRow(item));
  });

  return tableBody;
}

export function deleteGood(products) {
  const tbody = document.querySelector(".table__body");
  tbody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("table__btn_del")) {
      const currentTr = target.closest("tr");
      const dataId = currentTr.querySelector("td:nth-child(1)").dataset.id;
      currentTr.remove();
      products.forEach((el, i) => {
        if (el.id == dataId) {
          products.splice(i, 1);
        }
        getTotalPrice(products);
      });
    }
  });
}
