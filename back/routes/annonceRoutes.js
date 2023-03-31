import { Router } from "express";
import { multerStorage } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/auth.js";
import { createAnnonce, getAllAnnonces, getAnnoncesByUser, getAnnonce, updateAnnonce, deleteAnnonce } from "../controllers/annonceController.js";

const router = new Router();

router.post("/", verifyToken, multerStorage.single("image"), createAnnonce);
router.get("/", getAllAnnonces);
router.get("/:userId", verifyToken, getAnnoncesByUser);
router.get("/:id", getAnnonce);
router.patch("/:id", verifyToken, multerStorage.single("image"), updateAnnonce);
router.delete("/:id", verifyToken, deleteAnnonce);

export default router;
