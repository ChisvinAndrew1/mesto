import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  open(evt, {popupElementText, popupElementImage}) {
    popupElementText.textContent = evt.target.alt;
    popupElementImage.src = evt.target.src;
    popupElementText.alt = evt.target.alt;
    super.open();
  }
}
