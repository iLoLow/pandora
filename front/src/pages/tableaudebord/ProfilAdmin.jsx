import { useSelector } from "react-redux";
import "../../styles/tableaudebord/ProfilAdmin.css";
import moment from "../../utils/moment";
import Button from "../../components/Button";

function ProfilAdmin() {
  const user = useSelector((state) => state.user);

  const updateHandleProfil = () => {
    console.log("update profil");
  };

  const deleteHandleProfil = () => {
    console.log("delete profil");
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
    </section>
  );
}

export default ProfilAdmin;
