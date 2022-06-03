import { formControl, openPopup, closePopUp } from "./modules/control.js";
import { setModifyGood } from "./modules/goods.js";
import { createSelect, getGoodsFromDb } from "../data.js";


getGoodsFromDb();
{
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("active");
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  
  const response = await fetch("http://localhost:3000/api/goods");
  let productsFromDb = await response.json();
  
  createSelect()
  openPopup();
  closePopUp();
  
  document.querySelector(".panel__add-goods").addEventListener("click", () => {
    formControl(productsFromDb);
  });
  


  document.querySelectorAll(".table__btn_edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      setModifyGood(productsFromDb);
    });
  });
}
