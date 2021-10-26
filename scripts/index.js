const popupElement = document.querySelector(".popup");
const popupCloseButtonElement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const formElement = popupElement.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
const nameInput = formElement.querySelector(".popup__input_el_name");
const jobInput = formElement.querySelector(".popup__input_el_about");
const profileNameElement = document.querySelector(".profile__name");
const profileAboutElement = document.querySelector(".profile__about-self");

function addPopupVisibility() {
  popupElement.classList.add("popup_is-open");
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileAboutElement.textContent;
}

function removePopupVisibility() {
  popupElement.classList.remove("popup_is-open");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileNameElement.textContent = nameInput.value;
  profileAboutElement.textContent = jobInput.value;

}

popupOpenButtonElement.addEventListener("click", addPopupVisibility);
popupCloseButtonElement.addEventListener("click", removePopupVisibility);
formElement.addEventListener("submit", formSubmitHandler);
formElement.addEventListener("submit", removePopupVisibility);
