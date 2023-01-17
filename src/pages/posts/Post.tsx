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
import { useContext, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { UserContext } from "../../App";
import ItemCard from "./components/ItemCard";
import classes from "./styles/Post.module.css";

export type Item = {
  name: string;
  price: number;
  description: string;
};

type OwnerInfo = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

type PostDetails = {
  id: number;
  title: string;
  description: string;
  total: number;
  status: string;
  items: Item[];
  owner: OwnerInfo;
};

const Post = () => {
  const [postDetails, setPostDetails] = useState<PostDetails | null>();
  const [makeOfferDialogOpen, setMakeOfferDialogOpen] = useState(false);
  const [offer, setOffer] = useState(0);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const userInfo: any = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/posts/${id}`, {
        auth: {
          ...userInfo.user,
        },
      })
      .then((res) => setPostDetails(res.data))
      .catch((err) => console.error(err));
  }, []);

  const onChangeOffer = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setOffer(parseInt(e.target.value));
  };

  const onMakeOffer = () => {
    if (postDetails) {
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
          setMakeOfferDialogOpen(false);
          setSuccessSnackbarOpen(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={classes.container}>
      {postDetails ? (
        <div className={classes.leftContainer}>
          <Paper className={classes.paperContainer}>
            <div
              className={classes.status}
              style={{
                backgroundColor:
                  postDetails.status === "AVAILABLE" ? "greenyellow" : "salmon",
                width: postDetails.status === "AVAILABLE" ? "100px" : "120px",
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
            style={{ marginTop: "8px" }}
          >
            Make an offer
          </Button>
          <div className={classes.cardsContainer}>
            {postDetails.items.map((item, index) => (
              <ItemCard item={item} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <Typography variant="h4">No details available</Typography>
      )}
      <div className={classes.rightContainer}>
        <Paper elevation={3} className={classes.ownerContainer}>
          <div className={classes.ownerContainerTitle}>
            <Typography fontSize={22} fontWeight={600}>
              About the seller
            </Typography>
          </div>
          <div className={classes.ownerContainerDesc}>
          <Typography fontWeight={600} fontSize={20}>
              Name: {`${postDetails?.owner.firstName} ${postDetails?.owner.lastName}`}
            </Typography>
            <Typography fontWeight={600} fontSize={20}>
              Username: {postDetails?.owner.username}
            </Typography>
            <Typography fontWeight={600} fontSize={20}>
              Email: {postDetails?.owner.email}
            </Typography>
            <Typography fontWeight={600} fontSize={20}>
              Phone number: {postDetails?.owner.phone}
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
