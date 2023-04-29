import { useEffect, useState } from "react";
import "../../styles/boutique/Panier.css";
import Button from "../Others/Button";
import { toBlob } from "html-to-image";
import { panierValidationSchema } from "../../utils/schemasValidation";
import useToast from "../../hooks/useToast";
import { useNavigate, Link } from "react-router-dom";
import { getInfosWebhook, sendEmbedsToDiscord } from "../../services/WebHookDiscord";
import identifiant from "../../assets/discord.gif";

function Panier({ isOpen, cart, setCart }) {
  const initialvalues = {
    webhook_url: "",
    server_id: "",
    role_id: "",
    pseudo_id: "",
    active: false,
  };

  const [total, setTotal] = useState(0);
  const [values, setValues] = useState(initialvalues);
  const [channelId, setChannelId] = useState("");
  const [errors, setErrors] = useState({});
  const notify = useToast();
  const navigate = useNavigate();

  const getInfosWebhookBoutique = async () => {
    try {
      const wh = await getInfosWebhook("boutique");

      if (!Boolean(wh.active)) {
        navigate("/boutique/maintenance");
      }

      setValues({ ...values, webhook_url: wh.webhook_url, server_id: wh.server_id, role_id: wh.role_id, active: Boolean(wh.active) });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfosWebhookBoutique();
  }, []);

  /**
   * Convert html to file
   */
  const htmlToFile = async () => {
    const quality = 0.9;
    const canvas = document.createElement("canvas");
    const img = new Image();
    const url = URL.createObjectURL(await toBlob(document.getElementById("panier")));
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width + 20;
        canvas.height = img.height + 20;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 10, 10);
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], "panier.jpeg", { type: "image/jpeg", lastModified: Date.now() });
            resolve(file);
          },
          "image/jpeg",
          quality
        );
      };
      img.src = url;
      img.onerror = reject;
    });
  };

  //calculer le total
  useEffect(() => {
    let t = 0;
    cart.forEach((item) => {
      t += Number(item.price);
    });

    setTotal(t);
  }, [cart, total]);

  // Vider le panier
  const handleClearPanier = () => {
    localStorage.removeItem("panier");
    setCart([]);
    notify("success", "Panier vidé");
  };

  // Supprimer un item du panier
  const handleDeleteItem = (id) => {
    const newPanier = cart.filter((item) => item.id !== id);
    localStorage.setItem("panier", JSON.stringify(newPanier));
    setCart(newPanier);
    notify("success", "Vehicule supprimé");
  };

  const submitPanier = async () => {
    if (!cart || cart.length === 0) {
      return notify("warning", "Veuillez selectionner un article.");
    }

    try {
      const validated = await panierValidationSchema.validate(values, { abortEarly: false });

      const formdata = new FormData();
      const file = await htmlToFile();
      formdata.append("blob", file);

      const message = {
        content: `<@&${values.role_id}>  Envoyé par <@${validated.pseudo_id}>`,
        embeds: [
          {
            color: 3447003,
            image: {
              url: "attachment://panier.jpeg",
            },
          },
        ],
      };

      formdata.append("payload_json", JSON.stringify(message));

      const data = await sendEmbedsToDiscord(values.webhook_url, formdata);

      if (data) {
        setChannelId(data.channel_id);
        localStorage.removeItem("panier");
        setCart([]);
        notify("success", "Panier envoyé sur discord avec succès");
      }
    } catch (error) {
      console.log(error);
      const errors = error.inner.reduce((acc, error) => {
        return { ...acc, [error.path]: error.message };
      }, {});
      setErrors(errors);
    }
  };

  // Envoi du panier sur discord
  const handleSubmitPanier = (e) => {
    e.preventDefault();
    submitPanier();
  };

  //si le panier est vide, on vide le pseudo
  useEffect(() => {
    if (total === 0) {
      setErrors({});
    }
  }, [total]);

  return (
    <>
      <div className={isOpen ? "panierItems isOpen" : "panierItems"}>
        <h3>Réservation</h3>
        <div id="panier">
          {cart && (
            <table>
              <thead>
                <tr>
                  <th>Véhicule</th>
                  <th>Prix</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, key) => (
                  <tr key={key}>
                    <td>{item.name_article}</td>
                    <td>{item.price}€</td>
                    <td>
                      <div className="panierIcone" onClick={() => handleDeleteItem(item.id)}>
                        <svg className="delete" fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none" />
                          <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total :</td>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    {total} €
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
        <Button color="red" children="Vider le panier" onClick={() => handleClearPanier()} />
        <form className="form" action="post" onSubmit={(e) => handleSubmitPanier(e)}>
          <div className="containerImgIdentifiant">{<img src={identifiant} alt="" />}</div>
          <form-group>
            <label>Votre Identifiant Discord :</label>
            <input type="text" value={values.pseudo_id} onChange={(e) => setValues({ ...values, pseudo_id: e.target.value })} />
            {errors.pseudo_id && <small className="errorSmall">{errors.pseudo_id}</small>}
          </form-group>
          <Button type="submit" color="green" children="Valider" />
        </form>
        {channelId && (
          <div>
            <Link className="link" to={"discord://discord/channels/" + values.server_id + "/" + channelId}>
              Voir ma réservation sur Discord
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Panier;
