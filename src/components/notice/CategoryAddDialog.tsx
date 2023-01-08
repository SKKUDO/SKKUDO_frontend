import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { DeleteNoticetype, NoticeTagType } from "../../types/notice";
import {
  createNoticeTag,
  deleteNoticeTag,
  getNoticeTagsByClubID,
} from "../../utils/fetch/fetchNotice";

export const CategoryList = styled.ul`
  width: 100%;
  border-top: 1px solid #0c4426;
`;
export const CategoryListItem = styled.li`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: ceter;
  position: relative;
  border-bottom: 1px solid #0c4426;
  height: 60px;
  align-items: center;
`;
export const CategoryLabel = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
export const CategoryDeleteBtn = styled(Button)`
  position: absolute;
  right: 20px;
  height: 30px;
`;
export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function CategoryAddDialog(props: SimpleDialogProps) {
  const { clubID } = useParams();
  const [newCategory, setNewCategory] = React.useState("");
  const { onClose, open } = props;

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<NoticeTagType[]>(
    "getNoticeTagsByClubID",
    () => getNoticeTagsByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const { mutate: createNoticeTagMutate } = useMutation(
    () => createNoticeTag({ clubId: clubID || "", name: newCategory }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getNoticeTagsByClubID");
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const { mutate: deleteNoticeTagMutate } = useMutation(
    (tagInfo: DeleteNoticetype) => deleteNoticeTag(tagInfo),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getNoticeTagsByClubID");
      },
      onError: (error: { response: { data: { error: string } } }) =>
        alert(error.response.data.error),
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
    createNoticeTagMutate();
    setNewCategory("");
  };

  const handleCategoryDeleteBtnClick = (tagID: string) => {
    if (clubID) {
      deleteNoticeTagMutate({ _id: tagID, clubID: clubID });
    }
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>공지 카테고리 추가하기</DialogTitle>
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
          label="Outlined"
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
          Success
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
                Delete
              </CategoryDeleteBtn>
            </CategoryListItem>
          ))
        )}
      </CategoryList>
    </Dialog>
  );
}

export default CategoryAddDialog;
