import { useState } from "react";
import "../../styles/layout/ProfilMenu.css";
import { Link } from "react-router-dom";
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";
import Avatar from "../Others/Avatar";
import useToast from "../../hooks/useToast";

function ProfilMenu({ user, menuOpen, setMenuOpen = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const notify = useToast();

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
        <div className="profil-links" onMouseLeave={() => setIsOpen(!isOpen)}>
          <Link
            to={"/tableaudebord"}
            onClick={() => {
              setIsOpen(!isOpen);
              setMenuOpen(!menuOpen);
            }}
          >
            Tableau de bord
          </Link>
          <Link
            to="/"
            onClick={() => {
              setIsOpen(!isOpen);
              dispatch(setLogout());
              notify("info", "Vous êtes déconnecté");
              setMenuOpen(!menuOpen);
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
