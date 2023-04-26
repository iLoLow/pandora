import { Router } from "express";
import { checkIsAdmin, verifyToken } from "../middlewares/auth.mjs";
import { createWebhook, getAllWebhooks, getWebhookByType, activateWebhook, deleteWebhook } from "../controllers/webhookController.mjs";

const router = new Router();

router.post("/", verifyToken, checkIsAdmin, createWebhook);
router.get("/", getAllWebhooks);
router.get("/:type", getWebhookByType);
router.patch("/:type", verifyToken, checkIsAdmin, activateWebhook);
router.delete("/:type", verifyToken, checkIsAdmin, deleteWebhook);

export default router;
