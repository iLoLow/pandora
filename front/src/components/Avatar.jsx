import "../styles/Avatar.css";

function Avatar({ avatarUrl }) {
  return (
    <div className="profil-img">
      <img src={avatarUrl} alt="Avatar" />
    </div>
  );
}

export default Avatar;
