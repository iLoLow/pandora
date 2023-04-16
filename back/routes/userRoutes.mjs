import { Router } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.mjs";
import { verifyToken, checkIsAdmin } from "../middlewares/auth.mjs";
import { multerStorage } from "../middlewares/multer.mjs";

const router = new Router();

router.get("/", verifyToken, checkIsAdmin, getAllUsers);
router.get("/:userId", verifyToken, getUserById);
router.patch("/:userId", verifyToken, multerStorage.single("avatar"), updateUser);
router.delete("/:userId", verifyToken, deleteUser);

export default router;
