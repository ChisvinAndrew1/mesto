export const objValidate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__sumbit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

export const initialCards = [
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
export const selectorOpenPopup = "popup-is-open";
export const selectorPopupImage = ".popup_type_image";
const popupImage = document.querySelector(".popup_type_image");
export const popupElementImage = popupImage.querySelector(".popup__image");
export const popupElementText = popupImage.querySelector(".popup__text");
export const popupOpenButtonElementProfile = document.querySelector(
  ".profile__edit-button"
);
export const formElementProfile = document.querySelector(
  ".popup__form_el_profile"
);
export const nameInput = document.querySelector(".popup__input_el_name");
export const jobInput = document.querySelector(".popup__input_el_about");
export const profileSelectors = {
  name_profile: ".profile__name",
  job_profile: ".profile__about-self",
};
export const popupOpenButtonElementGallery = document.querySelector(
  ".profile__add-button"
);
export const formElementGallery = document.querySelector(
  ".popup__form_el_gallery"
);
export const selectorSectionGallery = ".gallery";
