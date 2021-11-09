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
// слушатель самбита профиля
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);
// слушатель для закрытия попапа профиля
popupCloseButtonElementProfile.addEventListener('click', handlePopupCloseButtonClick);
