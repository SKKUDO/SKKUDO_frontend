import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { updateUserColumn } from "../../utils/fetch/fetchUser";

interface ColumnDialogType {
  keyword: string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ColumnDialog({
  keyword,
  dialogOpen,
  setDialogOpen,
}: ColumnDialogType) {
  const { clubID } = useParams();
  const handleClose = () => {
    setDialogOpen(false);
  };
  const [newValue, setNewValue] = useState("");

  const { mutate } = useMutation(
    () => updateUserColumn(clubID || "", { key: keyword, value: newValue }),
    {
      onSuccess: (data) => {
        window.location.reload();
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };

  const handleUpdateSubmit = () => {
    mutate();
    handleClose();
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle sx={{ color: "#000069" }}>{`${keyword} 수정`}</DialogTitle>
      <>
        <DialogContent style={{ width: "512px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="새로운 설정"
            fullWidth
            variant="standard"
            value={newValue}
            sx={{ marginTop: "20px" }}
            onChange={handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            취소
          </Button>
          <Button color="success" onClick={handleUpdateSubmit}>
            수정
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
}

export default ColumnDialog;
