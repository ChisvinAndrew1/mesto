export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element) {
    this._container.append(element);
  }
  setItem(el) {
    this._container.prepend(el);
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
