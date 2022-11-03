import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { display, flexbox } from "@mui/system";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameState } from "../atoms/userAtom";
import { createNotice, updateNotice } from "../utils/fetch";

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
function UpdateNoticePage() {
  const localStorage = window.localStorage;
  const noticeData = JSON.parse(localStorage.getItem("noticeData") || "");
  const navigate = useNavigate();
  const { clubID, noticeID } = useParams();

  const [title, setTitle] = useState(noticeData.title);
  const [content, setContent] = useState(noticeData.content);
  const userName = useRecoilValue(userNameState);

  const { mutate } = useMutation(
    () =>
      updateNotice({
        clubId: clubID || "",
        noticeID: noticeID || "",
        writer: noticeData.writer,
        title,
        content,
        tags: [],
      }),
    {
      onSuccess: (data) => {
        console.log(data);
        navigate(`/club/${clubID}/notice`);
        window.location.reload();
      },
      onError: (error) => {
        console.log(error);
      },
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
  };
  // const { mutate } = useMutation(() => );
  return (
    <AddNoticePageContainer onSubmit={handleNewNoticeSubmit}>
      <TitleInput required value={title} onChange={handleTitleChange} />
      <ContentInput
        required
        value={content}
        rows={25}
        onChange={handleContentChange}
      />
      <ButtonContainer>
        <AddButton variant="contained" color="success" type="submit">
          공지 수정하기
        </AddButton>
      </ButtonContainer>
    </AddNoticePageContainer>
  );
}

export default UpdateNoticePage;
