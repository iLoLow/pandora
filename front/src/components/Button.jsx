import "../styles/Button.css";

function Button({ disabled = false, color = "red" | "green", type = "button", onClick = () => {}, children }) {
  return (
    <button type={type} className={"globalButton " + color} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
