export function createRow(obj) {
  const table = document.querySelector(".table");

  const tr = document.createElement("tr");
  tr.classList.add("goods__row");

  tr.innerHTML = `
		<td class="table__cell table__cell_left table__cell_name" data-id=${obj.id}>
    <span class="table__cell-id">id: ${obj.id}</span>
		${obj.title}
		</td>
		<td class="table__cell table__cell_left">${obj.category}</td>
		<td class="table__cell">${obj.units}</td>
		<td class="table__cell">${obj.count}</td>
		<td class="table__cell">$${obj.price}</td>
		<td class="table__cell">$${obj.count * obj.price}</td>
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
	`;

  Array.from(table.querySelectorAll("tr"))
    .slice(1)
    .forEach((tr) => {
      tr.classList.add("goods__row");
    });

  return table, tr;
}
