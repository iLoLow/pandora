import Webhook from "../models/Webhook.mjs";

export const createWebhook = async (req, res) => {
  const { type, webhook_url, server_id, role_id } = req.body;

  try {
    await Webhook.create(type, webhook_url, server_id, role_id);
    res.status(201).json({ message: "Webhook créé", code: 201 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de créer le webhook", code: 500 });
  }
};

export const getAllWebhooks = async (req, res) => {
  try {
    const webhooks = await Webhook.getAll();
    res.status(200).json(webhooks);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer les webhooks", code: 500 });
  }
};

export const getWebhookByType = async (req, res) => {
  try {
    const webhook = await Webhook.getWebhookbyType(req.params.type);
    res.status(200).json(webhook);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer le webhook", code: 500 });
  }
};

export const activateWebhook = async (req, res) => {
  try {
    const { active } = req.body;

    await Webhook.activate(req.params.type, !!active);
    const webhook = await Webhook.getWebhookbyType(req.params.type);
    res.status(200).json(webhook[0]);
  } catch (error) {
    res.status(500).json({ error: "Impossible d'activer / désactiver le webhook", code: 500 });
  }
};

export const deleteWebhook = async (req, res) => {
  try {
    await Webhook.delete(req.params.type);
    res.status(200).json({ message: "Webhook supprimé", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de supprimer le webhook", code: 500 });
  }
};
