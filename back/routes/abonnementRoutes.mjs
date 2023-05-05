import { Router } from "express";
import { multerStorage } from "../middlewares/multer.mjs";
import { verifyToken, checkIsAdmin } from "../middlewares/auth.mjs";
import {
  createAbonnement,
  getAllAbonnements,
  getAbonnement,
  getLastAbonnements,
  getAbonnementsByUser,
  updateAbonnement,
  deleteAbonnement,
} from "../controllers/abonnementController.mjs";

const router = new Router();

router.post("/", verifyToken, checkIsAdmin, multerStorage.array("abonnement_image"), createAbonnement);
router.get("/", getAllAbonnements);
router.get("/last", getLastAbonnements);
router.get("/:id", getAbonnement);
router.get("/single/:id", getAbonnementsByUser);
router.patch("/:id", verifyToken, checkIsAdmin, multerStorage.array("abonnement_image"), updateAbonnement);
router.delete("/:id", verifyToken, checkIsAdmin, deleteAbonnement);

export default router;
