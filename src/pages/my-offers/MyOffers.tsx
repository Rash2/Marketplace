import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import classes from "./styles/MyOffers.module.css";
import { Typography, Paper } from "@mui/material";

type Offer = {
  id: number;
  offeredPrice: number;
  status: string;
  postId: number;
  postTitle: string;
  requestedPrice: number;
  ownerUsername: string;
};

const MyOffers = () => {
  const [offers, setOffers] = useState<Offer[] | null>();

  const { user }: any = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/my-offers", { auth: { ...user } })
      .then((res) => setOffers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Your offers</Typography>
      <div className={classes.offersContainer}>
        {!offers || offers.length === 0 ? (
          <Typography>There are no offers available.</Typography>
        ) : (
          offers.map((offer) => (
            <Paper elevation={3} className={classes.offerCard}>
              <Typography fontSize={20} fontWeight={600}>
                {offer.postTitle}
              </Typography>
              <Typography fontSize={18}>
                Offered: {offer.offeredPrice} lei
              </Typography>
              <Typography fontSize={18}>
                Requested: {offer.requestedPrice} lei
              </Typography>
              <Typography fontSize={18}>
                Status: {offer.status}
              </Typography>
              <Typography fontSize={18}>
                Sold by {offer.ownerUsername}
              </Typography>
            </Paper>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOffers;
