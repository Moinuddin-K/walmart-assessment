import Typography from '@mui/material/Typography';

const ItemCard = ({ item }) => {
    return (
      <li className="ItemCard">
        <img src={item.image} alt={item.name} />
        <Typography variant="h6" sx={{ margin: 1  }}>
            {item.name}
        </Typography>
        <Typography variant="p" sx={{ margin: 2, fontWeight: 100}}>
            {item.description}
        </Typography>
        <Typography variant="p" sx={{ margin: 1 , fontWeight: 500 }}>
            Price: ${item.price}
        </Typography>
      </li>
    );
  };
  
  export default ItemCard;