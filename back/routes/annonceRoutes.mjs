import { Router } from "express";
import { multerStorage } from "../middlewares/multer.mjs";
import { verifyToken } from "../middlewares/auth.mjs";
import {
  createAnnonce,
  getAllAnnonces,
  getAnnonce,
  getLastAnnonces,
  getAnnoncesByUser,
  updateAnnonce,
  deleteAnnonce,
  likeOrDislikeAnnonce,
} from "../controllers/annonceController.mjs";

const router = new Router();

router.post("/", verifyToken, multerStorage.single("image"), createAnnonce);
router.get("/", getAllAnnonces);
router.get("/single/:id", getAnnonce);
router.get("/last", getLastAnnonces);
router.get("/user/:userId", verifyToken, getAnnoncesByUser);
router.patch("/:id", verifyToken, multerStorage.single("image"), updateAnnonce);
router.delete("/:id", verifyToken, deleteAnnonce);
router.patch("/like/:id", likeOrDislikeAnnonce);

export default router;
