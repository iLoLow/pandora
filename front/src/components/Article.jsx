import "../styles/Article.css";
import Avatar from "./Avatar";
import moment from "../utils/moment";

function Article({ annonce }) {

  if (!annonce) {
    return
  }

  return (
    <>
      <article className="article">
        <h2 className="articleTitre">{annonce.title}</h2>
        <img className="articleImg" src={annonce.image_url} alt="annonce" />
        <p className="articleParagraphe">{annonce.description}</p>
        <div className="articleFooter">
          <div className="articleAuteur">
            <Avatar avatarUrl={annonce.avatar_url} />
            <p>{annonce.author}</p>
          </div>
          <div className="articleDate">
            <p>{"Créé le " + moment(annonce.created_at).format("DD/MM/YYYY à HH:mm")}</p>
            <p>{"Mis à jour " + moment(annonce.updated_at).fromNow()}</p>
          </div>
        </div>
      </article>
    </>
  );
}
export default Article;
