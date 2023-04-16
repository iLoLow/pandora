import { Router } from "express";
import { verifyToken, checkIsAdmin } from "../middlewares/auth.mjs";
import { getAllUsers, updateUser, deleteUser } from "../controllers/userController.mjs";
import { updateAnnonce, deleteAnnonce } from "../controllers/annonceController.mjs";

const router = new Router();

// Gestions des utilisateurs
//router.get("/users/count", verifyToken, checkIsAdmin, getUsersCount);
router.get("/users", verifyToken, checkIsAdmin, getAllUsers);
router.patch("/users/:id", verifyToken, checkIsAdmin, updateUser);
router.delete("/users/:id", verifyToken, checkIsAdmin, deleteUser);

// Gestion des annonces
//router.get("/annonces/count", verifyToken, checkIsAdmin, getAnnoncesCount);
router.patch("/annonces/:id", verifyToken, checkIsAdmin, updateAnnonce);
router.delete("/annonces/:id", verifyToken, checkIsAdmin, deleteAnnonce);

export default router;
