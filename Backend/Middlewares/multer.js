import multer from "multer";
import {v4 as uuid} from "uuid"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/tempImageStore')
    },
    filename: function (req, file, cb) {
     
      const uniqueSuffix = uuid()
      cb(null, uniqueSuffix + file.originalname)
    }
  })
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image uploads are allowed."));
    return;
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    files: 4,
  },
})
