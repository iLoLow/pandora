function BoutiqueItem(props) {
  const { item } = props;
  return (
    <div className="boutique-item">
      <img src={item.image} alt={item.name_article} />
      <div className="boutique-item-info">
        <h3>{item.name_article}</h3>
        <p>{item.type_de_vehicule}</p>
        <p>{item.description}</p>
        <p>{item.price} €</p>
      </div>
    </div>
  );
}

export default BoutiqueItem;
