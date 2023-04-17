import { Router } from "express";
import { multerStorage } from "../middlewares/multer.mjs";
import { verifyToken } from "../middlewares/auth.mjs";
import { createBoutique_Item, getAllBoutique_Items, getBoutique_Item, updateBoutique_Item, deleteBoutique_Item } from "../controllers/boutiqueController.mjs";

const router = new Router();

router.post("/", verifyToken, multerStorage.single("image"), createBoutique_Item);
router.get("/", getAllBoutique_Items);
router.get("/single/:id", getBoutique_Item);
router.patch("/:id", verifyToken, multerStorage.single("image"), updateBoutique_Item);
router.delete("/:id", verifyToken, deleteBoutique_Item);

export default router;
