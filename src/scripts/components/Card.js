export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteCard, handleLikeCard, userId },
    cardSelector
  ) {
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._openPopupImage = handleCardClick;
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._element = this._getTemplate();
    this._isLiked = this._likes.some((item) => {
      return item._id === userId;
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._sumStroke = this._element.querySelector(".card__sum-stroke");
    this._cardStroke = this._element.querySelector(".card__stroke");
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._sumStroke.textContent = this._likes.length;
    this._setIsLiked();
    this._element.querySelector(".card__el-title").textContent = this._name;
    this._setCardListeners();
    this._checkIfOwnerCard();
    console.log(this._element);
    return this._element;
  }

  _setCardListeners() {
    this._cardStroke.addEventListener("click", () => this._handleLikeCard(this));
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleDeleteCard(this));
      this._cardImage
      .addEventListener("click", this._openPopupImage.bind(this));
  }

  _handleAddCardLike(data) {
    this._cardStroke
      .classList.add("card__stroke_active");
      this._sumStroke.textContent = data.likes.length;
    this._isLiked = true;
  }

  _handleRemoveCardLike(data) {
    this._cardStroke
      .classList.remove("card__stroke_active");
      this._sumStroke.textContent = data.likes.length;
      this._isLiked = false;
  }

  handleCardDelete = () => {
    this._element.remove();
    this._element = null;
  };

  _setIsLiked() {
    if (this._isLiked) {
      this._cardStroke
        .classList.add("card__stroke_active");
    }
  }

  getId() {
    return this._id;
  }

  _checkIfOwnerCard() {
    if (this._userId !== this._owner) {
      this._element
        .querySelector(".card__trash")
        .classList.add("card__trash_inactive");
    }
  }

  checkDateLike(data) {
    if (this._isLiked) {
      this._handleRemoveCardLike(data);
    } else {
      this._handleAddCardLike(data);
    }
  }
}
