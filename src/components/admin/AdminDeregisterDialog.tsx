import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "react-query";
import {
  deregisterClubByAdmin,
  deregisterClubOneSelf,
} from "../../utils/fetch/fetchUser";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atoms/userAtom";
import { useParams } from "react-router-dom";

interface DeregisterDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  clubID: string;
}

export default function AdminDeregisterDialog({
  open,
  setOpen,
  userId,
  clubID,
}: DeregisterDialogType) {
  console.log(clubID);
  console.log(userId);
  const { mutate } = useMutation(() => deregisterClubByAdmin(userId, clubID), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => console.log(error),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleYesBtnClick = () => {
    mutate();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          정말로 유저를 동아리에서 탈퇴시키겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>아니요</Button>
        <Button color="error" onClick={handleYesBtnClick} autoFocus>
          네
        </Button>
      </DialogActions>
    </Dialog>
  );
}
