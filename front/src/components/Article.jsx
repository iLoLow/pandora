import "../styles/Article.css";
import Avatar from "./Avatar";
import moment from "../utils/moment";
import LikeButton from "./LikeButton";
import { useSelector } from "react-redux";

function Article({ annonce, reload = () => {} }) {
  const { visitorId } = useSelector((state) => state);

  const verifyCanLiked = (likedUsers, visitor) => {
    if (!likedUsers.includes(visitor)) {
      return true;
    } else {
      return false;
    }
  };

  const verifyCanDisliked = (dislikedUsers, visitor) => {
    if (!dislikedUsers.includes(visitor)) {
      return true;
    } else {
      return false;
    }
  };

  const likeHandler = async () => {
    try {
      const liked = verifyCanLiked(JSON.parse(annonce.liked_users), visitorId);
      if (liked) {
        const response = await fetch(`/api/annonces/like/${annonce.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, isLiked: true, isDisliked: false }),
        });
        const data = await response.json();
        if (data) {
          reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dislikeHandler = async () => {
    try {
      const disliked = verifyCanDisliked(JSON.parse(annonce.disliked_users), visitorId);
      if (disliked) {
        const response = await fetch(`/api/annonces/like/${annonce.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, isLiked: false, isDisliked: true }),
        });
        const data = await response.json();
        if (data) {
          reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const likedUsers = JSON.parse(annonce.liked_users);
  const dislikedUsers = JSON.parse(annonce.disliked_users);
  const isLikedUsers = !!likedUsers.find((user) => user === visitorId);
  const isDislikedUsers = !!dislikedUsers.find((user) => user === visitorId);

  return (
    <>
      <article className="article">
        <h2 className="articleTitre">{annonce.title}</h2>
        <img className="articleImg" src={annonce.image_url} alt="annonce" />
        <p className="articleParagraphe">{annonce.description}</p>
        <div className="articleFooter">
          <div className="articleAuteur">
            <Avatar avatarUrl={annonce.avatar_url} />
            <p>{annonce.username}</p>
          </div>
          <div className="articleLike">
            {/* Liked Button */}
            <LikeButton displayText={JSON.parse(annonce.liked_users).length} handleClick={likeHandler}>
              <svg fill={isLikedUsers ? "#00f700" : "#0d7f90"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M472.06 334l-144.16-6.13c-4.61-.36-23.9-1.21-23.9-25.87 0-23.81 19.16-25.33 24.14-25.88L472.06 270c12.67.13 23.94 14.43 23.94 32s-11.27 31.87-23.94 32zM330.61 202.33L437.35 194C450 194 464 210.68 464 227.88v.33c0 16.32-11.14 29.62-24.88 29.79l-108.45-1.73C304 253 304 236.83 304 229.88c0-22.88 21.8-27.15 26.61-27.55zM421.85 480l-89.37-8.93C308 470.14 304 453.82 304 443.59c0-18.38 13.41-24.6 26.67-24.6l91-3c14.54.23 26.32 14.5 26.32 32s-11.67 31.67-26.14 32.01zm34.36-71.5l-126.4-6.21c-9.39-.63-25.81-3-25.81-26.37 0-12 4.35-25.61 25-27.53l127.19-3.88c13.16.14 23.81 13.49 23.81 31.4s-10.65 32.43-23.79 32.58z" />
                <path
                  d="M133.55 238.06A15.85 15.85 0 01126 240a15.82 15.82 0 007.51-1.92zM174.14 168.78l.13-.23-.13.23c-20.5 35.51-30.36 54.95-33.82 62 3.47-7.07 13.34-26.51 33.82-62z"
                  fill="none"
                />
                <path d="M139.34 232.84l1-2a16.27 16.27 0 01-6.77 7.25 16.35 16.35 0 005.77-5.25z" />
                <path d="M316.06 52.62C306.63 39.32 291 32 272 32a16 16 0 00-14.31 8.84c-3 6.07-15.25 24-28.19 42.91-18 26.33-40.35 59.07-55.23 84.8l-.13.23c-20.48 35.49-30.35 54.93-33.82 62l-1 2a16.35 16.35 0 01-5.79 5.22 15.82 15.82 0 01-7.53 2h-25.31A84.69 84.69 0 0016 324.69v38.61a84.69 84.69 0 0084.69 84.7h48.79a17.55 17.55 0 019.58 2.89C182 465.87 225.34 480 272 480c7.45 0 14.19-.14 20.27-.38a8 8 0 006.2-12.68l-.1-.14C289.8 454.41 288 441 288 432a61.2 61.2 0 015.19-24.77 17.36 17.36 0 000-14.05 63.81 63.81 0 010-50.39 17.32 17.32 0 000-14 62.15 62.15 0 010-49.59 18.13 18.13 0 000-14.68A60.33 60.33 0 01288 239c0-8.2 2-21.3 8-31.19a15.63 15.63 0 001.14-13.64c-.38-1-.76-2.07-1.13-3.17a24.84 24.84 0 01-.86-11.58c3-19.34 9.67-36.29 16.74-54.16 3.08-7.78 6.27-15.82 9.22-24.26 6.14-17.57 4.3-35.2-5.05-48.38z" />
              </svg>
            </LikeButton>
            {/* Disliked Button */}
            <LikeButton displayText={JSON.parse(annonce.disliked_users).length} handleClick={dislikeHandler}>
              <svg fill={isDislikedUsers ? "#ff0676" : "#0d7f90"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M39.94 178l144.16 6.12c4.61.36 23.9 1.22 23.9 25.88 0 23.8-19.16 25.33-24.14 25.88L39.94 242C27.27 241.87 16 227.56 16 210s11.27-31.87 23.94-32zm141.45 131.66L74.65 318C62 318 48 301.31 48 284.12v-.33c0-16.33 11.14-29.63 24.88-29.79l108.45 1.72C208 259 208 275.16 208 282.12c0 22.88-21.8 27.14-26.61 27.54zM90.15 32l89.37 8.93C204 41.86 208 58.18 208 68.4c0 18.39-13.41 24.6-26.67 24.6l-91 3C75.78 95.78 64 81.51 64 64s11.68-31.66 26.15-32zm-34.36 71.5l126.4 6.22c9.39.63 25.81 3 25.81 26.36 0 12-4.35 25.62-25 27.53L55.79 167.5C42.65 167.35 32 154 32 136.08s10.65-32.43 23.79-32.58z" />
                <path
                  d="M378.45 273.93A15.84 15.84 0 01386 272a15.93 15.93 0 00-7.51 1.91zM337.86 343.22l-.13.22a2.53 2.53 0 01.13-.22c20.5-35.51 30.36-55 33.82-62-3.47 7.06-13.34 26.51-33.82 62z"
                  fill="none"
                />
                <path d="M372.66 279.16l-1 2a16.29 16.29 0 016.77-7.26 16.48 16.48 0 00-5.77 5.26z" />
                <path d="M195.94 459.38C205.37 472.67 221 480 240 480a16 16 0 0014.31-8.85c3-6.06 15.25-24 28.19-42.9 18-26.33 40.35-59.08 55.23-84.81l.13-.22c20.48-35.49 30.35-54.94 33.82-62l1-2a16.48 16.48 0 015.79-5.23A15.93 15.93 0 01386 272h25.32A84.7 84.7 0 00496 187.3v-38.6A84.7 84.7 0 00411.31 64h-48.79a17.46 17.46 0 01-9.58-2.89C330 46.13 286.66 32 240 32c-7.45 0-14.19.14-20.27.38a8 8 0 00-6.2 12.68l.1.14C222.2 57.59 224 71 224 80a61.16 61.16 0 01-5.19 24.77 17.38 17.38 0 000 14.06 63.81 63.81 0 010 50.39 17.32 17.32 0 000 14 62.13 62.13 0 010 49.58 18.13 18.13 0 000 14.68A60.41 60.41 0 01224 273c0 8.2-2 21.3-8 31.18a15.66 15.66 0 00-1.14 13.65c.38 1 .76 2.06 1.13 3.17a24.8 24.8 0 01.86 11.57c-3 19.35-9.67 36.3-16.74 54.16-3.08 7.78-6.27 15.82-9.22 24.27-6.14 17.56-4.3 35.2 5.05 48.38z" />
              </svg>
            </LikeButton>
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
