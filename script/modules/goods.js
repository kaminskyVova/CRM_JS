import { getFilteredGoodsBy } from "../../data.js";
import { closeErrorPoUp, openErrorPopup, toBase64 } from "./control.js";
import { createRow } from "./createElements.js";
import { getTotalPrice } from "./getTotalPrice.js";
import { previewImg } from "./preview.js";

export function renderGoods(arr) {
  const tableBody = document.querySelector(".table__body");

  tableBody.querySelectorAll(".goods__row").forEach((item) => {
    item.remove();
  });

  if (arr) {
    arr.forEach((item) => {
      tableBody.append(createRow(item));
    });
  }

  return tableBody;
}

export function deleteGood(products) {
  const tbody = document.querySelector(".table__body");
  tbody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("table__btn_del")) {
      const currentTr = target.closest("tr");
      const dataId = currentTr.querySelector("td:nth-child(1)").dataset.id;

      fetch(`http://localhost:3000/api/goods/${dataId}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.status === 200 || response.status === 201) {
          currentTr.remove();
          products.forEach((el, i) => {
            if (el.id == dataId) {
              products.splice(i, 1);
            }
            getTotalPrice(products);
          });
        } else {
          openErrorPopup();
          closeErrorPoUp();
        }
      });
    }
  });
}

const renderChangedGoods = async () => {
  const response = await fetch(`http://localhost:3000/api/goods`);
  let productsFromDb = await response.json();

  renderGoods(productsFromDb);
  deleteGood(productsFromDb);
  getTotalPrice(productsFromDb);
  getFilteredGoodsBy(productsFromDb);
};

export const changeGood = (products) => {
  const tbody = document.querySelector(".table__body");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");

  const vendorCode__id = document.querySelector(".vendor-code__id");
  const modalForm = document.querySelector(".modal__form");
  const modalTitle = document.querySelector(".modal__title");

  let modalTotalPrice = document.querySelector(".modal__total-price");
  const inputTitle = modalForm.querySelector("#name");
  const priceVal = document.querySelector("#price");
  const countVal = document.querySelector("#count");
  const unitsInput = document.querySelector("#units");
  const checkBox = modalForm.querySelector(".modal__checkbox");
  const inputCategory = modalForm.querySelector("#category");
  const inputTextarea = modalForm.querySelector(".modal__input_textarea");
  const discountInput = modalForm.querySelector(".modal__input_discount");
  const btnSubmit = modalForm.querySelector(".modal__submit");

  let modifiedProduct = {};

  modalTitle.textContent = "Изменение товара";
  btnSubmit.textContent = "Добавить изменения";

  tbody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("table__btn_edit")) {
      const currentTr = target.closest("tr");
      const dataId = currentTr.querySelector("td:nth-child(1)").dataset.id;

      const product = Object.values(products);
      product.forEach((item) => {
        if (item.id === dataId) {
          modifiedProduct = item;
        }
      });

      overlay.classList.add("active");
      modal.style.display = "block";

      modalTotalPrice.textContent =
        modifiedProduct.count * modifiedProduct.price;
      inputTitle.value = modifiedProduct.title;
      priceVal.value = modifiedProduct.price;
      countVal.value = modifiedProduct.count;
      unitsInput.value = modifiedProduct.units;
      inputTextarea.value = modifiedProduct.description;
      discountInput.value = modifiedProduct.discount;
      inputCategory.value = modifiedProduct.category;
      vendorCode__id.textContent = modifiedProduct.id;

      checkBox.addEventListener("change", () => {
        if (checkBox.checked && discountInput.disabled === true) {
          discountInput.disabled = false;
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
        const modifiedProduct = Object.fromEntries(formData);

        modifiedProduct.image = await toBase64(modifiedProduct.image);

        await fetch(`http://localhost:3000/api/goods/${dataId}`, {
          method: "PATCH",
          body: JSON.stringify({
            id: modifiedProduct.id,
            title: modifiedProduct.title,
            price: modifiedProduct.price,
            description: modifiedProduct.description,
            category: modifiedProduct.category,
            discount: Number(discountInput.value),
            count: modifiedProduct.count,
            units: modifiedProduct.units,
            image: modifiedProduct.image,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (response.status === 200 || response.status === 201) {
            overlay.classList.remove("active");
            renderChangedGoods();
          } else {
            openErrorPopup();
            closeErrorPoUp();
          }
        });
        location.reload();
      });
    }
  });
};
