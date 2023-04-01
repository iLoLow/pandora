import "../styles/Button.css";

function Button({ color = "red" | "green", type = "button", onClick = () => {}, children }) {
  return (
    <button type={type} className={"globalButton " + color} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
