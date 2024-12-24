import React, { useState } from "react";
import { SlDislike } from "react-icons/sl";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const BadComment = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SlDislike onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>הוסף תגובה רעה</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This is an example of how you can click an icon to open a dialog.
            You can place any content you want here.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BadComment;
