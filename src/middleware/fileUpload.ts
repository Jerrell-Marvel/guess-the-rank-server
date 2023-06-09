import multer from "multer";
import { BadRequestError } from "../errors/BadRequestError";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/rank-images"));
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname).toLowerCase());
  },
});

export const upload = multer({
  storage,

  limits: {
    fileSize: 1024 * 1024 * 3,
  },

  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new BadRequestError("File upload only supports the following filetypes - " + filetypes + extname));
  },
});
