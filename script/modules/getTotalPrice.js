export function getTotalPrice(obj) {
  let crmTotalPrice = document.querySelector(".crm__total-price");

  let total = 0;
  obj.forEach((item) => {
    total += item.price * item.count;
  });
  crmTotalPrice.textContent = `$${total}`;
}
