import { popupElementImage, popupElementText } from "../utils/constants.js";
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  open(evt) {
    popupElementText.textContent = evt.target.alt;
    popupElementImage.src = evt.target.src;
    popupElementImage.alt = evt.target.alt;
    super.open();
  }
}
