import "../styles/LikeButton.css";

function LikeButton({ displayText = 0, handleClick = () => {}, children }) {
  return (
    <button className="btnLike" onClick={handleClick}>
      {children}
      <span>{displayText}</span>
    </button>
  );
}

export default LikeButton;
