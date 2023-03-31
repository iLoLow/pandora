import { Router } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = new Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);
router.put("/:userId", verifyToken, updateUser);
router.delete("/:userId", verifyToken, deleteUser);

export default router;
