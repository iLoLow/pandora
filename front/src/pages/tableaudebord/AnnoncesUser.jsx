import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../styles/tableaudebord/AnnoncesUser.css";
import AddAnnonceForm from "../../components/AddAnnonceForm";
import ModifyAnnonceForm from "../../components/ModifyAnnonceForm";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";
import useToast from "../../hooks/useToast";
import AdminWrapper from "../../components/AdminWrapper";
import AdminAnnonceCard from "../../components/AdminAnnonceCard";

function AnnoncesUser() {
  const user = useSelector((state) => state.user) || {};
  const token = useSelector((state) => state.token) || "";
  const [annonces, setAnnonces] = useState([]);
  const [addAnnonce, setAddAnnonce] = useState(false);
  const [editAnnonceIndex, setEditAnnonceIndex] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useToast();

  const getAnnonces = async () => {
    try {
      const response = await fetch("/api/annonces/user/" + user.user_id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.code === 500) {
        notify("error", data.error);
      }

      if (data.code === 429) {
        notify("error", data.error);
      }

      if (data.code === 403) {
        notify("error", data.error);
        dispatch(setLogout());
        navigate("/identification");
      }
      setAnnonces(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnnonces();
  }, []);

  const deleteHandleAnnonce = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
      try {
        const response = await fetch("/api/annonces/" + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.code === 500) {
          notify("error", data.error);
        }

        if (data.code === 403) {
          notify("error", data.error);
          dispatch(setLogout());
          navigate("/identification");
        }

        notify("success", data.message);
        setAnnonces(annonces.filter((annonce) => annonce.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AdminWrapper title={"Gestion De Mes Annonces"}>
      <button className="addAnnonceBtn" onClick={() => setAddAnnonce(!addAnnonce)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M408 112H184a72 72 0 00-72 72v224a72 72 0 0072 72h224a72 72 0 0072-72V184a72 72 0 00-72-72zm-32.45 200H312v63.55c0 8.61-6.62 16-15.23 16.43A16 16 0 01280 376v-64h-63.55c-8.61 0-16-6.62-16.43-15.23A16 16 0 01216 280h64v-63.55c0-8.61 6.62-16 15.23-16.43A16 16 0 01312 216v64h64a16 16 0 0116 16.77c-.42 8.61-7.84 15.23-16.45 15.23z" />
          <path d="M395.88 80A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z" />
        </svg>
      </button>

      {/* add annonce */}
      {addAnnonce && <AddAnnonceForm setClose={() => setAddAnnonce(false)} reloadAnnonces={() => getAnnonces()} />}

      {annonces.length > 0 &&
        annonces.map((annonce, index) => (
          <div key={annonce.id}>
            <AdminAnnonceCard annonce={annonce} handleEditAnnonce={() => setEditAnnonceIndex(index)} deleteHandleAnnonce={() => deleteHandleAnnonce(annonce.id)} />
            {editAnnonceIndex === index && <ModifyAnnonceForm annonce={annonce} setClose={() => setEditAnnonceIndex(-1)} reloadAnnonces={() => getAnnonces()} />}
          </div>
        ))}
    </AdminWrapper>
  );
}

export default AnnoncesUser;
