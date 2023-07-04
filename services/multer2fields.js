const multer = require("multer");
const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs");

const fileValidation = {
  image: ["image/jpeg", "image/jpg", "image/png"],
  pdf: ["application/pdf"],
};

// const MWE = (err, req, res, next) => {
//   if (err) {
//     res.status(400).json({ message: "Too large file" });
//   } else {
//     next();
//   }
// };

function myMulter(customPath, customValidation) {
  if (!customPath || customPath == null) {
    customPath = "general";
  }

  const fullPath = path.join(__dirname, `../uploads/${customPath}`);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      req.fileDestination = `uploads/${customPath}`;
      cb(null, fullPath);
    },
    filename: function (req, file, cb) {
      cb(null, nanoid() + "_" + file.originalname);
    },
  });

  const fileFilter = function (req, file, cb) {
    if (customValidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.fileError = true;
      cb(null, false);
    }
  };

  const upload = multer({
    dest: fullPath,
    fileFilter,
    storage,
  });

  return upload;
}

module.exports = {  };
