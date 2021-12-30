
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


const modalTitle = document.querySelector('.modal__title')
console.log('modalTitle: ', modalTitle);
const modalForm = document.querySelector('.modal__form')
console.log('modalForm: ', modalForm);
const inputName = modalForm.querySelector('#name')
console.log('formTitle: ', inputName);
const formDiscountCheckbox = modalForm.querySelector('#discount')
console.log('formDiscountCheckbox: ', formDiscountCheckbox);
const formDiscountCount = modalForm.querySelector('[name="discount_count"]')
console.log('formDiscountCount: ', formDiscountCount);