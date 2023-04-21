import Router from "express";
import { checkIsAdmin, verifyToken } from "../middlewares/auth.mjs";
import { getAllBanner, createBanner, deleteBanner, updateBanner } from "../controllers/bannerController.mjs";
import { multerStorage } from "../middlewares/multer.mjs";

const router = new Router();

router.get("/", getAllBanner);
router.post("/", verifyToken, checkIsAdmin, multerStorage.single("banner_image"), createBanner);
router.patch("/:id", verifyToken, checkIsAdmin, multerStorage.single("banner_image"), updateBanner);
router.delete("/:id", verifyToken, checkIsAdmin, deleteBanner);

export default router;
