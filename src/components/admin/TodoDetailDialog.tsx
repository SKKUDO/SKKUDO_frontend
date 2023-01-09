import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToDoType } from "../../types/todo";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { Tag } from "../../pages/NoticePage";
import moment from "moment";
import { useMutation } from "react-query";
import { deleteTodo } from "../../utils/fetch/fetchTodo";

interface TodoDetailDialogType {
  todoInfo: ToDoType | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TodoDetailDialog({
  todoInfo,
  open,
  setOpen,
}: TodoDetailDialogType) {
  const { mutate } = useMutation(
    () =>
      deleteTodo({ clubId: todoInfo?.clubId || "", _id: todoInfo?._id || "" }),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteBtnClick = () => {
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
      <DialogTitle id="alert-dialog-title">{"일정 상세 정보"}</DialogTitle>
      <DialogContent sx={{ width: "512px" }}>
        {todoInfo && (
          <List>
            <ListItem>
              <ListItemButton sx={{ padding: "20px" }}>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "24px", fontWeight: 700 }}
                  primary={todoInfo.title}
                />
                <Stack
                  sx={{
                    justifyContent: "flex-end",
                    height: "30px",
                    marginRight: "40px",
                  }}
                  spacing={2}
                  direction={"row"}
                >
                  {todoInfo.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Stack>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "20px" }}
                  primary={todoInfo.content}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "20px" }}
                  primary={`시작 시간 : ${moment(todoInfo.startTime).format(
                    "YYYY-MM-DD HH:mm"
                  )}`}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "20px" }}
                  primary={`종료 시간 : ${moment(todoInfo.endTime).format(
                    "YYYY-MM-DD HH:mm"
                  )}`}
                />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "20px" }}
                  primary={`침여 인원 : ${todoInfo.attendingUsers.join(" ")}`}
                />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteBtnClick} color="error" autoFocus>
          삭제하기
        </Button>
        <Button onClick={handleClose} autoFocus>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
