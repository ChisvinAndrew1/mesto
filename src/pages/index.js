// import './index.css';
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidation from "../scripts/components/FormValidation.js";
import {
  selectorOpenPopup,
  selectorPopupImage,
  objValidate,
  initialCards,
  selectorSectionGallery,
  popupOpenButtonElementGallery,
  popupOpenButtonElementProfile,
  profileSelectors,
  nameInput,
  jobInput,
  formElementProfile,
  formElementGallery,
} from "../scripts/utils/constants.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
const editFormValidator = new FormValidation(objValidate, formElementProfile);
const cardFormValidator = new FormValidation(objValidate, formElementGallery);
const sectionGallery = new Section(
  {
    data: initialCards,
    renderer: (el) => {
      const card = new Card(el, ".template_item", handleCardClick);
      const cardElement = card.createCard();

      sectionGallery.addItem(cardElement);
    },
  },
  selectorSectionGallery
);

const popupGallery = new PopupWithForm({
  popupSelector: ".popup_type_gallery",
  handleFormSubmit: (formData) => {
    const card = new Card(formData, ".template_item", handleCardClick);

    const cardElement = card.createCard();

    sectionGallery.setItem(cardElement);
  },
});
const userInfo = new UserInfo(profileSelectors);

const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  },
});

const handleCardClick = (evt) => {
  const popupImage = new PopupWithImage(selectorPopupImage, selectorOpenPopup);
  popupImage.open(evt);
  popupImage.setEventListeners();
};

popupOpenButtonElementProfile.addEventListener("click", () => {
  editFormValidator.cleanErrorValidate();
  editFormValidator.cleanButtonState();
  handleInputProfile();
  popupProfile.open();
});

function handleInputProfile() {
  const userObjectInfo = userInfo.getUserInfo();
  nameInput.value = userObjectInfo.name_profile;
  jobInput.value = userObjectInfo.job_profile;
}

popupOpenButtonElementGallery.addEventListener("click", () => {
  cardFormValidator.cleanButtonState();
  popupGallery.open();
});

function enableValidation() {
  editFormValidator.enableValidation();
  cardFormValidator.enableValidation();
}

popupGallery.setEventListeners();

popupProfile.setEventListeners();
sectionGallery.renderItems();
enableValidation();
