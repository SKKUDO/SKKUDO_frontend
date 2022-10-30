import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isAuthConfirmAlertOpenState } from "../../atoms/alertAtom";

interface AuthConfirmAlertType {
  selectedLabel: string;
  selectedKey: string;
  selectedValue: string;
}
//전달받은 레이블과 키로 validadtion update
export default function AuthConfirmAlert({
  selectedLabel,
  selectedKey,
  selectedValue,
}: AuthConfirmAlertType) {
  const [open, setOpen] = useRecoilState(isAuthConfirmAlertOpenState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{selectedLabel}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {selectedLabel}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
