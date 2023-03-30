import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AnnonceForm.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function AnnonceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});

  const { user_id } = useSelector((state) => state.user) || "";
  const token = useSelector((state) => state.token) || "";

  const navigate = useNavigate();

  const createAnnonce = async (formData) => {
    await fetch("/api/annonces", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("image_url", "/assets/" + image.name);

    createAnnonce(formData);
  };

  return (
    <form className="formAnnonce" method="POST" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="title">Titre</label>
      <input type="text" name="title" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" cols="30" rows="10" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <label htmlFor="image">Image</label>
      <input type="file" accept="image/*" name="image" id="image" value={image[0]} onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Créer</button>
    </form>
  );
}

export default AnnonceForm;
