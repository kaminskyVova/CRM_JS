import { createRow } from "./createElements.js";

export const showGoodsImg = (tr) => {
  const productsAttr = tr.querySelector(".table__btn_pic");
  productsAttr.addEventListener("click", (e) => {
    const target = e.target;

    const widthWin = 800;
    const heightWin = 600;

    const offsetTop = (screen.height - heightWin) / 2;
    const offsetLeft = (screen.width - widthWin) / 2;

    const win = open(
      target.dataset.pic,
      "",
      `width=${widthWin},height=${heightWin},top=${offsetTop},left=${offsetLeft}`
    );

    const img = document.createElement("img");
    img.src = target.dataset.pic;
    img.width = "100" + "%";
    img.height = "100" + "%";
    img.alt = "good_img";

    win.document.body.append(img);
  });
};

export const addProductToPage = (product) => {
  const tableBody = document.querySelector(".table__body");
  tableBody.append(createRow(product));
};
