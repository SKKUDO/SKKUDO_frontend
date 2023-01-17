import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { deleteApplier } from "../../utils/fetch/fetchApply";

interface ApplierDelteDialog {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ApplierDeleteDialog({
  open,
  setOpen,
}: ApplierDelteDialog) {
  const { clubID } = useParams();

  const { mutate: applierDeleteMutate } = useMutation(
    () => deleteApplier(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
        window.location.reload();
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleYesBtnClick = () => {
    setOpen(false);
    applierDeleteMutate();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>정말로 지원서를 삭제하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          아니요
        </Button>
        <Button color="success" onClick={handleYesBtnClick}>
          네
        </Button>
      </DialogActions>
    </Dialog>
  );
}
