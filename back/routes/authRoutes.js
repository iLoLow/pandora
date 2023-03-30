import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { multerStorage } from "../middlewares/multer.js";

const router = new Router();

router.post("/register", multerStorage.single("avatar"), register);
router.post("/login", login);

export default router;
