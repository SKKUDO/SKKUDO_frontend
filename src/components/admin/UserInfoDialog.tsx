import { Button, Card } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UserType } from "../../types/user";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useState } from "react";
import styled from "styled-components";
import AdminDeregisterDialog from "./AdminDeregisterDialog";
import { useMutation } from "react-query";
import { deleteUser } from "../../utils/fetch/fetchUser";

const CollapseItem = styled.div`
  height: 33px;
  box-sizing: border-box;
  padding-left: 16px;
  display: flex;
`;
interface UserInfoDialogType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickedUser: UserType | undefined;
}

export default function UserInfoDialog({
  open,
  setOpen,
  clickedUser,
}: UserInfoDialogType) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [deregisterDialogOpen, setDeregisterDialogOpen] = useState(false);

  const { mutate } = useMutation(() => deleteUser(clickedUser?._id || ""), {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const handleUserDeleteBtnClick = () => {
    mutate();
    window.location.reload();
  };

  const handleClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleDeregisterBtnClick = () => {
    setDeregisterDialogOpen(true);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">유저 세부 정보</DialogTitle>
      {clickedUser ? (
        <Card
          sx={{
            margin: "0 auto",

            width: "100%",
            maxWidth: "1024px",
          }}
        >
          <DialogContent sx={{ width: "512px" }}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton>
                <ListItemText primary={`유저 이름 : ${clickedUser.name}`} />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary={`학과 : ${clickedUser.major}`} />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary={`연락처 : ${clickedUser.contact}`} />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary={`아이디 : ${clickedUser.userID}`} />
              </ListItemButton>
              <ListItemButton onClick={handleClick}>
                <ListItemText primary="가입된 동아리" />
                {collapseOpen ? <MdExpandLess /> : <MdExpandMore />}
              </ListItemButton>
              <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {Object.values(clickedUser.registeredClubs).map((club) => (
                    <CollapseItem key={club._id}>
                      <ListItemText
                        primary={`${club.clubName} : ${club.role}`}
                      />
                      <Button color="error" onClick={handleDeregisterBtnClick}>
                        탈퇴
                      </Button>
                      <AdminDeregisterDialog
                        open={deregisterDialogOpen}
                        setOpen={setDeregisterDialogOpen}
                        userId={clickedUser.userID}
                        clubID={club.clubId}
                      />
                    </CollapseItem>
                  ))}
                </List>
              </Collapse>
            </List>
            <Button color="error" onClick={handleUserDeleteBtnClick}>
              유저 삭제
            </Button>
          </DialogContent>
        </Card>
      ) : (
        <DialogContent sx={{ width: "512px" }}>
          <DialogContentText id="alert-dialog-description">
            오류가 생겼습니다.
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
}
