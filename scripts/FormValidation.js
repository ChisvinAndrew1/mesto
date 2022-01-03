export default class FormValidation {
  constructor(data, form) {
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
  }

  enableValidation () {
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setListenersToForm();
    };

  _setListenersToForm () {

    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      this._addListenersToInput(inputElement);
    });

    this._form.addEventListener('input', () => {
      this._handleFormInput(buttonElement);
    });

    this.toggleButtonState(buttonElement);
    };



  _addListenersToInput(inputElement) {
      const errorContainer = document.querySelector(`#${inputElement.id}-error`);
      inputElement.addEventListener('input', () => {
        this.handleFieldValidation(inputElement, errorContainer);
      })

    };

    _handleFormInput(buttonElement) {
      this.toggleButtonState(buttonElement);
  }

  toggleButtonState(buttonElement) {
    const isFormInvalid = !this._form.checkValidity();
    buttonElement.disabled = isFormInvalid;
    buttonElement.classList.toggle(this._inactiveButtonClass, isFormInvalid);
  }

  handleFieldValidation(inputElement, errorContainer) {
    inputElement.classList.toggle(this._inputErrorClass, !inputElement.validity.valid);
    errorContainer.textContent = inputElement.validationMessage;
  }

}
