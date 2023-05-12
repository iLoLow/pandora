import "../../styles/equipe/AdminEquipeCard.css";
import { useSortable } from "@dnd-kit/sortable";

function AdminEquipeCard({ equipe, handleEditEquipe = () => {}, deleteHandleEquipe = () => {} }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transition } = useSortable({ id: equipe.id });
  const style = {
    transition,
  };

  return (
    <div className="tableauEquipe" style={style} ref={setNodeRef} {...attributes}>
      <div className="dragBtn" ref={setActivatorNodeRef} {...listeners}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#0d7f90">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="tableauEquipeItems">
        <div className="tableauEquipeItem img">
          <img src={equipe.avatar_url} alt="preview" className="tableauEquipeImg" />
        </div>
        <div className="tableauEquipeItem">
          <div className="tableauEquipeitemHeader infos">
            <h3>Pseudo RP:</h3>
            <p>{equipe.nom_prenom_rp}</p>
          </div>
          <div className="tableauEquipeitemHeader infos">
            <h3>Pseudo Discord:</h3>
            <p>{equipe.pseudo_discord}</p>
          </div>
          <div className="tableauEquipeitemHeader infos">
            <h3>Fonction:</h3>
            <p>{equipe.fonction}</p>
          </div>
        </div>
        <div className="tableauEquipeItem desc">
          <div className="tableauEquipeItemHeader">
            <h3>Description:</h3>
          </div>
          <p> {equipe.description} </p>
        </div>
      </div>

      <div className="tableauEquipeItem btns">
        <div className="tableauEquipeIcone" onClick={handleEditEquipe}>
          <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z" />
            <path d="M386.34 193.66L264.45 315.79A41.08 41.08 0 01247.58 326l-25.9 8.67a35.92 35.92 0 01-44.33-44.33l8.67-25.9a41.08 41.08 0 0110.19-16.87l122.13-121.91a8 8 0 00-5.65-13.66H104a56 56 0 00-56 56v240a56 56 0 0056 56h240a56 56 0 0056-56V199.31a8 8 0 00-13.66-5.65z" />
          </svg>
        </div>
        <div className="tableauEquipeIcone" onClick={deleteHandleEquipe}>
          <svg className="delete" fill="rgb(179, 3, 3)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none" />
            <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AdminEquipeCard;
