import { Router } from "express";
import { multerStorage } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/auth.js";
import { createAnnonce, getAllAnnonces, getAnnonce, updateAnnonce, deleteAnnonce } from "../controllers/annonceController.js";

const router = new Router();

router.post("/", verifyToken, multerStorage.single("image"), createAnnonce);
router.get("/", getAllAnnonces);
router.get("/:id", getAnnonce);
router.put("/:id", verifyToken, multerStorage.single("image"), updateAnnonce);
router.delete("/:id", verifyToken, deleteAnnonce);

export default router;
