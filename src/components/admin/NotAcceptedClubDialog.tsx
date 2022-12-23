import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "react-query";
import { NotAcceptedClubType } from "../../types/club";
import { accpetClub, deleteClub } from "../../utils/fetch/fetchClub";

interface NotAcceptedClubDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickedClub: NotAcceptedClubType | undefined;
}

export default function NotAcceptedClubDialog({
  open,
  setOpen,
  clickedClub,
}: NotAcceptedClubDialogType) {
  const queryClient = useQueryClient();

  const { mutate: acceptMutate } = useMutation(
    () => accpetClub(clickedClub!._id),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getNotAcceptedClubs");
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: deleteMutate } = useMutation(
    () => deleteClub(clickedClub!._id),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getNotAcceptedClubs");
      },
      onError: (error) => console.log(error),
    }
  );

  const onAcceptBtnClicked = () => {
    if (clickedClub) {
      acceptMutate();
      setOpen(false);
    }
  };

  const onDeleteBtnClicked = () => {
    if (clickedClub) {
      deleteMutate();
      setOpen(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">동아리 신청 내용</DialogTitle>
      {clickedClub ? (
        <>
          <DialogContent sx={{ width: "512px" }}>
            <DialogContentText id="alert-dialog-description">
              {`동아리 이름 : ${clickedClub.name}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`위치 : ${clickedClub.location}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`모집 방식 : ${clickedClub.recruitType}`}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              {`동아리 주제 : ${clickedClub.type.name}`}
            </DialogContentText>
          </DialogContent>
        </>
      ) : (
        <DialogContent sx={{ width: "512px" }}>
          <DialogContentText id="alert-dialog-description">
            오류가 생겼습니다.
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onAcceptBtnClicked} autoFocus>
          승인
        </Button>
        <Button color="error" onClick={onDeleteBtnClicked}>
          거절
        </Button>
      </DialogActions>
    </Dialog>
  );
}
