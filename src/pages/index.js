import './index.css';
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidation from "../scripts/components/FormValidation.js";
import Api from "../scripts/components/Api.js";
import {
  selectorPopupImage,
  objValidate,
  selectorSectionGallery,
  popupOpenButtonElementGallery,
  popupOpenButtonElementProfile,
  popupOpenButtonElementAvatar,
  profileSelectors,
  nameInput,
  jobInput,
  formElementProfile,
  formElementGallery,
  formElementAvatar,
} from "../scripts/utils/constants.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithConfirm from "../scripts/components/PopupWithConfirm.js";
import UserInfo from "../scripts/components/UserInfo.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-35/",
  headers: {
    authorization: "3a13c265-ffe0-404a-8040-f4ca857631c9",
    "Content-type": "application/json",
  },
});
function getDefaultData() {
  api
    .getDefaultData()
    .then((data) => {
      const [userData, cards] = data;
      userInfo.setUserInfo(userData);
      sectionGallery.renderItems(cards);
    })
    .catch((err) => console.log(err));
}
getDefaultData();

function createCard(data) {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        popupImage.open(data);
      },
      handleDeleteCard: () => {
        popupConfirm.open();
        popupConfirm.setSubmit(() => {
          api
            .deleteCard(card.getId())
            .then(() => {
              card.handleCardDelete();
            })
            .then(() => popupConfirm.close())
            .catch((err) => console.log(`Не удалось удалить карточку: ${err}`));
        });
      },
      handleLikeCard: (data) => {
        api
          .checkDateLike(data)
          .then((data) => {
            card.checkDateLike(data);
          })
          .catch((err) => console.log(`Не удалось поставить лайк: ${err}`));
      },
      userId: userInfo._id,
    },
    ".template_item"
  );
  const cardElement = card.createCard();
  return cardElement;
}

const editFormValidator = new FormValidation(objValidate, formElementProfile);
const cardFormValidator = new FormValidation(objValidate, formElementGallery);
const avatarFormValidator = new FormValidation(objValidate, formElementAvatar);
const userInfo = new UserInfo(profileSelectors);
const popupImage = new PopupWithImage(selectorPopupImage);
popupImage.setEventListeners();

const sectionGallery = new Section((el) => {
  const cardElement = createCard(el);
  sectionGallery.addItem(cardElement);
}, selectorSectionGallery);

const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: ({ name, about }) => {
    popupProfile.renderLoading(true);

    api
      .editInfo({ name, about })
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => popupProfile.close())
      .catch((err) => `Не удалось отредактировать профиль, ошибка ${err}`)
      .finally(() => popupProfile.renderLoading(false));
  },
});
popupProfile.setEventListeners();

const popupGallery = new PopupWithForm({
  popupSelector: ".popup_type_gallery",
  handleFormSubmit: ({ place, link }) => {
    popupGallery.renderLoading(true);

    api
      .addCard({ place, link })
      .then((formData) => {
        const cardElement = createCard(formData);
        sectionGallery.setItem(cardElement);
      })
      .then(() => popupGallery.close())
      .catch((err) => console.log(`Ошибка, карточка не создалась ${err}`))
      .finally(() => popupGallery.renderLoading(false));
  },
});
popupGallery.setEventListeners();

const popupConfirm = new PopupWithConfirm(".popup_type_confirm");
popupConfirm.setEventListeners();
const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: ({ avatar }) => {
    popupAvatar.renderLoading(true);

    api
      .editAvatar({ avatar })
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => popupConfirm.close())
      .catch((err) => `Не удалось отредактировать профиль, ошибка ${err}`)
      .finally(() => popupAvatar.renderLoading(false));
  },
});
popupAvatar.setEventListeners();

popupOpenButtonElementProfile.addEventListener("click", () => {
  editFormValidator.cleanErrorValidate();
  editFormValidator.cleanButtonState();
  handleInputProfile();
  popupProfile.open();
});

popupOpenButtonElementAvatar.addEventListener("click", () => {
  avatarFormValidator.cleanErrorValidate();
  avatarFormValidator.cleanButtonState();
  popupAvatar.open();
});

function handleInputProfile() {
  const userObjectInfo = userInfo.getUserInfo();
  nameInput.value = userObjectInfo.name;
  jobInput.value = userObjectInfo.about;
}

popupOpenButtonElementGallery.addEventListener("click", () => {
  cardFormValidator.cleanErrorValidate();
  cardFormValidator.cleanButtonState();
  popupGallery.open();
});

function enableValidation() {
  editFormValidator.enableValidation();
  cardFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
}

enableValidation();
