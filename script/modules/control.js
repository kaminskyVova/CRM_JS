import { addProductToPage } from "./addToPage.js";
import { addProductToData } from "./addToData.js";

export const formControl = (products) => {
  const modalForm = document.querySelector(".modal__form");
  const overlay = document.querySelector(".overlay");

  let modalTotalPrice = document.querySelector(".modal__total-price");
  const priceVal = document.querySelector("#price");
  const countVal = document.querySelector("#count");
  const discountInput = modalForm.querySelector(".modal__input_discount");
  const checkBox = modalForm.querySelector(".modal__checkbox");
  let vendorId = '';

  modalTotalPrice.textContent = `$${0}`;

  checkBox.addEventListener("click", () => {
    if (checkBox.checked && discountInput.disabled === true) {
      discountInput.disabled = false;
    } else {
      discountInput.disabled = true;
      discountInput.value = "";
    }
  });

  priceVal.addEventListener("change", () => {
    modalTotalPrice.textContent = `$${priceVal.value * countVal.value}`;
  });

  countVal.addEventListener("change", () => {
    modalTotalPrice.textContent = `$${priceVal.value * countVal.value}`;
  });

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);

    const vendorCode__id = document.querySelector(".vendor-code__id");
    vendorId = vendorCode__id.textContent = Math.random().toString().substring(2, 10);

    newProduct.id = vendorId;
    addProductToData(newProduct);
    addProductToPage(newProduct);
    modalForm.reset();
    modalTotalPrice.textContent = `$${0}`;
    overlay.classList.remove("active");

    return{ newProduct};
  });
};

export function openPopup() {
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".modal");
  const vendorCode__id = document.querySelector(".vendor-code__id");
  const btnAdd = document.querySelector(".panel__add-goods");

  btnAdd.addEventListener("click", () => {
    vendorCode__id.textContent = Math.random().toString().substring(2, 10);
    overlay.classList.add("active");
    modal.style.display = "block";
  });
}

export function closePopUp() {
  const modalForm = document.querySelector(".modal__form");

  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("active");
  const modal = document.querySelector(".modal");
  modal.style.display = "none";

  let modalTotalPrice = document.querySelector(".modal__total-price");
  const priceVal = document.querySelector("#price");
  const countVal = document.querySelector("#count");
  const unitsInput = document.querySelector("#units");
  const discountInput = modalForm.querySelector(".modal__input_discount");
  const checkBox = modalForm.querySelector(".modal__checkbox");
  const inputTextarea = modalForm.querySelector(".modal__input_textarea");

  const modalOverlay = document.querySelector(".overlay");

  modalOverlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target.closest(".modal__close") || target === modalOverlay) {
      overlay.classList.remove("active");
      modal.style.display = "none";
      modalTotalPrice.textContent = `$${0}`;
      priceVal.value = "";
      countVal.value = "";
      unitsInput.value = "";
      discountInput.value = "";
      inputTextarea.value = "";
      checkBox.checked = false;
      discountInput.disabled = true;
    }
  });
}
