// * Вносим исходные данные

const validationConfig = { // Конфигурация валидации
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorSelector: '.popup__error',
  activeErrorClass: 'popup__error_active',
  invalidInputClass: 'popup__input_invalid'
}

const kareliaImage = new URL('./resources/images/card-images/pic-karelia.jpg', import.meta.url);
const kaliningradImage = new URL('./resources/images/card-images/pic-kalina.jpg', import.meta.url);
const chechnyaImage = new URL('./resources/images/card-images/pic-chechnya.jpg', import.meta.url);
const kalmykiaImage = new URL('./resources/images/card-images/pic-elista.jpg', import.meta.url);
const belgorodImage = new URL('./resources/images/card-images/pic-belgorod.jpg', import.meta.url);
const novorosImage = new URL('./resources/images/card-images/pic-novoros.jpg', import.meta.url);

const initialCards = [ // Карточки «из коробки»
  {
    name: 'Карелия',
    link: kareliaImage,
    alt: 'Скульптура на набережной Онежского озера',
    author: 'Борис Никиташов'
  },
  {
    name: 'Калининград',
    link: kaliningradImage,
    alt: 'Кёнигсбергский собор',
    author: 'Борис Никиташов'
  },
  {
    name: 'Чечня',
    link: chechnyaImage,
    alt: 'Горная дорога вдоль реки Аргун',
    author: 'Борис Никиташов'
  },
  {
    name: 'Калмыкия',
    link: kalmykiaImage,
    alt: 'Золотая обитель Будды Шакьямуни',
    author: 'Борис Никиташов'
  },
  {
    name: 'Белгородчина',
    link: belgorodImage,
    alt: 'Зелёные поля Белгородской области',
    author: 'Борис Никиташов'
  },
  {
    name: 'Новороссийск',
    link: novorosImage,
    alt: 'Набережная Новороссийска',
    author: 'Борис Никиташов'
  },
];

export { validationConfig, initialCards };