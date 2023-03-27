import "../styles/Article.css";
import imgbanner from "../assets/banner.png";

function Article() {
  return (
    <>
      <article className="article">
        <h2 className="articleTitre">Article test</h2>
        <img className="articleImg" src={imgbanner} alt="" />
        <p className="articleParagrapghe">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque ea sunt ad. Dolorem fuga, maxime magnam perspiciatis soluta minima ipsa dolore quisquam eum ut velit
          nihil sunt corrupti animi magni! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quam accusantium veritatis ipsum labore sit, voluptatibus ducimus
          placeat, magnam quo asperiores consectetur! Velit cupiditate ullam quis autem harum corporis ad.
        </p>
        <div className="articleFooter">
          <p className="articleDate">Ecris le : 1/01/2023</p>
          <p className="articleAuteur">Rédigé par : Admin</p>
        </div>
      </article>
    </>
  );
}
export default Article;

/*exemple
<section className="article">
<h2 className="articleTitre">{titreArticle}</h2>
<img className="articleImg" src={img} alt="" />
<p className="articleParagrapghe">
  {texteArticle}
  </p>
<div className="articleFooter">
  <p className="articleDate">Ecris le : {date}</p>
  <p className="articleAuteur">Rédigé par : {auteur}</p>
</div>
</section>*/
