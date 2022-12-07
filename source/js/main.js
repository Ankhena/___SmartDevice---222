import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import Inputmask from './inputmask';
import JustValidate from './just-validate.es';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

const header = document.querySelector('.header');

const accordeonButton = document.querySelector('.footer-menu__control');
const plusButton = document.querySelector('.footer-menu__control-open');
const minusButton = document.querySelector('.footer-menu__control-close');
const footerList = document.querySelector('.footer-menu__list');

const accordeonIcon = document.querySelector('.footer-contacts__accordeon-icon');
const contactsList = document.querySelector('.footer-contacts__list');
const plusButtonContacts = document.querySelector('.footer-contacts__plus');
const minusButtonContacts = document.querySelector('.footer-contacts__minus');

const aboutButton = document.querySelector('.about__button');
const aboutText = document.querySelector('.modal-window__close');
const textAfterDivider = document.querySelector('.about__text--after-divider');
const textAfterDividerMobile = document.querySelector('.about__text--after-divider-mobile');

const closeModal = document.querySelector('.modal-window__close');
const modalWindow = document.querySelector('.modal-window');
const headerCallBack = document.querySelector('.header__calback');
const modalWrapper = document.querySelector('.modal-window__wrapper');

const goodsHeader = document.querySelector('.goods__header');
const goodsHeaderMobile = goodsHeader.dataset.mobileText;

const firstScreenButton = document.querySelector('.first-screen__container-button');
const firstScreenButtonMobile = firstScreenButton.dataset.firstScreenButtonMobile;

// Без JS

footerList.classList.remove('footer-menu__list--no-js');
contactsList.classList.remove('footer-contacts__list--no-js');

// Маска телефона

let selector = document.querySelector('.feedback-form__phone');
let im = new Inputmask('+7 (999) 999-99-99');

im.mask(selector);

// Маска телефона для модального окна

let selectorModal = document.querySelector('.modal-window__phone');
let imModal = new Inputmask('+7 (999) 999-99-99');

imModal.mask(selectorModal);

// Валидация формы

const validation = new JustValidate('#feedback-form');

validation
    .addField('#feedback-form__name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'В имени должно быть больше трёх букв',
      },
      {
        rule: 'maxLength',
        value: 30,
      },
      {
        rule: 'required',
        errorMessage: 'Укажите Ваше имя',
      }
    ])
    .addField('#agreement', [
      {
        rule: 'required',
        errorMessage: 'Вы должны согласиться с правилами',
      }
    ])
    .addField('#feedback-form__phone', [
      {
        rule: 'required',
        errorMessage: 'Укажите Ваш телефон',
      },
      {
        rule: 'maxLength',
        value: 18,
      }
    ]);

// Валидация модального окна

const validationModal = new JustValidate('#modal-window');

validationModal
    .addField('#modal-window__name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'В имени должно быть больше трёх букв',
      },
      {
        rule: 'maxLength',
        value: 30,
      },
      {
        rule: 'required',
        errorMessage: 'Укажите Ваше имя',
      }
    ])
    .addField('#modal-agreement', [
      {
        rule: 'required',
        errorMessage: 'Вы должны согласиться с правилами',
      }
    ])
    .addField('#modal-window__phone', [
      {
        rule: 'required',
        errorMessage: 'Укажите Ваш телефон',
      },
      {
        rule: 'maxLength',
        value: 18,
      }
    ]);

// Фиксация header в desktop

if (window.matchMedia('(min-width: 1028px)').matches) {
  header.style.position = 'sticky';
  header.style.top = '0';
}


accordeonButton.addEventListener('click', () => {
  if (contactsList.classList.contains('footer-contacts__display')) {
    plusButtonContacts.style['display'] = '';
    minusButtonContacts.style['display'] = '';
    contactsList.style['display'] = '';
    plusButtonContacts.classList.toggle('footer-contacts__no-display');
    minusButtonContacts.classList.toggle('footer-contacts__display');
    contactsList.classList.toggle('footer-contacts__display');
  }
  plusButton.classList.toggle('footer-menu__no-display');
  minusButton.classList.toggle('footer-menu__display');
  footerList.classList.toggle('footer-menu__display');
});

accordeonIcon.addEventListener('click', () => {
  if (footerList.classList.contains('footer-menu__display')) {
    plusButton.style['display'] = '';
    minusButton.style['display'] = '';
    footerList.style['display'] = '';
    plusButton.classList.toggle('footer-menu__no-display');
    minusButton.classList.toggle('footer-menu__display');
    footerList.classList.toggle('footer-menu__display');
  }
  plusButtonContacts.classList.toggle('footer-contacts__no-display');
  minusButtonContacts.classList.toggle('footer-contacts__display');
  contactsList.classList.toggle('footer-contacts__display');
});

// Регулировка текста о компании

if (window.matchMedia('(max-width: 768px)').matches) {
  aboutButton.addEventListener('click', () => {
    aboutText.classList.toggle('about__click');
    if (aboutText.classList.contains('about__click')) {
      textAfterDivider.style.display = 'inline';
      textAfterDividerMobile.style.display = 'inline';
      aboutButton.textContent = 'Свернуть';
    } else if (!aboutText.classList.contains('about__click')) {
      textAfterDivider.style.display = 'none';
      textAfterDividerMobile.style.display = 'none';
      aboutButton.textContent = 'Подробнее';
    }
  });
}

if (window.matchMedia('(max-width: 1024px)').matches) {
  goodsHeader.textContent = goodsHeaderMobile;
  firstScreenButton.textContent = firstScreenButtonMobile;
}


if (window.matchMedia('(min-width: 768px)').matches) {
  aboutButton.addEventListener('click', () => {
    aboutText.classList.toggle('about__click');
    if (aboutText.classList.contains('about__click')) {
      textAfterDivider.style.display = 'inline';
      aboutButton.textContent = 'Свернуть';
    } else if (!aboutText.classList.contains('about__click')) {
      textAfterDivider.style.display = 'none';
      aboutButton.textContent = 'Подробнее';
    }
  });
}

// Модальное окно

headerCallBack.addEventListener('click', () => {
  modalWindow.style.display = 'block';
  document.getElementById('modal-window__name').focus();
});

closeModal.addEventListener('click', () => {
  modalWindow.style.display = 'none';
});

modalWindow.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(modalWrapper);

  if (!withinBoundaries) {
    modalWindow.style.display = 'none'; // Cкрываем элемент т.к. клик был за его пределами
  }
});
