export default class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
  }

  open() {
    this._container.classList.add("popup_is-open");
  }

  close() {
    this._container.classList.remove("popup_is-open");
  }

  _handleEscClose = (evt) => {
    const keyEsc = "Escape";
    if (evt.key === keyEsc) {
      this.close();
    }
  };

  _handleClose = (evt) => {
    const openPopup = evt.target;
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      this.close(openPopup);
    }
  };

  setEventListeners() {
    this._container.addEventListener("click", this._handleClose);
    document.addEventListener("keydown", this._handleEscClose);
  }
}
