const multer = require("multer");
const path = require("path");
const formResponse = require("./formResponse");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = (req, res, next) => {
  const uploadImage = multer({ storage: storage }).single("images");
  uploadImage(req, res, (err) => {
    err ? formResponse([], res, 500, "Internal Server Error") : next();
  });
};

module.exports = upload;
