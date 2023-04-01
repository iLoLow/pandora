import { useState } from "react";
import "../styles/ProfilMenu.css";
import { Link } from "react-router-dom";
import { setLogout } from "../state";
import { useDispatch } from "react-redux";
import Avatar from "./Avatar";

function ProfilMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openHandleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!user) {
    return;
  }

  return (
    <div className="profil-menu" onClick={openHandleMenu}>
      <Avatar avatarUrl={user.avatar_url} />
      {isOpen && (
        <div className="profil-links">
          <Link to={"/tableaudebord"} onClick={() => setIsOpen(!isOpen)}>
            Tableau de bord
          </Link>
          <Link
            to="/"
            onClick={() => {
              setIsOpen(!isOpen);
              dispatch(setLogout());
            }}
          >
            Déconnexion
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProfilMenu;
