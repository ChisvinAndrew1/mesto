
export default class Card {
  constructor(data, cardSelector, openPopupImage) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._image = data.link;
    this._openPopupImage = openPopupImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true)
      .children[0];

    return cardElement;
  }

  _setCardListeners() {
    this._element
    .querySelector(".card__stroke")
    .addEventListener("click", this._handleCardLike);
    this._element
    .querySelector(".card__trash")
    .addEventListener("click", this._handleCardDelete);
    this._element
    .querySelector(".card__image")
    .addEventListener("click", this._openPopupImage);
  }

  _handleCardLike = (evt) => {
    evt.target.classList.toggle("card__stroke_active");
  }

  _handleCardDelete = () => {
    this._element.remove();
  }

  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__el-title').textContent = this._name;
    this._setCardListeners();
    return this._element;
  }
}
