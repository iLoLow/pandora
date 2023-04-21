import { useEffect, useState } from "react";
import "../styles/Panier.css";
import Button from "./Button";

function Panier({ cart, setCart = () => {} }) {
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  //calculer le total
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += Number(item.price);
    });
    setTotal(total);
  }, [cart]);

  //vider le panier
  const handleClearPanier = () => {
    localStorage.removeItem("panier");
    setCart([]);
  };
  //supprimer un item du panier
  const handleDeleteItem = (id) => {
    const newPanier = cart.filter((item) => item.id !== id);
    localStorage.setItem("panier", JSON.stringify(newPanier));
    setCart(newPanier);
  };

  return (
    <div className={isOpen ? "panierContainer open" : "panierContainer"}>
      <div className="panierIconeNumero" onClick={() => setIsOpen(!isOpen)}>
        <svg fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <circle cx="176" cy="416" r="32" />
          <circle cx="400" cy="416" r="32" />
          <path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z" />
        </svg>
        <span className="panierNumero">{cart.length}</span>
      </div>
      {isOpen && (
        <div className={isOpen ? "panierWrapper panierOpen" : "panierWrapper"}>
          <div className="panierItems">
            {cart && (
              <table>
                <caption>Réservation</caption>
                <thead>
                  <tr>
                    <th>Véhicule</th>
                    <th>Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, key) => (
                    <tr key={key}>
                      <td>{item.name_article}</td>
                      <td>{item.price}€</td>
                      <td>
                        <div className="panierIcone" onClick={() => handleDeleteItem(item.id)}>
                          <svg className="delete" fill="#0d7f90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z" fill="none" />
                            <path d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <strong>Total :</strong>
                    </td>
                    <td colSpan={2} style={{ textAlign: "center" }}>
                      {total} €
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <Button color="red" children="Vider le panier" onClick={() => handleClearPanier()} />
          <form className="panierForm" action="post">
            <label htmlFor="pseudo">Votre Pseudo Discord :</label>
            <input type="text" name="pseudo" id="pseudo" />
          </form>
          <Button color="green" children="Valider" onClick={() => {}} />
        </div>
      )}
    </div>
  );
}

export default Panier;
