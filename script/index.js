import { formControl, openPopup, closePopUp } from "./modules/control.js";
import { renderGoods, deleteGood } from "./modules/goods.js";
import { getTotalPrice } from "./modules/getTotalPrice.js";
import { products } from "../data.js";

{
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("active");
  const modal = document.querySelector(".modal");
  modal.style.display = "none";

  renderGoods(products);
  deleteGood();
  openPopup();
  closePopUp();
  formControl();
  getTotalPrice(products);
  console.log('products: ', products);
  
}
