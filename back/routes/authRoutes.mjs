import { Router } from "express";
import { register, login } from "../controllers/authController.mjs";
import { multerStorage } from "../middlewares/multer.mjs";

const router = new Router();

router.post("/register", multerStorage.single("avatar"), register);
router.post("/login", login);

export default router;
