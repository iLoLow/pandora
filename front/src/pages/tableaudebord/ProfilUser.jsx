import { useSelector } from "react-redux";
import "../../styles/tableaudebord/ProfilUser.css";
import useToast from "../../hooks/useToast";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UpdateUserForm from "../../components/Tableaudebord/UpdateUserForm";
import AdminProfilCard from "../../components/Tableaudebord/AdminProfilCard";
import AdminWrapper from "../../components/Others/AdminWrapper";

function ProfilUser() {
  const { user_id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const notify = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch("/api/users/" + user_id, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.code === 500 || data.code === 429) {
        notify("error", data.error);
      }
      if (data.code === 403) {
        notify("error", data.error);
        dispatch(setLogout());
        navigate("/identification");
      }
      setUser(data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async () => {
    try {
      if (confirm("Voulez-vous supprimer définitivement votre compte ?")) {
        const response = await fetch("/api/users/" + user_id, {
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

        if (data.code === 500 || data.code === 429) {
          notify("error", data.error);
        }

        if (data.code === 403) {
          notify("error", data.error);
          dispatch(setLogout());
          navigate("/identification");
        }

        if (data) {
          notify("success", data.message);
          dispatch(setLogout());
          navigate("/");
        }
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

  const handleReloadUser = () => {
    dispatch(setLogout());
    navigate("/identification");
  };

  if (user.error) {
    return;
  }

  return (
    <AdminWrapper title={"Gestion De Mon Profil"}>
      <AdminProfilCard user={user} updateHandleProfil={updateHandleProfil} deleteHandleProfil={deleteHandleProfil} />
      {isOpen && <UpdateUserForm user={user} handleReload={() => handleReloadUser()} />}
    </AdminWrapper>
  );
}

export default ProfilUser;
