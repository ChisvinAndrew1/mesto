export default class FormValidation {
  constructor(data, form) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
  }

  _inputs = Array.from(document.querySelectorAll('.popup__input'));

  enableValidation () {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setListenersToForm();
    };

  _setListenersToForm () {

    // const inputs =

    this._inputs.forEach((inputElement) => {
      this._addListenersToInput(inputElement);

    });

    this._form.addEventListener('input', () => {
      this._handleFormInput();
    });

    this._toggleButtonState();
    };



  _addListenersToInput(inputElement) {
      const errorContainer = document.querySelector(`#${inputElement.id}-error`);
      inputElement.addEventListener('input', () => {
        this._handleFieldValidation(inputElement, errorContainer);
      })

    };

    _handleFormInput() {
      this._toggleButtonState();
  }

  _toggleButtonState() {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    const isFormInvalid = !this._form.checkValidity();
    buttonElement.disabled = isFormInvalid;
    buttonElement.classList.toggle(this._inactiveButtonClass, isFormInvalid);
  }

  _handleFieldValidation(inputElement, errorContainer) {
    inputElement.classList.toggle(this._inputErrorClass, !inputElement.validity.valid);
    errorContainer.textContent = inputElement.validationMessage;
  }

  cleanErrorValidate() {
  this._inputs.forEach((input) => {
    input.classList.remove(this._inputErrorClass);
    // console.log(input.nextElementSibling);
    input.nextElementSibling.textContent = "";
    });
  }

  cleanButtonState() {
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  }


}

