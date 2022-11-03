import * as React from "react";
import Button from "@mui/material/Button";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { Box, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { createNoticeTag } from "../../utils/fetch";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

const NewCategoryForm = styled("form")({});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function CategoryAddDialog(props: SimpleDialogProps) {
  const { clubID } = useParams();
  const [newCategory, setNewCategory] = React.useState("");
  const { onClose, open } = props;

  const { mutate } = useMutation(
    () => createNoticeTag({ clubId: clubID || "", name: newCategory }),
    {
      onSuccess: (data) => {
        console.log(data);
        onClose();
      },
      onError: (error) => {
        console.log(error);
      },
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
    mutate();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>공지 카테고리 추가하기</DialogTitle>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
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
    </Dialog>
  );
}

export default CategoryAddDialog;
