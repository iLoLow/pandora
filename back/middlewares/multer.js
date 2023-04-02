import multer from "multer";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/webp": "webp",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets");
  },
  filename: (req, file, cb) => {
    // const extension = MIME_TYPES[file.mimetype];
    // const name = file.originalname.split(".")[0];
    cb(null, file.originalname);
  },
});

export const multerStorage = multer({ storage: storage });
