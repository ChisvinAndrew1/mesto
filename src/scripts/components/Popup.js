export default class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._container.classList.add("popup_is-open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._container.classList.remove("popup_is-open");
    document.removeEventListener('keydown', this._handleEscClose);
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
  }
}
