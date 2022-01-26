export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.name_profile);
    this._job = document.querySelector(data.job_profile);

  }
  // this._formValues[input.name] = input.value;
  getUserInfo = () => {

    const userObjectInfo = {}
    userObjectInfo.name_profile = this._name.textContent;
    userObjectInfo.job_profile = this._job.textContent;

    return userObjectInfo;

  }

  setUserInfo = (formdata) => {
    this._name.textContent = formdata.name_profile;
    this._job.textContent = formdata.job_profile;
  }

}
