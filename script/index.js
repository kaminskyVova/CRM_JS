'use strict';
// Создайте новый репозиторий для проекта crm
// Создайте ветку dev и в версию dev загрузите файлы из архива crm.zip, так как показано во втором видео
// Создайте новую ветку для этого урока, подключите js файл к странице и в константы получите 4 элемента из модального окна
// 1. Заголовок
// 2. Форма
// 3. Чекбокс
// 4. Поле рядом с чекбоксом
// Именование констант должно быть говорящем за себя, по имени должно быть понятно какой элемент в константе хранится.
// На проверку присылайте ссылку на текущую ветку, после принятия работы куратором ветку сливаем в ветку dev и исходную ветку удаляем.

const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const inputName = modalForm.querySelector('#name');
const formDiscountCheckbox = modalForm.querySelector('#discount');
const formDiscountCount = modalForm.querySelector('[name="discount_count"]');

// * lesson 02
// В проекте CRM у элемента с классом overlay уберите класс active
// Создайте функцию createRow, которая будет получать объект и на основе объекта формировать строку  для нашей таблицы и возвращать её
// Создайте функцию renderGoods, принимает один параметр массив
// Функция перебирает массив и вставляет строки, созданные на основе createRow, в таблицу
const overlay = document.querySelector('.overlay');
overlay.classList.remove('overlay');

const tableBody = document.querySelector('.table__body');

const products = [
  {
    id: 1,
    title: 'Смартфон Xiaomi 11T 8/128GB',
    price: 27000,
    description:
      'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
    category: 'mobile-phone',
    discont: false,
    count: 3,
    images: {
      small: 'img/smrtxiaomi11t-m.jpg',
      big: 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    id: 2,
    title: 'Радиоуправляемый автомобиль Cheetan',
    price: 4000,
    description:
      'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
    category: 'toys',
    discont: 5,
    count: 1,
    images: {
      small: 'img/cheetancar-m.jpg',
      big: 'img/cheetancar-b.jpg',
    },
  },
  {
    id: 3,
    title: 'ТВ приставка MECOOL KI',
    price: 12400,
    description:
      'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
    category: 'tv-box',
    discont: 15,
    count: 4,
    images: {
      small: 'img/tvboxmecool-m.jpg',
      big: 'img/tvboxmecool-b.jpg',
    },
  },

  // {
  //   id: 4,
  //   title: 'Смартфон Xiaomi 11T 8/128GB',
  //   price: 27000,
  //   description:
  //     'Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.',
  //   category: 'mobile-phone',
  //   discont: false,
  //   count: 3,
  //   images: {
  //     small: 'img/smrtxiaomi11t-m.jpg',
  //     big: 'img/smrtxiaomi11t-b.jpg',
  //   },
  // },
  // {
  //   id: 5,
  //   title: 'Радиоуправляемый автомобиль Cheetan',
  //   price: 4000,
  //   description:
  //     'Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет',
  //   category: 'toys',
  //   discont: 5,
  //   count: 1,
  //   images: {
  //     small: 'img/cheetancar-m.jpg',
  //     big: 'img/cheetancar-b.jpg',
  //   },
  // },
  // {
  //   id: 6,
  //   title: 'ТВ приставка MECOOL KI',
  //   price: 12400,
  //   description:
  //     'Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D',
  //   category: 'tv-box',
  //   discont: 15,
  //   count: 4,
  //   images: {
  //     small: 'img/tvboxmecool-m.jpg',
  //     big: 'img/tvboxmecool-b.jpg',
  //   },
  // },
];

const createRow = (arr) => {
  arr.forEach((item) => {
    const tr = document.createElement('tr');
    const btns = document
      .querySelector('.table__cell_btn-wrapper')
      .cloneNode(true);

    const id = document.createElement('td');
    id.textContent = item.id + 1;
    tr.append(id);

    const title = document.createElement('td');
    title.classList.add('table__cell_left');
    title.textContent = item.title;
    tr.append(title);

    const category = document.createElement('td');
    category.classList.add('table__cell_left');
    category.textContent = item.category;
    tr.append(category);

    const pcs = document.createElement('td');
    pcs.textContent = 'шт';
    tr.append(pcs);

    const count = document.createElement('td');
    count.textContent = item.count;
    tr.append(count);

    const price = document.createElement('td');
    price.textContent = `$${item.price}`;
    tr.append(price);

    const totalPrice = document.createElement('td');
    totalPrice.textContent = `$${item.price * item.count}`;
    tr.append(totalPrice);

    tr.append(btns);

    tableBody.append(tr);
  });

  const tds = document.querySelectorAll('td');
  tds.forEach((td) => td.classList.add('table__cell'));
};
createRow(products);
