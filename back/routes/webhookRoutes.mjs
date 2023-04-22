import Router from "express";
import { checkIsAdmin, verifyToken } from "../middlewares/auth.mjs";
import { getAllWebhooks, createWebhook, deleteWebhook, updateWebhook } from "../controllers/webhookController.mjs";

const router = new Router();

router.get("/", getAllWebhooks);
router.post("/", verifyToken, checkIsAdmin, createWebhook);
router.patch("/:id", verifyToken, checkIsAdmin, updateWebhook);
router.delete("/:id", verifyToken, checkIsAdmin, deleteWebhook);

export default router;
