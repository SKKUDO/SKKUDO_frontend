import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { display, flexbox } from "@mui/system";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { createNotice } from "../utils/fetch";

// const Blank = styled("div")({
//   paddingTop: "120px",
// });
const AddNoticePageContainer = styled("form")({
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  paddingTop: "200px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

const TitleInput = styled("input")({
  width: "400px",
  height: "50px",
  marginBottom: "50px",
  borderRadius: "5px",
  backgroundColor: "#fff",
  border: "2px solid #0c4426",
  fontSize: "1.5rem",
});

const ContentInput = styled("textarea")({
  backgroundColor: "#fff",
  border: "2px solid #0c4426",
  fontSize: "1.2rem",
  borderRadius: "5px",
});

const ButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "right",
  marginTop: "40px",
});
const AddButton = styled(Button)({
  width: "200px",
  color: "#dde143",
  marginBottom: "40px",
});
function AddNoticePage() {
  const navigate = useNavigate();
  const { clubID } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate } = useMutation(
    () => createNotice({ clubId: clubID || "", title, content }),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const handleNewNoticeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
    navigate(`/club/${clubID}/notice`);
  };
  // const { mutate } = useMutation(() => );
  return (
    <AddNoticePageContainer onSubmit={handleNewNoticeSubmit}>
      <TitleInput required onChange={handleTitleChange} />
      <ContentInput required rows={25} onChange={handleContentChange} />
      <ButtonContainer>
        <AddButton variant="contained" color="success" type="submit">
          공지 추가하기
        </AddButton>
      </ButtonContainer>
    </AddNoticePageContainer>
  );
}

export default AddNoticePage;
