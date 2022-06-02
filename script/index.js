import { formControl, openPopup, closePopUp } from "./modules/control.js";
import { changeGood } from "./modules/goods.js";
import { getGoodsFromDb } from "../data.js";

getGoodsFromDb();

{
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("active");
  const modal = document.querySelector(".modal");
  modal.style.display = "none";

  const response = await fetch("http://localhost:3000/api/goods");
  let productsFromDb = await response.json();

  openPopup();
  closePopUp();

  document.querySelector(".panel__add-goods").addEventListener("click", () => {
    formControl(productsFromDb);
  });
  document.querySelectorAll(".table__btn_edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeGood(productsFromDb);
      getGoodsFromDb();
    });
  });
}
