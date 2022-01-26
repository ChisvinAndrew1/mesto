import './index.css';
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
  popupElementText,
  popupElementImage
} from "../scripts/utils/constants.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
const createCard = (item) => {
  const card = new Card(item, ".template_item", handleCardClick);
  const cardElement = card.createCard();
  return cardElement
}

const editFormValidator = new FormValidation(objValidate, formElementProfile);
const cardFormValidator = new FormValidation(objValidate, formElementGallery);
const sectionGallery = new Section(
  {
    data: initialCards,
    renderer: (el) => {
      const cardElement =  createCard(el);
      sectionGallery.addItem(cardElement);
    },
  },
  selectorSectionGallery
);


const popupGallery = new PopupWithForm({
  popupSelector: ".popup_type_gallery",
  handleFormSubmit: (formData) => {
    const cardElement =  createCard(formData);
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
const popupImage = new PopupWithImage(selectorPopupImage, selectorOpenPopup);
popupImage.setEventListeners();

const handleCardClick = (evt) => {
  popupImage.open(evt, {popupElementText, popupElementImage,});
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
  cardFormValidator.cleanErrorValidate();
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
