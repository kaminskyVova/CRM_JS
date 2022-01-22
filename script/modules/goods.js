import { createRow } from "./createElements.js";

export function renderGoods(arr) {
  const tableBody = document.querySelector(".table__body");

  let startIdCount = Date.now();
  arr.forEach((item) => {
    startIdCount += 20;
    item.vendorId = Date.now() + startIdCount;
    tableBody.append(createRow(item));
  });

  return tableBody;
}

export function deleteGood() {
  const table = document.querySelector(".table");

  table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".table__btn_del")) {
      target.closest(".goods__row").remove();
      const data = Array.from(table.querySelectorAll(".goods__row"));
    }
  });
}
