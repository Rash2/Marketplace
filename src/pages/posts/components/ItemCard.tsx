import { Paper, Typography } from "@mui/material";
import { Item } from "../Post";
import classes from "../styles/ItemCard.module.css";

type ItemCardProps = {
  item: Item;
};

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <Paper className={classes.container} elevation={3}>
      <img
        className={classes.image}
        src="https://barbqvillage.com/wp-content/uploads/woocommerce-placeholder.png"
      />
      <Typography fontSize={20} fontWeight={600}>{item.name}</Typography>
      <Typography fontSize={18}>{item.description}</Typography>
      <Typography fontSize={18}>{item.price} lei</Typography>
    </Paper>
  );
};

export default ItemCard;
