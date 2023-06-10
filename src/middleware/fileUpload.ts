import multer from "multer";
import { BadRequestError } from "../errors/BadRequestError";
import path from "path";

export const fileUpload = (fieldName: string, destination: string) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        // console.log(path.resolve(__dirname, "..", "/public/rank-images", "rank-images"));
        // console.log(path.resolve(__dirname, "..", ...destination.split("/")));
        cb(null, path.resolve(__dirname, "..", ...destination.split("/")));
      },

      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname).toLowerCase());
      },
    }),

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
      cb(new BadRequestError("File upload only supports the following filetypes - " + filetypes));
    },
  });

  return upload.single(fieldName);
};
