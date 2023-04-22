import Webhook from "../models/Webhook.mjs";

export const createWebhook = async (req, res) => {
  const { webhook_url, is_active } = req.body;

  try {
    await Webhook.create(webhook_url, is_active);
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

export const getWebhook = async (req, res) => {
  try {
    const webhook = await Webhook.getById(req.params.id);
    res.status(200).json(webhook[0]);
  } catch (error) {
    res.status(500).json({ error: "Impossible de récupérer le webhook", code: 500 });
  }
};

export const updateWebhook = async (req, res) => {
  const { webhook_url } = req.body;

  try {
    await Webhook.update(webhook_url, is_active, req.params.id);
    res.status(200).json({ message: "Webhook modifié", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de modifier le webhook", code: 500 });
  }
};
export const deleteWebhook = async (req, res) => {
  try {
    const webhook = await Webhook.getById(req.params.id);
    await Webhook.delete(req.params.id);
    res.status(200).json({ message: "Webhook supprimé", code: 200 });
  } catch (error) {
    res.status(500).json({ error: "Impossible de supprimer le webhook", code: 500 });
  }
};
