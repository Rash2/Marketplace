import {
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import ItemCard from "./components/ItemCard";
import classes from "./styles/Post.module.css";

export type Item = {
  name: string;
  price: number;
  description: string;
};

type PostDetails = {
  id: number;
  title: string;
  description: string;
  total: number;
  status: string;
  items: Item[];
};

const Post = () => {
  const [postDetails, setPostDetails] = useState<PostDetails>({
    description: "Cel mai bun ever",
    id: 1,
    status: "ACTIVE",
    title: "CUMPARATI BOMBE",
    total: 200,
    items: [
      {
        description: "Bomba1",
        name: "Bomba1 lol",
        price: 100,
      },
      {
        description: "Bomba2",
        name: "Bomba2 lol",
        price: 100,
      },
      {
        description: "Bomba3",
        name: "Bomba2 lol",
        price: 100,
      },
    ],
  });
  const [makeOfferDialogOpen, setMakeOfferDialogOpen] = useState(false);
  const [offer, setOffer] = useState(0);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const { state } = useLocation();
  const userInfo: any = useContext(UserContext);

  const onChangeOffer = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setOffer(parseInt(e.target.value));
  };

  const onMakeOffer = () => {
    axios
      .post(
        "http://localhost:8080/offers",
        { postId: postDetails.id, offeredPrice: offer },
        {
          auth: {
            ...userInfo.user,
          },
        }
      )
      .then((res) => {
        console.log("offer", res.data);
        setMakeOfferDialogOpen(false);
        setSuccessSnackbarOpen(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftContainer}>
        <Paper className={classes.paperContainer}>
          <div
            className={classes.status}
            style={{
              backgroundColor:
                postDetails.status === "ACTIVE" ? "greenyellow" : "salmon",
              width: postDetails.status === "ACTIVE" ? "68px" : "83px",
            }}
          >
            <Typography fontWeight={600}>{postDetails.status}</Typography>
          </div>
          <Typography variant="h5">{postDetails.title}</Typography>
          <Typography fontSize={30} fontWeight={700}>
            {postDetails.total} lei
          </Typography>
          <Typography variant="h5">
            DESCRIPTION: {postDetails.description}
          </Typography>
        </Paper>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => setMakeOfferDialogOpen(true)}
          style={{marginTop: "8px"}}
        >
          Make an offer
        </Button>
        <div className={classes.cardsContainer}>
          {postDetails.items.map((item, index) => (
            <ItemCard item={item} key={index} />
          ))}
        </div>
      </div>
      <div className={classes.rightContainer}>
        <Paper elevation={3} className={classes.ownerContainer}>
          <div className={classes.ownerContainerTitle}>
            <Typography fontSize={22} fontWeight={600}>
              About the seller
            </Typography>
          </div>
          <div className={classes.ownerContainerDesc}>
            <Typography fontWeight={600} fontSize={20}>
              Username: {state.ownerDetails.username}
            </Typography>
            <Typography fontWeight={600} fontSize={20}>
              Email: {state.ownerDetails.email}
            </Typography>
            <Typography fontWeight={600} fontSize={20}>
              Phone number: {state.ownerDetails.phone}
            </Typography>
          </div>
        </Paper>
      </div>
      <Dialog
        open={makeOfferDialogOpen}
        onClose={() => setMakeOfferDialogOpen(false)}
      >
        <DialogTitle>Make an offer for this post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="offer"
            label="Your offer (lei)"
            type="number"
            value={offer}
            onChange={onChangeOffer}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMakeOfferDialogOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={onMakeOffer} disabled={offer <= 0}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <Alert onClose={() => setSuccessSnackbarOpen(false)} severity="success">
          Offer succesfully made!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Post;
