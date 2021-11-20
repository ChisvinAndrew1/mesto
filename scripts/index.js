const popupElementProfile = document.querySelector('.popup_type_profile');
const popupOpenButtonElementProfile = document.querySelector('.profile__edit-button');
const formElementProfile = document.querySelector('.popup__form_el_profile');
const nameInput = formElementProfile.querySelector('.popup__input_el_name');
const jobInput = formElementProfile.querySelector('.popup__input_el_about');
const profileNameElement = document.querySelector('.profile__name');
const profileAboutElement = document.querySelector('.profile__about-self');
const popupCloseButtonElementProfile = popupElementProfile.querySelector('.popup__close_el_profile');

const popupElementGallery = document.querySelector('.popup_type_gallery');
const popupOpenButtonElementGallery = document.querySelector('.profile__add-button');
const popupCloseButtonElementGallery = popupElementGallery.querySelector('.popup__close_el_gallery');

const formElementGallery = document.querySelector(".popup__form_el_gallery");
const nameGalleryInput = formElementGallery.querySelector(".popup__input_el_name-gallery");
const sourseInput = formElementGallery.querySelector(".popup__input_el_source");
const sectionGallery = document.querySelector(".gallery");
const userTemplate = document.querySelector(".template_item").content;

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
// функция создания карточки
function createCard(el) {
  const cardElement = userTemplate.cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__el-title").textContent = el.name;
  cardElementImage.src = el.link;
  cardElementImage.alt = el.name;
  setCardListeners(cardElement);
  return cardElement;
}

// отрисовка одной карточки и вставка ее в разметку
function renderItem(el) {
  const cardCreateElement = createCard(el);
  sectionGallery.prepend(cardCreateElement);
}
// функция добавления пользовательской карточки
function submitAddCardForm() {
  const newCard = {
    name: nameGalleryInput.value,
    link: sourseInput.value,
  };
renderItem(newCard);
}

// функция открытия попапа
function addPopupVisibility(popup) {
  popup.classList.add('popup_is-open');
}
// функция скрытия попапов
function removePopupVisibility(popup) {
  popup.classList.remove('popup_is-open');
}
// функция колбек для слушателя закрытия
const handlePopupCloseButtonClick = (evt) => {
 const openPopup = evt.target.closest('.popup_is-open');
 removePopupVisibility(openPopup);
};

// функция самбита для попапа профиля
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = jobInput.value;
  removePopupVisibility(popupElementProfile);
}

// слушатель для кнопки редактирования профиля
popupOpenButtonElementProfile.addEventListener('click', () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileAboutElement.textContent;
  addPopupVisibility(popupElementProfile);
});

// колбек самбита добавления каточек
function handlePopupAddCardSubmit(evt) {
  evt.preventDefault();
  submitAddCardForm();
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
// функция закрытия попапа через overlay
function closePopupByClickOverlay(evt) {
  const openPopup = evt.target;
  if(evt.target === evt.currentTarget) {
    removePopupVisibility(openPopup);
  }
};
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
// слушатели оверлей
popupElementProfile.addEventListener('click', closePopupByClickOverlay);
popupElementGallery.addEventListener('click', closePopupByClickOverlay);
popupImage.addEventListener('click', closePopupByClickOverlay);
// слушатель самбита профиля
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);
// слушатель для закрытия попапа профиля
popupCloseButtonElementProfile.addEventListener('click', handlePopupCloseButtonClick);

// вызов главной функции
renderInitialCards();
