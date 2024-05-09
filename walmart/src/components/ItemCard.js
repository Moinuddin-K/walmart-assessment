const ItemCard = ({ item }) => {
    return (
      <li className="ItemCard">
        <img src={item.image} alt={item.name} />
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p>Price: ${item.price}</p>
      </li>
    );
  };
  
  export default ItemCard;
  