const authModel = require("../model/Auth");
const formResponse = require("../helper/formResponse");

module.exports = {
  register: (req, res) => {
    const { email: email, password: password, fullName: fullName } = req.body;
    console.log(password.length);
    if (password.length > 7) {
      if ((email & password, fullName)) {
        authModel
          .register(email.trim(), password.trim(), fullName.trim())
          .then((data) => formResponse(data, res, 200, "Success"))
          .catch(() => formResponse([], res, 404, "failed"));
      } else {
        formResponse([], res, 406, "Fill all fields");
      }
    } else {
      formResponse([], res, 406, "Password must be more than 8 character");
    }
  },
  login: (req, res) => {
    const { email, password, device_token } = req.body;
    console.log(email, password, device_token);
    console.log("from controller");
    if (device_token) {
      authModel
        .checkDevice(email, device_token)
        .then(() => {
          if (email && password) {
            authModel
              .login(email, password)
              .then((data) => formResponse(data, res, 200, "Success"))
              .catch(() => formResponse([], res, 404, "failed"));
          } else {
            formResponse([], res, 404, "Fill all fields");
          }
        })
        .catch((err) => formResponse([], res, 404, err.message));
    }
  },
  createPin: (req, res) => {
    const { pin, email } = req.body;
    if (pin.length == 6) {
      if (email) {
        authModel
          .createPin(pin, email)
          .then((data) => formResponse(data, res, 200, "Success"))
          .catch(() => formResponse([], res, 404, "failed"));
      } else {
        formResponse([], res, 404, "data not found");
      }
    } else {
      formResponse([], res, 406, "pin must be 6 character");
    }
  },
  resetPassword: (req, res) => {
    const { password, email } = req.body;
    // console.log(password, "controller pw");
    if (password.length >= 8) {
      if (email) {
        authModel
          .resetPassword(password, email)
          .then((data) => formResponse(data, res, 200, "Success"))
          .catch(() => formResponse([], res, 404, "failed"));
      } else {
        formResponse([], res, 404, "data not found");
      }
    } else {
      formResponse([], res, 406, "Password must be more than 8 character");
    }
  },
};
