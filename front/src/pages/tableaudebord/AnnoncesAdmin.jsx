import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../styles/tableaudebord/AnnoncesAdmin.css";
import AddAnnonceForm from "../../components/AddAnnonceForm";
import ModifyAnnonceForm from "../../components/ModifyAnnonceForm";

function AnnoncesAdmin() {
  const user = useSelector((state) => state.user) || {};
  const token = useSelector((state) => state.token) || "";
  const [annonces, setAnnonces] = useState([]);
  const [addAnnonce, setAddAnnonce] = useState(false);
  const [editAnnonceIndex, setEditAnnonceIndex] = useState(-1);
  const [editAnnonce, setEditAnnonce] = useState(false);

  const getAnnonces = async () => {
    try {
      const response = await fetch("/api/annonces/user/" + user.user_id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => {
        console.log(error);
      });

      const data = await response.json();
      setAnnonces(data);
      console.log(data);
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
        console.log(data);
        setAnnonces(annonces.filter((annonce) => annonce.id !== id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReload = () => {
    getAnnonces();
  };

  return (
    <section className="annoncesAdminWrapper">
      {/* header */}
      <div className="annoncesAdminHeader">
        <h2>Gestion des Annonces de {user.username}</h2>
        <button className="addAnnonceBtn" onClick={() => setAddAnnonce(!addAnnonce)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M408 112H184a72 72 0 00-72 72v224a72 72 0 0072 72h224a72 72 0 0072-72V184a72 72 0 00-72-72zm-32.45 200H312v63.55c0 8.61-6.62 16-15.23 16.43A16 16 0 01280 376v-64h-63.55c-8.61 0-16-6.62-16.43-15.23A16 16 0 01216 280h64v-63.55c0-8.61 6.62-16 15.23-16.43A16 16 0 01312 216v64h64a16 16 0 0116 16.77c-.42 8.61-7.84 15.23-16.45 15.23z" />
            <path d="M395.88 80A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z" />
          </svg>
        </button>
      </div>

      {/* add annonce */}
      {addAnnonce && <AddAnnonceForm reloadAnnonces={handleReload} />}

      {annonces.length > 0 &&
        annonces.map((annonce, index) => (
          <div key={annonce.id}>
            <div className="tableauAnnonce">
              <div className="tableauAnnonceItem img">
                <img src={annonce.image_url} alt="preview" className="tableauAnnonceImg" />
              </div>
              <div className="tableauAnnonceItem title ">
                <div className="tableauAnnonceItemHeader">
                  <h3>Titre :</h3>
                </div>
                <p>{annonce.title}</p>
              </div>
              <div className="tableauAnnonceItem desc">
                <div className="tableauAnnonceItemHeader">
                  <h3>Description :</h3>
                </div>
                <p>{annonce.description}</p>
              </div>
              <div className="tableauAnnonceItem btns">
                <div
                  className="tableauAnnonceicone"
                  onClick={() => {
                    setEditAnnonce(!editAnnonce);
                    setEditAnnonceIndex(index);
                  }}
                >
                  <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z" />
                    <path d="M386.34 193.66L264.45 315.79A41.08 41.08 0 01247.58 326l-25.9 8.67a35.92 35.92 0 01-44.33-44.33l8.67-25.9a41.08 41.08 0 0110.19-16.87l122.13-121.91a8 8 0 00-5.65-13.66H104a56 56 0 00-56 56v240a56 56 0 0056 56h240a56 56 0 0056-56V199.31a8 8 0 00-13.66-5.65z" />
                  </svg>
                </div>
                <div className="tableauAnnonceicone" onClick={() => deleteHandleAnnonce(annonce.id)}>
                  <svg className="delete" fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none" />
                    <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" />
                  </svg>
                </div>
              </div>
            </div>
            {editAnnonce && editAnnonceIndex === index && <ModifyAnnonceForm annonce={annonce} reloadAnnonces={handleReload} />}
          </div>
        ))}
    </section>
  );
}

export default AnnoncesAdmin;
