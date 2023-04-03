import { useSelector } from "react-redux";
import "../../styles/tableaudebord/ProfilAdmin.css";
import moment from "../../utils/moment";
import Button from "../../components/Button";
import useToast from "../../hooks/useToast";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UpdateUserForm from "../../components/UpdateUserForm";

function ProfilAdmin() {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const notify = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const deleteUser = async () => {
    try {
      confirm("Voulez-vous supprimer définitivement votre compte ?");

      const response = await fetch("/api/users/" + user.user_id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();

      if (data.error) {
        notify("error", data.error);
        throw new Error(data.code + " " + data.error);
      }

      if (data.code === 500) {
        notify("error", data.error);
      }

      if (data.code === 403) {
        notify("error", data.error);
      }

      if (data) {
        notify("success", data.message);
        dispatch(setLogout());
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateHandleProfil = () => {
    setIsOpen(!isOpen);
  };

  const deleteHandleProfil = () => {
    deleteUser();
  };

  if (!user) {
    return;
  }

  return (
    <section className="profilAdminWrapper">
      {/* Header */}
      <div className="profilAdminHeader">
        <h2>Profil de {user.username}</h2>
      </div>

      {/* Profil Card */}
      <div className="profilAdminCard">
        <div className="profilAdminAvatar">
          <img src={user.avatar_url} alt="avatar" />
        </div>
        <div className="profilAdminInfo">
          <div className="profilAdminInfoItem">
            <span className="profilAdminInfoKey">nom d'utilisateur : </span>
            <span className="profilAdminInfoValue">{user.username}</span>
          </div>
          <div className="profilAdminInfoItem">
            <span className="profilAdminInfoKey">email: </span>
            <span className="profilAdminInfoValue">{user.email}</span>
          </div>
          <div className="profilAdminInfoItem">
            <span className="profilAdminInfoKey">date d'inscription : </span>
            <span className="profilAdminInfoValue">{moment(user.created_at).format("DD/MM/YYYY")}</span>
          </div>
          <div className="profilAdminInfoItem">
            <span className="profilAdminInfoKey">mise à jour : </span>
            <span className="profilAdminInfoValue">{moment(user.updated_at).fromNow()}.</span>
          </div>
          {/* Gestion Profil */}
          <div className="profilAdminGestion">
            <Button children="Mettre à jour" color="green" onClick={updateHandleProfil} />
            <Button children="Supprimer" color="red" onClick={deleteHandleProfil} />
          </div>
        </div>
      </div>

      {/* Profil Update */}

      {isOpen && (
        <UpdateUserForm />
      )}
    </section>
  );
}

export default ProfilAdmin;
