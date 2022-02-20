export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name);
    this._job = document.querySelector(data.about);
    this._avatar = document.querySelector(data.avatar);
  }
  getUserInfo = () => {
    const userObjectInfo = {};
    userObjectInfo.name = this._name.textContent;
    userObjectInfo.about = this._job.textContent;
    userObjectInfo.avatar = this._avatar;
    return userObjectInfo;
  };

  setUserInfo = (formdata) => {
    this._name.textContent = formdata.name;
    this._job.textContent = formdata.about;
    this._avatar.src = formdata.avatar;
    this._id = formdata._id;
  };
}
