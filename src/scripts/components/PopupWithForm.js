import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._container.querySelector(".popup__form");
    this._submitButton = this._container.querySelector(".popup__sumbit");
    this._inputList = this._container.querySelectorAll(".popup__input");

  }

  _getInputValues() {

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    // console.log(this._formValues)
    return this._formValues;
  }

  close = () => {
    super.close();
    this._form.reset();
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent =
        "Сохранение...";
    } else {
      this._submitButton.textContent = "Сохранить";
    }
  }
}
