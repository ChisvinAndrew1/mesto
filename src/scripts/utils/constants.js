export const objValidate = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__sumbit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

export const selectorOpenPopup = "popup-is-open";
export const selectorPopupImage = ".popup_type_image";
const popupImage = document.querySelector(".popup_type_image");
export const popupElementImage = popupImage.querySelector(".popup__image");
export const popupElementText = popupImage.querySelector(".popup__text");
export const popupOpenButtonElementAvatar =
  document.querySelector(".profile__image");
export const popupOpenButtonElementProfile = document.querySelector(
  ".profile__edit-button"
);
export const formElementProfile = document.querySelector(
  ".popup__form_el_profile"
);
export const nameInput = document.querySelector(".popup__input_el_name");
export const jobInput = document.querySelector(".popup__input_el_about");
export const profileSelectors = {
  name: ".profile__name",
  about: ".profile__about-self",
  avatar: ".profile__image",
};
export const popupOpenButtonElementGallery = document.querySelector(
  ".profile__add-button"
);
export const formElementGallery = document.querySelector(
  ".popup__form_el_gallery"
);
export const formElementAvatar = document.querySelector(
  ".popup__form_el_avatar"
);

export const selectorSectionGallery = ".gallery";
