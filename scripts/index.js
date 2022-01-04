import Card  from './Card.js';
import FormValidation  from './FormValidation.js';
import {initialCards}  from './intial-cards.js';
import {objValidate}  from './objValidate.js';

const popupElementProfile = document.querySelector(".popup_type_profile");
const popupOpenButtonElementProfile = document.querySelector(".profile__edit-button");
const formElementProfile = document.querySelector(".popup__form_el_profile");
const nameInput = formElementProfile.querySelector(".popup__input_el_name");
const jobInput = formElementProfile.querySelector(".popup__input_el_about");
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about-self");
const popupCloseButtonElementProfile = popupElementProfile.querySelector('.popup__close_el_profile');

const popupElementGallery = document.querySelector(".popup_type_gallery");
const popupOpenButtonElementGallery = document.querySelector(".profile__add-button");
const popupCloseButtonElementGallery = popupElementGallery.querySelector('.popup__close_el_gallery');

const formElementGallery = document.querySelector(".popup__form_el_gallery");
const nameGalleryInput = formElementGallery.querySelector(".popup__input_el_name-gallery");
const sourseInput = formElementGallery.querySelector(".popup__input_el_source");
const sectionGallery = document.querySelector(".gallery");

// const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup_type_image");
const popupElementImage = popupImage.querySelector(".popup__image");
const popupElementText = popupImage.querySelector(".popup__text");
const popupCloseButtonPopupImage = document.querySelector('.popup__close_el_image');

const editFormValidator = new FormValidation(objValidate, formElementProfile);
const cardFormValidator = new FormValidation(objValidate, formElementGallery);



// функция открытия попапа
function addPopupVisibility(popup) {
  popup.classList.add("popup_is-open");
  addStandartListenersKey(popup);
}

// функция скрытия попапов
function removePopupVisibility(popup) {
  popup.classList.remove("popup_is-open");
  removeStandartListenersKey(popup);
  // removeListenersCloseClick();
}

function addStandartListenersKey(popup) {
  document.addEventListener("keydown", closePopupByClickEsc);
  popup.addEventListener('click', closePopupByClickOverlay);

}
// удаление стандартных обработчиков для попапов
function removeStandartListenersKey(popup) {
  document.removeEventListener("keydown", closePopupByClickEsc);
  popup.removeEventListener('click', closePopupByClickOverlay);

}

function openPopupImage(evt) {
  popupElementText.textContent = evt.target.alt;
  popupElementImage.src = evt.target.src;
  popupElementImage.alt = evt.target.alt;
  addPopupVisibility(popupImage);
}

function submitAddCardForm() {
  const newCard = {
    name: nameGalleryInput.value,
    link: sourseInput.value,
  };
  const cardCreateElement = renderItem(newCard);
  sectionGallery.prepend(cardCreateElement);
}

function closePopupByClickOverlay(evt) {
  const openPopup = evt.target;
  if(evt.target === evt.currentTarget) {
    removePopupVisibility(openPopup);
  }
};

const handlePopupCloseButtonClick = (evt) => {
  const openPopup = evt.target.closest('.popup_is-open');
  removePopupVisibility(openPopup);
 };

function closePopupByClickEsc(evt) {
  const keyEsc = "Escape";
  if (evt.key === keyEsc) {
    const openPopup = document.querySelector(".popup_is-open");
    removePopupVisibility(openPopup);
  }
}

function handleProfileFormSubmit() {
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = jobInput.value;
  removePopupVisibility(popupElementProfile);
}

function handlePopupAddCardSubmit() {
  submitAddCardForm();
  // nameGalleryInput.value = "";
  // sourseInput.value = "";
  formElementGallery.reset();
  removePopupVisibility(popupElementGallery);
}

popupOpenButtonElementProfile.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileAboutElement.textContent;
  editFormValidator.cleanErrorValidate();

  // cleanErrorValidate(popupElementProfile, objValidate);
  // handleButtonValidate(popupElementProfile, objValidate);
  editFormValidator.cleanButtonState();

  addPopupVisibility(popupElementProfile);
});

popupOpenButtonElementGallery.addEventListener("click", () => {
  // handleButtonValidate(popupElementGallery, objValidate);
  cardFormValidator.cleanButtonState();
  addPopupVisibility(popupElementGallery);
});

popupOpenButtonElementGallery.addEventListener("click", () => {
  addPopupVisibility(popupElementGallery);
});

formElementProfile.addEventListener("submit", handleProfileFormSubmit);

formElementGallery.addEventListener("submit", handlePopupAddCardSubmit);

popupCloseButtonElementProfile.addEventListener('click', handlePopupCloseButtonClick);
popupCloseButtonElementGallery.addEventListener('click', handlePopupCloseButtonClick);
popupCloseButtonPopupImage.addEventListener('click', handlePopupCloseButtonClick);


function renderInitialCards() {
  initialCards.forEach((el) => {
    const cardCreateElement = renderItem(el);
    sectionGallery.append(cardCreateElement);
  });
}

function renderItem(el) {
  const card = new Card (el, ".template_item", openPopupImage);
  const cardCreateElement = card.createCard();
  return cardCreateElement;
}

function enableValidation() {
  editFormValidator.enableValidation();
  cardFormValidator.enableValidation();
  };


renderInitialCards();
// setListenersCloseClick();
enableValidation();
