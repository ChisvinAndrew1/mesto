const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const formElementGallery = document.querySelector(".popup__form_el_gallery");
const nameGalleryInput = formElementGallery.querySelector(".popup__input_el_name-gallery");
const sourseInput = formElementGallery.querySelector(".popup__input_el_source");
const sectionGallery = document.querySelector(".gallery");
const userTemplate = document.querySelector(".template_item").content;
// const cardElement = userTemplate.cloneNode(true);

const popupImage = document.querySelector('.popup_type_image');
const popupCloseButtonElementImage = popupImage.querySelector('.popup__close_el_image');
const popupElementImage = popupImage.querySelector('.popup__image');
const popupElementText = popupImage.querySelector('.popup__text');
const popupCloseButtonPopupImage = document.querySelector('.popup__close_el_image');

// функция главная по отрисовке массива
function renderInitialCards() {
  initialCards.forEach((element) => {
    renderItem(element);
  });
}

function createCard(el) {
  const cardElement = userTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__el-title").textContent = el.name;
  cardElementImage.src = el.link;
  cardElementImage.alt = el.name;
  return cardElement;
}

// отрисовка одной карточки и вставка ее в разметку
function renderItem(el) {
  const cardCreateElement = createCard(el);
  setCardListeners(cardCreateElement);
  sectionGallery.prepend(cardCreateElement);
}
// функция добавления пользовательской карточки
function addCard() {
  const newCard = {
    name: nameGalleryInput.value,
    link: sourseInput.value,
  };
  const cardElement = renderItem(newCard);
}
// колбек самбита
function handlePopupAddCardSubmit(evt) {
  evt.preventDefault();
  addCard();
  removePopupVisibility(popupElementGallery);
}
// функция на слушатели
function setCardListeners(element) {
  element.querySelector(".card__stroke").addEventListener("click", handleCardLike);
  element.querySelector(".card__trash").addEventListener("click", handleCardDelete);
  element.querySelector(".card__image").addEventListener('click', renderPopupImage);
}
// функция лайка
function handleCardLike(event) {
  event.target.classList.toggle("card__stroke_active");
}
// функция удаления карточки
function handleCardDelete(event) {
  event.target.closest(".card").remove();
}
// функция отрисовки попапа с увеличенной картинкой
function renderPopupImage(evt) {
  popupElementText.textContent = evt.target.alt;
  popupElementImage.src = evt.target.src;
  popupElementImage.alt = evt.target.alt;
  addPopupVisibility(popupImage);
}

// функция слушатель для кнопки добавления карточек
popupOpenButtonElementGallery.addEventListener('click', () => {
  nameGalleryInput.value = "";
  sourseInput.value = "";
  addPopupVisibility(popupElementGallery);
});
// слушатель закрытия попапа добавления карточек
popupCloseButtonElementGallery.addEventListener('click', handlePopupCloseButtonClick);
// слушатель закрытия попапа с увеличенной картинкой
popupCloseButtonPopupImage.addEventListener('click', handlePopupCloseButtonClick);
// слушатель самбита добавления карточки
formElementGallery.addEventListener("submit", handlePopupAddCardSubmit);

// вызов главной функции
renderInitialCards();
