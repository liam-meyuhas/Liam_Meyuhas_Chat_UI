import React, { useState } from "react";
import { SlDislike } from "react-icons/sl";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const BadComment = ({ fname }) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => setComment(event.target.value);

  const handleClose = () => {
    setOpen(false);
    setComment("");
  };

  const handleSubmit = () => {
    const sendToServer = async () => {
      try {
        const response = await fetch("http://localhost:5000/BadComment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: comment,
          }),
        });
        const data = await response.json();
        console.log("QnA sent successfully:", data);
      } catch (error) {
        console.error("Error sending QnA:", error);
      }
    };

    if (comment) {
      sendToServer();
    }
    handleClose();
  };

  return (
    <>
      <SlDislike onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>הוסף תגובה רעה</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>שם:</strong> {fname}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>תאריך:</strong> {new Date().toLocaleString()}
          </Typography>

          <Typography variant="body1" gutterBottom align="right">
            <strong>תגובה:</strong>
          </Typography>

          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={5}
            value={comment}
            onChange={handleCommentChange}
            sx={{
              width: "300px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleClose} color="primary">
              ביטול
            </Button>
            <Button onClick={handleSubmit} color="primary">
              שלח
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BadComment;
