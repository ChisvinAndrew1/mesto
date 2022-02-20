import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElementText = this._container.querySelector(".popup__text");
    this._popupElementImage = this._container.querySelector(".popup__image");
  }
  open({ link, name }) {
    this._popupElementText.textContent = name;
    this._popupElementImage.src = link;
    this._popupElementImage.alt = name;
    super.open();
  }
}
