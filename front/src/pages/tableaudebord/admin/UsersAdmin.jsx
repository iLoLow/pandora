import AdminWrapper from "../../../components/Others/AdminWrapper";
import AdminProfilCard from "../../../components/Tableaudebord/AdminProfilCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useToast from "../../../hooks/useToast";
import "../../../styles/tableaudebord/AdminUsers.css";
import UpdateUserForm from "../../../components/Tableaudebord/UpdateUserForm";
import { Navigate } from "react-router-dom";

function UsersAdmin() {
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);
  const notify = useToast();
  const [editUserIndex, setUserIndex] = useState(-1);

  const getUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        headers: { Authorization: "Bearer " + token },
      });
      const datas = await response.json();
      if (datas.code === 500 || datas.code === 403) {
        notify("error", datas.error);
      }
      setUsers(datas);
    } catch (error) {
      console.error(error);
      notify("error", "Erreur interne du serveur.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (user_id) => {
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

        if (data.code === 500) {
          notify("error", data.error);
        }

        if (data.code === 403) {
          notify("error", data.error);
          dispatch(setLogout());
          Navigate("/identification");
        }

        if (data) {
          notify("success", data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReloadUsers = () => {
    getUsers();
    setUserIndex(-1);
  };

  return (
    <AdminWrapper title="Gestion Des Utilisateurs">
      <div className="adminUsersCards">
        {users &&
          users.map((user, index) => (
            <div key={index}>
              <AdminProfilCard user={user} updateHandleProfil={() => setUserIndex(index)} deleteHandleProfil={() => deleteUser(user.user_id)} />
              {editUserIndex === index && <UpdateUserForm user={user} handleReload={() => handleReloadUsers()} isAdministrator={true} />}
            </div>
          ))}
      </div>
    </AdminWrapper>
  );
}

export default UsersAdmin;
