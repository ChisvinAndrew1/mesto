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
const userTemplate = document.querySelector(".template_item").content;

const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup_type_image");
const popupElementImage = popupImage.querySelector(".popup__image");
const popupElementText = popupImage.querySelector(".popup__text");

// функция главная по отрисовке массива
function renderInitialCards() {
  initialCards.forEach((el) => {
    const cardCreateElement = createCard(el);
    sectionGallery.append(cardCreateElement);
    // renderItem(element);
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
  popup.classList.add("popup_is-open");
  addStandartListenersKey();
  setListenersCloseClick();
}

// функция скрытия попапов
function removePopupVisibility(popup) {
  popup.classList.remove("popup_is-open");
  addStandartListenersKey();
  removeListenersCloseClick();
}

function cleanErrorValidate(popup) {
  const inputs = [...popup.querySelectorAll(".popup__input")];
  inputs.forEach((input) => {
    input.classList.remove("popup__input_state_invalid");
    // console.log(input.nextElementSibling);
    input.nextElementSibling.textContent = "";
  });
}
// слушатель для кнопки редактирования профиля
popupOpenButtonElementProfile.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileAboutElement.textContent;
  cleanErrorValidate(popupElementProfile);
  handleButtonValidate(popupElementProfile);
  addPopupVisibility(popupElementProfile);
});

// функция на слушатели
function setCardListeners(element) {
  element
    .querySelector(".card__stroke")
    .addEventListener("click", handleCardLike);
  element
    .querySelector(".card__trash")
    .addEventListener("click", handleCardDelete);
  element
    .querySelector(".card__image")
    .addEventListener("click", renderPopupImage);
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

// функция закрытия попапов через эскейп
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
    popup.addEventListener("click", handleListenersCloseClick);
  });
}
// функция управления событиями на клике
function handleListenersCloseClick(evt) {
  const openPopup = document.querySelector(".popup_is-open");
  if (evt.target.classList.contains("popup_is-open")) {
    removePopupVisibility(openPopup);
  }
  if (evt.target.classList.contains("popup__close")) {
    removePopupVisibility(openPopup);
  }
}
// функция удаления слушателей по клику
function removeListenersCloseClick() {
  popups.forEach((popup) => {
    popup.removeEventListener("click", handleListenersCloseClick);
  });
}

// обраблтчики стандартные для попапов
function addStandartListenersKey() {
  document.addEventListener("keydown", closePopupByClickEsc);
}
// удаление стандартных обработчиков для попапов
function removeStandartListenersKey() {
  document.removeEventListener("keydown", closePopupByClickEsc);
}
// функция обнуления кнопки самбита
function handleButtonValidate(popup) {
  const buttonElement = popup.querySelector(".popup__sumbit");
  buttonElement.disabled = true;
  buttonElement.classList.add("popup__submit_invalid");
}

// функция слушатель для кнопки добавления карточек
popupOpenButtonElementGallery.addEventListener("click", () => {
  addPopupVisibility(popupElementGallery);
});
// слушатель сабмита добавления карточки
formElementGallery.addEventListener("submit", handlePopupAddCardSubmit);

// функция самбита для попапа профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = jobInput.value;
  removePopupVisibility(popupElementProfile);
}

// колбек самбита добавления каточек
function handlePopupAddCardSubmit(evt) {
  evt.preventDefault();
  nameGalleryInput.value = "";
  sourseInput.value = "";
  handleButtonValidate(popupElementGallery);
  submitAddCardForm();
  removePopupVisibility(popupElementGallery);
}

// слушатель самбита профиля
formElementProfile.addEventListener("submit", handleProfileFormSubmit);

// вызов главной функции
renderInitialCards();
