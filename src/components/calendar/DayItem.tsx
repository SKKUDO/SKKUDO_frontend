import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  isTodoUpdateState,
  updateTodoInfoState,
} from "../../atoms/calendarAtom";
import { DeleteTodoType, ToDoType, UpdateTodoType } from "../../types/todo";
import { deleteTodo } from "../../utils/fetch/fetchTodo";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import moment from "moment";
import { Tag } from "../../pages/NoticePage";

const ItemContainer = styled.div`
  padding-left: 40px;
  padding-right: 40px;

  @media screen and (max-width: 490px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const DetailBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 10px;
  @media screen and (max-width: 490px) {
    gap: 20px;
  }
`;

interface DayItemType {
  todo: ToDoType;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DayItem({ todo, setDialogOpen }: DayItemType) {
  const { clubID } = useParams();
  const [open, setOpen] = useState(false);
  const setIsTodoUpdate = useSetRecoilState(isTodoUpdateState);
  const setUpdateTodo = useSetRecoilState(updateTodoInfoState);
  const queryClient = useQueryClient();
  const { mutate: deleteTodoMutate } = useMutation(
    (todoInfo: DeleteTodoType) => deleteTodo(todoInfo),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getTodosByClubID");
        window.location.reload();
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );
  const handleTodoDeleteBtnClick = (todoID: string) => {
    if (clubID) {
      deleteTodoMutate({ clubId: clubID, _id: todoID });
    }
  };
  const handleTodoUpdateBtnClick = (tagInfo: UpdateTodoType) => {
    setIsTodoUpdate(true);
    setUpdateTodo(tagInfo);
    setDialogOpen(true);
  };

  const handleClick = (id: string) => {
    setOpen(!open);
  };
  return (
    <ItemContainer>
      <ListItemButton
        onClick={() => handleClick(todo._id)}
        sx={{
          padding: "2%",
          display: { xs: "flex" },
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <ListItemText
          disableTypography
          sx={{
            fontSize: { sm: "2vw", xs: "18px" },
            fontWeight: 700,
            color: "#000069",
          }}
          primary={todo.title}
        />
        <Stack
          sx={{
            justifyContent: "flex-end",
            height: "15%",
            marginRight: { sm: "1%", xs: 0 },
          }}
          spacing={2}
          direction={"row"}
        >
          {todo.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Stack>
        {open ? <MdExpandLess /> : <MdExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: { sm: 4 }, paddingY: { sm: "8px", xs: "0px" } }}
          >
            <ListItemText
              disableTypography
              sx={{
                fontSize: { sm: "2vw", xs: "18px" },
                color: "#000069",
              }}
              primary={todo.content}
            />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: { sm: 4 }, paddingY: { sm: "8px", xs: "0px" } }}
          >
            <ListItemText
              disableTypography
              sx={{ fontSize: { sm: "2vw", xs: "18px" }, color: "#000069" }}
              primary={`시작 시간 : ${moment(todo.startTime).format(
                "YYYY-MM-DD HH:mm"
              )}`}
            />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: { sm: 4 }, paddingY: { sm: "8px", xs: "0px" } }}
          >
            <ListItemText
              disableTypography
              sx={{ fontSize: { sm: "2vw", xs: "18px" }, color: "#000069" }}
              primary={`종료 시간 : ${moment(todo.endTime).format(
                "YYYY-MM-DD HH:mm"
              )}`}
            />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: { sm: 4 }, paddingY: { sm: "8px", xs: "0px" } }}
          >
            <ListItemText
              disableTypography
              sx={{ fontSize: { sm: "2vw", xs: "18px" }, color: "#000069" }}
              primary={`침여 인원 : ${todo.attendingUsers.join(" ")}`}
            />
          </ListItemButton>
          <DetailBtnContainer>
            <Button
              onClick={() => handleTodoDeleteBtnClick(todo._id)}
              sx={{
                width: { sm: "30%", xs: "45%" },
                fontSize: "2vw",
                paddingTop: 0,
                paddingBottom: 0,
              }}
              variant="outlined"
              color="error"
            >
              삭제
            </Button>
            <Button
              onClick={() =>
                handleTodoUpdateBtnClick({
                  _id: todo._id,
                  clubId: todo.clubId,
                  title: todo.title,
                  private: todo.private,
                  content: todo.content,
                  date: moment(todo.date).format("YYYY-MM-DD"),
                  startTime: moment(todo.startTime).format("YYYY-MM-DD HH:mm"),
                  endTime: moment(todo.endTime).format("YYYY-MM-DD HH:mm"),
                  attendingUsers: todo.attendingUsers,
                  tags: todo.tags,
                })
              }
              sx={{
                width: { sm: "30%", xs: "45%" },
                fontSize: "2vw",
                paddingTop: 0,
                paddingBottom: 0,
              }}
              variant="outlined"
              color="success"
            >
              수정
            </Button>
          </DetailBtnContainer>
        </List>
      </Collapse>
    </ItemContainer>
  );
}
