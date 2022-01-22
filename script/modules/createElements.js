export function createRow(obj) {
  const table = document.querySelector(".table");

  const tr = document.createElement("tr");
  tr.classList.add("goods__row");

  const btnWrapper = document
    .querySelector(".table__cell_btn-wrapper")
    .cloneNode(true);

  tr.innerHTML = `
		<td class="table__cell table__cell_left table__cell_name" data-id="24601654816512">
    <span class="table__cell-id">id: ${obj.vendorId}</span>
		${obj.title}
		</td>
		<td class="table__cell table__cell_left">${obj.category}</td>
		<td class="table__cell">${obj.units}</td>
		<td class="table__cell">${obj.count}</td>
		<td class="table__cell">$${obj.price}</td>
		<td class="table__cell">$${obj.count * obj.price}</td>
	`;
  tr.append(btnWrapper);

  Array.from(table.querySelectorAll("tr"))
    .slice(1)
    .forEach((tr) => {
      tr.classList.add("goods__row");
    });

  return table, tr;
}
