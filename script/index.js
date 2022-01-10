"use strict";
// Создайте новый репозиторий для проекта crm
// Создайте ветку dev и в версию dev загрузите файлы из архива crm.zip, так как показано во втором видео
// Создайте новую ветку для этого урока, подключите js файл к странице и в константы получите 4 элемента из модального окна
// 1. Заголовок
// 2. Форма
// 3. Чекбокс
// 4. Поле рядом с чекбоксом
// Именование констант должно быть говорящем за себя, по имени должно быть понятно какой элемент в константе хранится.
// На проверку присылайте ссылку на текущую ветку, после принятия работы куратором ветку сливаем в ветку dev и исходную ветку удаляем.

const modalTitle = document.querySelector(".modal__title");
const modalForm = document.querySelector(".modal__form");
const inputName = modalForm.querySelector("#name");
const formDiscountCheckbox = modalForm.querySelector("#discount");
const formDiscountCount = modalForm.querySelector('[name="discount_count"]');

const overlay = document.querySelector(".overlay");
overlay.classList.remove("overlay");

const products = [
  {
    id: 2,
    title: "Смартфон Xiaomi 11T 8/128GB",
    price: 27000,
    description:
      "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    category: "mobile-phone",
    discont: false,
    count: 3,
    images: {
      small: "img/smrtxiaomi11t-m.jpg",
      big: "img/smrtxiaomi11t-b.jpg",
    },
  },
  {
    id: 3,
    title: "Радиоуправляемый автомобиль Cheetan",
    price: 4000,
    description:
      "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    category: "toys",
    discont: 5,
    count: 1,
    images: {
      small: "img/cheetancar-m.jpg",
      big: "img/cheetancar-b.jpg",
    },
  },
  {
    id: 4,
    title: "ТВ приставка MECOOL KI",
    price: 12400,
    description:
      "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    category: "tv-box",
    discont: 15,
    count: 4,
    images: {
      small: "img/tvboxmecool-m.jpg",
      big: "img/tvboxmecool-b.jpg",
    },
  },
];

function createRow(obj) {
  const tr = document.createElement("tr");
  const btnWrapper = document
    .querySelector(".table__cell_btn-wrapper")
    .cloneNode(true);

  tr.innerHTML = `
		<td class="table__cell">${obj.id + 1}</td>
		<td class="table__cell table__cell_left table__cell_name" data-id="24601654816512">
    <span class="table__cell-id">id: 24601654816512</span>
		${obj.title}
		</td>
		<td class="table__cell table__cell_left">${obj.category}</td>
		<td class="table__cell">шт</td>
		<td class="table__cell">${obj.count}</td>
		<td class="table__cell">$${obj.price}</td>
		<td class="table__cell">$${obj.count * obj.price}</td>
	`;
  tr.append(btnWrapper);

  return tr;
}

function renderGoods(arr) {
  const tableBody = document.querySelector(".table__body");

  arr.forEach((item) => {
    tableBody.append(createRow(item));
  });

  return tableBody;
}
renderGoods(products);


function openPopup() {
  const btnAdd = document.querySelector('.panel__add-goods')
  btnAdd.addEventListener('click', () => {
    overlay.classList.add('overlay')
  })
}
openPopup()

function closePopUp() {
  const btnClose = document.querySelector('.modal__close')
  const modalOverlay = document.querySelector('.overlay__modal')
  btnClose.addEventListener('click', () => {
    overlay.classList.remove('overlay')
  })

  modalOverlay.addEventListener('click', e => {
    e.stopPropagation();
  })

  overlay.addEventListener('click', () => {
    overlay.classList.remove('overlay')
  })
}
closePopUp()