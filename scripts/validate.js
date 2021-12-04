const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__sumbit',
  inactiveButtonClass: 'popup__submit_invalid',
  inputErrorClass: 'popup__input_state_invalid',
  // errorClass: 'error__active'
}

// главная функция валидации
const enableValidation = ({formSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setListenersToForm(formElement, rest);
  })
};

// проход по каждому инпуту через массив, событие инпут для формы, обнуление кнопки
const setListenersToForm = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    addListenersToInput(inputElement, rest);
  });

  formElement.addEventListener('input', () => {
    handleFormInput(formElement, buttonElement, inactiveButtonClass);
  });

  toggleButtonState(formElement, buttonElement, inactiveButtonClass);
  };

// обнуление текста ошибки, стиля инпутов, обработчик на событие инпут для каждого инпута
function addListenersToInput(inputElement, {inputErrorClass}) {
  const errorContainer = document.querySelector(`#${inputElement.id}-error`);
  errorContainer.textContent = "";
  inputElement.classList.remove(inputErrorClass);
	inputElement.addEventListener('input', () => {
    handleFieldValidation(inputElement, errorContainer, inputErrorClass);
  })

};
// функция валдации кнопки сабмита для отслеживания всей формы
  function handleFormInput(formElement, buttonElement, inactiveButtonClass) {
    toggleButtonState(formElement, buttonElement, inactiveButtonClass);
}
// валидация кнопки сабмита
function toggleButtonState(formElement, buttonElement, inactiveButtonClass) {
  const isFormInvalid = !formElement.checkValidity();
  buttonElement.disabled = isFormInvalid;
  buttonElement.classList.toggle(inactiveButtonClass, isFormInvalid);
}

// валидация при событии инпут
function handleFieldValidation(inputElement, errorContainer, inputErrorClass) {
  inputElement.classList.toggle(inputErrorClass, !inputElement.validity.valid);
  errorContainer.textContent = inputElement.validationMessage;
}

// вызов валидации
enableValidation(obj);
