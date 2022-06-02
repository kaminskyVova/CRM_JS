export const previewImg = () => {
  const file = document.querySelector(".modal__file");
  const message = document.querySelector(".error__img ");

  const loadedImg = document.querySelector(".loaded__img");

  file.addEventListener("change", (e) => {
    if (file.files.length > 0 && file.files[0].size / 1000000 < 1) {
      const src = URL.createObjectURL(file.files[0]);
      loadedImg.style.display = "block";
      message.style.display = "none";

      loadedImg.src = src;
    } else {
      message.style.display = "block";
      loadedImg.style.display = "none";
    }
  });
};
