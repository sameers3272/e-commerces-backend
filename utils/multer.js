const multer = require("multer");


const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

exports.upload = multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: "avatar", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ])