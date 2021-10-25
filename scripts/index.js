const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = popupElement.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
const nameInput = formElement.querySelector('.popup__input_el_name');
const jobInput = formElement.querySelector('.popup__input_el_about');

function AddPopupVisibility() {
  popupElement.classList.add('popup_is-open');
};

function RemovePopupVisibility() {
  popupElement.classList.remove('popup_is-open');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  const ProfileNameElement = document.querySelector('.profile__name');
  const ProfileAboutElement = document.querySelector('.profile__about-self');
  ProfileNameElement.textContent = nameInput.value;
  ProfileAboutElement.textContent = jobInput.value;
  nameInput.value = ProfileNameElement.textContent;
  jobInput.value =  ProfileAboutElement.textContent;
};

popupOpenButtonElement.addEventListener('click', AddPopupVisibility);
popupCloseButtonElement.addEventListener('click', RemovePopupVisibility);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', RemovePopupVisibility);

