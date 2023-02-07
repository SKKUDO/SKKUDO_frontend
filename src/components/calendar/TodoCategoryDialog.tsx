import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTodoTag,
  deleteTodoTag,
  getTodoTagsByClubID,
} from "../../utils/fetch/fetchTodo";
import { useParams } from "react-router-dom";
import {
  CategoryDeleteBtn,
  CategoryLabel,
  CategoryList,
  CategoryListItem,
} from "../notice/CategoryAddDialog";

import { DeleteTodoType, ToDoTagType } from "../../types/todo";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function TodoCategoryDialog(props: SimpleDialogProps) {
  const { clubID } = useParams();
  const [newCategory, setNewCategory] = React.useState("");
  const queryClient = useQueryClient();
  const { onClose, open } = props;

  const { data, isLoading } = useQuery<ToDoTagType[]>(
    "getTodoTagsByClubID",
    () => getTodoTagsByClubID(clubID || "")
  );

  const { mutate: createTodoTagMutate } = useMutation(
    () => createTodoTag({ clubId: clubID || "", name: newCategory }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getTodoTagsByClubID");
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const { mutate: deleteTodoTagMutate } = useMutation(
    (tagInfo: DeleteTodoType) => deleteTodoTag(tagInfo),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getTodoTagsByClubID");
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );
  const handleClose = () => {
    onClose();
  };
  const handleCategoryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setNewCategory(event.target.value);
  };
  const handleNewCategorySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewCategory("");
    createTodoTagMutate();
  };

  const handleCategoryDeleteBtnClick = (tagID: string) => {
    if (clubID) {
      deleteTodoTagMutate({ _id: tagID, clubId: clubID });
    }
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>일정 카테고리 추가하기</DialogTitle>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "50px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleNewCategorySubmit}
      >
        <TextField
          id="outlined-basic"
          label="새 카테고리"
          variant="outlined"
          onChange={handleCategoryInputChange}
          value={newCategory}
        />
        <Button
          variant="contained"
          color="success"
          sx={{ color: "white", marginTop: "20px" }}
          type="submit"
        >
          추가
        </Button>
      </Box>
      <CategoryList>
        {isLoading ? (
          <div>no category</div>
        ) : (
          data?.map((category) => (
            <CategoryListItem key={category._id}>
              <CategoryLabel>{category.name}</CategoryLabel>
              <CategoryDeleteBtn
                variant="outlined"
                color="error"
                onClick={() => handleCategoryDeleteBtnClick(category._id)}
              >
                삭제
              </CategoryDeleteBtn>
            </CategoryListItem>
          ))
        )}
      </CategoryList>
    </Dialog>
  );
}

export default TodoCategoryDialog;
