import { Router } from "express";
import { verifyToken, checkIsAdmin } from "../middlewares/auth.mjs";
import { getAllUsers, updateUser, deleteUser } from "../controllers/userController.mjs";
import { updateAnnonce, deleteAnnonce } from "../controllers/annonceController.mjs";
import { createMemberTeam, getTeamByOrder, updateMemberTeam, updateOrderMemberTeam, deleteMemberTeam } from "../controllers/teamController.mjs";
import { multerStorage } from "../middlewares/multer.mjs";

const router = new Router();

// Gestions des utilisateurs
router.get("/users", verifyToken, checkIsAdmin, getAllUsers);
router.patch("/users/:id", verifyToken, checkIsAdmin, updateUser);
router.delete("/users/:id", verifyToken, checkIsAdmin, deleteUser);

// Gestion des annonces
router.patch("/annonces/:id", verifyToken, checkIsAdmin, updateAnnonce);
router.delete("/annonces/:id", verifyToken, checkIsAdmin, deleteAnnonce);

router.post("/team", verifyToken, checkIsAdmin, multerStorage.single("avatar_image"), createMemberTeam);
router.get("/team", getTeamByOrder);
router.patch("/team/:id", verifyToken, checkIsAdmin, multerStorage.single("avatar_image"), updateMemberTeam);
router.patch("/team/order/:id", verifyToken, checkIsAdmin, updateOrderMemberTeam);
router.delete("/team/:id", verifyToken, checkIsAdmin, deleteMemberTeam);

export default router;
