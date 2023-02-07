import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilValue } from "recoil";
import { applierState } from "../../atoms/utilAtom";
import { useMutation } from "react-query";
import { updateAppliedUser } from "../../utils/fetch/fetchApply";
import { AppliedUserType, UpdateAppliedUserType } from "../../types/apply";
import { useParams } from "react-router-dom";

interface ScoreDialogType {
  scoreDialogOpen: boolean;
  setScoreDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  appliedUser: AppliedUserType | undefined;
}

export default function ScoreDialog({
  scoreDialogOpen,
  setScoreDialogOpen,

  appliedUser,
}: ScoreDialogType) {
  const { clubID } = useParams();
  const applier = useRecoilValue(applierState);
  const [documentScores, setDocumentScores] = React.useState(
    new Map<number, string>()
  );
  const [interviewScores, setInterviewScores] = React.useState(
    new Map<number, string>()
  );
  // console.log(applier);
  const handleClose = () => {
    setScoreDialogOpen(false);
  };

  const handleDocumentScoreChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setDocumentScores(new Map(documentScores.set(index, event.target.value)));
  };

  const handleInterviewScoreChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setInterviewScores(new Map(interviewScores.set(index, event.target.value)));
  };

  React.useEffect(() => {
    if (appliedUser) {
      appliedUser.documentScores.map((a, index) =>
        setDocumentScores(new Map(documentScores.set(index, a.toString())))
      );
      appliedUser.interviewScores.map((a, index) =>
        setInterviewScores(new Map(interviewScores.set(index, a.toString())))
      );
    }
  }, [appliedUser]);

  // console.log(applier);
  const { mutate } = useMutation(
    (newInfo: UpdateAppliedUserType) =>
      updateAppliedUser(appliedUser?._id || "", newInfo),
    {
      onSuccess: (data) => console.log(data),
      onError: (error) => console.log(error),
    }
  );

  const handleUpdateBtnClick = () => {
    if (applier) {
      const numDocScores = Array.from(documentScores.values()).map(Number);
      const numInterScores = Array.from(interviewScores.values()).map(Number);

      mutate({
        documentScores: numDocScores,
        interviewScores: numInterScores,
        clubId: clubID || "",
      });
    }
    alert("점수가 반영되었습니다!");
    setScoreDialogOpen(false);
  };

  return (
    <Dialog open={scoreDialogOpen} onClose={handleClose}>
      <DialogTitle sx={{ width: "500px" }}>점수 입력</DialogTitle>
      <DialogContent>
        {Array.from(documentScores.entries()).map(([key, val]) => (
          <TextField
            key={key}
            autoFocus
            margin="dense"
            id="name"
            label={`${key + 1}번 서류 점수`}
            type="number"
            fullWidth
            variant="standard"
            value={val}
            onChange={(event) => handleDocumentScoreChange(event, key)}
          />
        ))}
        {Array.from(interviewScores.entries()).map(([key, val]) => (
          <TextField
            key={key}
            autoFocus
            margin="dense"
            id="name"
            label={`${key + 1}번 면접 점수`}
            type="number"
            fullWidth
            variant="standard"
            value={val}
            onChange={(event) => handleInterviewScoreChange(event, key)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleUpdateBtnClick}>입력</Button>
      </DialogActions>
    </Dialog>
  );
}
