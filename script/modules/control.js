import { createSelect} from "../../data.js";
import { addProductToPage } from "./addToPage.js";
import { previewImg } from "./preview.js";

let vendorId = "";
const vendorCode__id = document.querySelector(".vendor-code__id");
const overlay = document.querySelector(".overlay");
const modalForm = document.querySelector(".modal__form");

let modalTotalPrice = document.querySelector(".modal__total-price");
const priceVal = document.querySelector("#price");
const countVal = document.querySelector("#count");
const unitsInput = document.querySelector("#units");
const checkBox = modalForm.querySelector(".modal__checkbox");
const inputTextarea = modalForm.querySelector(".modal__input_textarea");
const discountInput = modalForm.querySelector(".modal__input_discount");
const modalPreviewFile = modalForm.querySelector(".modal__file");

export function openPopup() {
  const modal = document.querySelector(".modal");
  const btnAdd = document.querySelector(".panel__add-goods");

  btnAdd.addEventListener("click", () => {
    vendorId = Math.random().toString().substring(2, 10);
    vendorCode__id.textContent = vendorId;
    overlay.classList.add("active");
    modal.style.display = "block";
  });
}

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("loadend", () => {
      resolve(reader.result);
    });

    reader.addEventListener("error", (err) => {
      reject(err);
    });

    reader.readAsDataURL(file);
  });

  export const createModalSelect = async (className) => {
    const response = await fetch(`http://localhost:3000/api/category`);
    let productsFromDb = await response.json();
  
    productsFromDb.forEach((category) => {
      document
        .querySelector(`.${"category-list"}`)
        .insertAdjacentHTML(
          "afterbegin",
          `<option value="${category}"></option>`
        );
    });
  };

  createModalSelect();



export const formControl = (products) => {
  const modalTitle = document.querySelector(".modal__title");
  const btnSubmit = modalForm.querySelector(".modal__submit");

  modalTitle.textContent = "Добавить товар";
  btnSubmit.textContent = "Добавить товар";

  modalTotalPrice.textContent = `$${0}`;

  checkBox.addEventListener("change", () => {
    if (checkBox.checked && discountInput.disabled === true) {
      discountInput.disabled = false;
    } else {
      discountInput.disabled = true;
    }
  });

  priceVal.addEventListener("change", () => {
    modalTotalPrice.textContent = `$${priceVal.value * countVal.value}`;
  });

  countVal.addEventListener("change", () => {
    modalTotalPrice.textContent = `$${priceVal.value * countVal.value}`;
  });

  previewImg();

  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);

    newProduct.id = vendorId;
    newProduct.discount = Number(discountInput.value);

    modalTotalPrice.textContent = `$${0}`;

    newProduct.image = await toBase64(newProduct.image);

    const addToDb = async () => {
      fetch("http://localhost:3000/api33/goods", {
        method: "POST",
        body: JSON.stringify({
          id: newProduct.id,
          title: newProduct.title,
          price: newProduct.price,
          description: newProduct.description,
          category: newProduct.category,
          discount: newProduct.discount,
          count: newProduct.count,
          units: newProduct.units,
          image: newProduct.image,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200 || response.status === 201) {
          addProductToPage(newProduct);
          overlay.classList.remove("active");
          modalForm.reset();
          closePopUp();
          location.reload();
        } else {
          openErrorPopup();
          closeErrorPoUp();
        }
      });
    };
    
    addToDb();
    return { newProduct };
  });
};




export function openErrorPopup() {
  document.querySelector(".modal__server-error").style.display = "block";
}

export function closeErrorPoUp() {
  document
    .querySelector(".modal__error-close")
    .addEventListener("click", () => {
      document.querySelector(".modal__server-error").style.display = "none";
    });
}

export function closePopUp() {
  overlay.classList.remove("active");
  const modal = document.querySelector(".modal");
  modal.style.display = "none";

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
