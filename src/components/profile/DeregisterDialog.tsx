import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "react-query";
import { deregisterClubOneSelf } from "../../utils/fetch/fetchUser";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atoms/userAtom";
import { useParams } from "react-router-dom";

interface DeregisterDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeregisterDialog({
  open,
  setOpen,
}: DeregisterDialogType) {
  const userInfo = useRecoilValue(userInfoState);
  const { clubID } = useParams();

  const { mutate } = useMutation(
    () => deregisterClubOneSelf(userInfo.userId, clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  const handleClose = () => {
    setOpen(false);
  };
  console.log(userInfo);

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
          정말로 동아리를 탈퇴하겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          아니요
        </Button>
        <Button color="success" onClick={handleYesBtnClick} autoFocus>
          네
        </Button>
      </DialogActions>
    </Dialog>
  );
}
