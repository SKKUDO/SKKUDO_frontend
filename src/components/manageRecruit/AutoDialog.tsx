import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { AppliedUserType } from "../../types/apply";
import { List, ListItem, ListItemButton } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { deleteAppliedUser } from "../../utils/fetch/fetchApply";
import { RegisterInfoType } from "../../types/user";
import { registerClub } from "../../utils/fetch/fetchUser";

const PortionContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

const ResultContainer = styled.div`
  width: 100%;
`;

const Label = styled.div``;

interface AutoDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  appliedUsers: AppliedUserType[] | undefined;
}

interface RegisterMutateType {
  userID: string;
  registerInfo: RegisterInfoType;
  id: string;
}

export default function AutoDialog({
  open,
  setOpen,
  appliedUsers,
}: AutoDialogType) {
  const { clubID } = useParams();
  const handleClose = () => {
    setOpen(false);
  };

  const [documentPortion, setDocumentPortion] = React.useState(50);
  const [passNumbers, setPassNumbers] = React.useState(1);
  const [result, setResult] = React.useState<AppliedUserType[]>();
  const queryClient = useQueryClient();
  const { mutate: deleteMutate } = useMutation(
    (applyId: string) => deleteAppliedUser(applyId, clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
        // console.log(variables);
        queryClient.invalidateQueries("getAppliedUserByClubID");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );
  const { mutate: registerMutate } = useMutation(
    ({ userID, registerInfo, id }: RegisterMutateType) =>
      registerClub(userID, clubID || "", registerInfo),
    {
      onSuccess: (data, variables) => {
        // console.log(data);
        // console.log(variables);
        console.log("delete");
        deleteMutate(variables.id);
      },

      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const handlePortionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDocumentPortion(Number(event.target.value));
  };
  const handlePassNumbersChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassNumbers(Number(event.target.value));
  };

  const handleCalculateBtnClick = () => {
    // console.log(appliedUsers);
    if (appliedUsers) {
      const sortedUsers = [...appliedUsers];
      sortedUsers.sort((m, n) => {
        const mScore =
          (m.documentScores.reduce((a, b) => a + b, 0) * documentPortion) /
            100 +
          (m.interviewScores.reduce((a, b) => a + b, 0) *
            (100 - documentPortion)) /
            100;
        const nScore =
          (n.documentScores.reduce((a, b) => a + b, 0) * documentPortion) /
            100 +
          (n.interviewScores.reduce((a, b) => a + b, 0) *
            (100 - documentPortion)) /
            100;

        if (mScore < nScore) {
          return 1;
        } else if (mScore > nScore) {
          return -1;
        }
        return 0;
      });
      // console.log(sortedUsers.slice(0, passNumbers));
      setResult(sortedUsers.slice(0, passNumbers));
    }
  };
  const handleDecideBtnClick = async () => {
    if (result) {
      await result.forEach((user) => {
        registerMutate({
          userID: user.userID,
          registerInfo: {
            moreColumns: user.moreColumns,
            initialRole: "부원",
          },
          id: user._id,
        });
      });
      // window.location.reload();
      // window.location.reload();
      alert("모두 합격시켰습니다!");
      // queryClient.invalidateQueries("getAppliedUserByClubID");
      // window.location.reload();
    } else {
      alert("합격시킬 지원자가 없습니다!");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ color: "#000069" }}>자동 합격 산출창</DialogTitle>
      <DialogContent>
        <DialogContentText>
          먼저 서류점수와 면접점수의 반영비율을 설정해주세요. 그 다음 합격시킬
          인원수를 설정하면 점수에 따라 자동으로 모집자들을 인원수에 맞게
          합격시킬 수 있습니다.
        </DialogContentText>
        <PortionContainer>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="서류 점수 반영 비율(%)"
            type="number"
            fullWidth
            variant="outlined"
            onChange={handlePortionChange}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="면접 점수 반영 비율(%)"
            type="number"
            fullWidth
            variant="outlined"
            value={100 - documentPortion}
            required
          />
        </PortionContainer>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="합격 인원 수"
          type="number"
          fullWidth
          variant="outlined"
          onChange={handlePassNumbersChange}
          required
        />
        <DialogActions>
          <Button onClick={handleCalculateBtnClick} color="success">
            계산
          </Button>
        </DialogActions>
        <ResultContainer>
          <List>
            <Label>아래 지원자들을 합격 시키켔습니까?</Label>
            {result ? (
              result.map((ele, idx) => (
                <ListItem key={ele._id}>
                  <ListItemButton>{`${idx + 1}   :   ${
                    ele.name
                  }`}</ListItemButton>
                </ListItem>
              ))
            ) : (
              <div></div>
            )}
          </List>
        </ResultContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          취소
        </Button>
        <Button onClick={handleDecideBtnClick} color="success">
          결정
        </Button>
      </DialogActions>
    </Dialog>
  );
}
