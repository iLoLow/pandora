import { Router } from "express";
import { multerStorage } from "../middlewares/multer.mjs";
import { verifyToken, checkIsAdmin } from "../middlewares/auth.mjs";
import { createBoutiqueItem, getAllBoutiqueItems, getBoutiqueItem, updateBoutiqueItem, deleteBoutiqueItem } from "../controllers/boutiqueController.mjs";

const router = new Router();

router.post("/", verifyToken, checkIsAdmin, multerStorage.single("image"), createBoutiqueItem);
router.get("/", getAllBoutiqueItems);
router.get("/single/:id", getBoutiqueItem);
router.patch("/:id", verifyToken, checkIsAdmin, multerStorage.single("image"), updateBoutiqueItem);
router.delete("/:id", verifyToken, checkIsAdmin, deleteBoutiqueItem);

export default router;
