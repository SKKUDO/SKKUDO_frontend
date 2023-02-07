import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useMutation, useQueryClient } from "react-query";
import { deleteNotice } from "../../utils/fetch/fetchNotice";

interface DeleteNoticeDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  clubId: string;
}

export default function DeleteNoticeDialog({
  open,
  setOpen,
  _id,
  clubId,
}: DeleteNoticeDialogType) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteNotice({ clubId, _id }), {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("getAllNotices");
    },
    onError: (error) => console.log(error),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleYesBtnClick = () => {
    mutate();
    window.location.reload();
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
          해당 공지를 삭제하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>아니요</Button>
        <Button onClick={handleYesBtnClick} autoFocus>
          네
        </Button>
      </DialogActions>
    </Dialog>
  );
}
