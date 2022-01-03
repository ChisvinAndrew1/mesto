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

const popupElementGallery = document.querySelector(".popup_type_gallery");
const popupOpenButtonElementGallery = document.querySelector(".profile__add-button");

const formElementGallery = document.querySelector(".popup__form_el_gallery");
const nameGalleryInput = formElementGallery.querySelector(".popup__input_el_name-gallery");
const sourseInput = formElementGallery.querySelector(".popup__input_el_source");
const sectionGallery = document.querySelector(".gallery");

const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup_type_image");
const popupElementImage = popupImage.querySelector(".popup__image");
const popupElementText = popupImage.querySelector(".popup__text");

// функция открытия попапа
function addPopupVisibility(popup) {
  popup.classList.add("popup_is-open");
  addStandartListenersKey();
}

// функция скрытия попапов
function removePopupVisibility(popup) {
  popup.classList.remove("popup_is-open");
  removeStandartListenersKey();
  // removeListenersCloseClick();
}

function addStandartListenersKey() {
  document.addEventListener("keydown", closePopupByClickEsc);
}
// удаление стандартных обработчиков для попапов
function removeStandartListenersKey() {
  document.removeEventListener("keydown", closePopupByClickEsc);
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
  renderItem(newCard);
}


function closePopupByClickEsc(evt) {
  const keyEsc = "Escape";
  if (evt.key === keyEsc) {
    const openPopup = document.querySelector(".popup_is-open");
    removePopupVisibility(openPopup);
  }
}
// функция наложение слушателей по клику
function setListenersCloseClick() {
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_is-open")) {
        removePopupVisibility(popup);
      }
      if (evt.target.classList.contains("popup__close")) {
        removePopupVisibility(popup);
      }
    });
  });
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = jobInput.value;
  removePopupVisibility(popupElementProfile);
}

function handlePopupAddCardSubmit(evt) {
  evt.preventDefault();
  submitAddCardForm();
  nameGalleryInput.value = "";
  sourseInput.value = "";
  removePopupVisibility(popupElementGallery);
}

popupOpenButtonElementProfile.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileAboutElement.textContent;
  cleanErrorValidate(popupElementProfile, objValidate);
  handleButtonValidate(popupElementProfile, objValidate);

  addPopupVisibility(popupElementProfile);
});

function handleButtonValidate(popup, {submitButtonSelector, formSelector}) {
  const buttonElement = popup.querySelector(submitButtonSelector);
  const form = popup.querySelector(formSelector);
  const validateForm = new FormValidation(objValidate, form);
  // console.log(validateForm);
  validateForm.toggleButtonState(buttonElement);
}

function cleanErrorValidate(popup, {inputSelector, inputErrorClass}) {
  const inputs = [...popup.querySelectorAll(inputSelector)];
  inputs.forEach((input) => {
    input.classList.remove(inputErrorClass);
    // console.log(input.nextElementSibling);
    input.nextElementSibling.textContent = "";
  });
}

popupOpenButtonElementGallery.addEventListener("click", () => {
  handleButtonValidate(popupElementGallery, objValidate);
  addPopupVisibility(popupElementGallery);
});

popupOpenButtonElementGallery.addEventListener("click", () => {
  addPopupVisibility(popupElementGallery);
});

formElementProfile.addEventListener("submit", handleProfileFormSubmit);

formElementGallery.addEventListener("submit", handlePopupAddCardSubmit);



function renderInitialCards() {
  initialCards.forEach((el) => {
    const card = new Card (el, ".template_item", openPopupImage);
    const cardCreateElement = card.createCard();
    sectionGallery.append(cardCreateElement);
    // console.log(el);
  });
}

function renderItem(el) {
  const card = new Card (el, ".template_item", openPopupImage);
  const cardCreateElement = card.createCard();
  sectionGallery.prepend(cardCreateElement);
}

function enableValidation ({formSelector}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    const validateForm = new FormValidation(objValidate, form);
    validateForm.enableValidation();
  });
};



renderInitialCards();
setListenersCloseClick();
enableValidation(objValidate);
