export const previewImg = () => {
  const file = document.querySelector(".modal__file");

  const toBase64 = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.addEventListener("loaded", () => {
        res(reader.result);
      });

      reader.addEventListener("error", (err) => {
        rej(err);
      });

      reader.readAsDataURL(file);
    });

  file.addEventListener("change", async () => {
    if (file.files.length > 0) {
      const src = URL.createObjectURL(file.files[0]);
      const img = document.createElement("img");

      const widthWin = 800;
      const heightWin = 600;

      const offsetTop = (screen.height - heightWin) / 2;
      const offsetLeft = (screen.width - widthWin) / 2;

      img.width = "100" + "%";
      img.height = "100" + "%";
      img.alt = "good_img";

      if (file.files[0].size / 1000000 > 1) {
        const message = document.querySelector(".error__img ");
        message.style.display = "block";
      } else {
        let win = open(
          (img.src = src),
          "",
          `width=${widthWin},height=${heightWin},top=${offsetTop},left=${offsetLeft}`
        );
        win.document.body.append(img);
      }

			const result = await toBase64(file.files[0]);
      console.log("result: ", result);
    }
  });
};
