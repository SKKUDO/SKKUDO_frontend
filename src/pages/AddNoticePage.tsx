import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { display, flexbox } from "@mui/system";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameState } from "../atoms/userAtom";
import { createNotice } from "../utils/fetch";
import { GrFormAdd } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";

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

const HeaderInptut = styled("div")({
  display: "flex",
  marginBottom: "30px",
  alignItems: "flex-end",
  justifyContent: "space-between",
});

const TitleInput = styled("input")({
  width: "400px",
  height: "50px",

  borderRadius: "5px",
  backgroundColor: "#fff",
  border: "2px solid #0c4426",
  fontSize: "1.5rem",
});

const CategoryInputContainer = styled("div")({
  width: "200px",
  height: "30px",
  position: "relative",
});

const CategoryInput = styled("input")({
  backgroundColor: "rgba(0,0,0,0.2)",
  width: "100%",
  height: "100%",
  border: "none",
  borderBottom: "1px solid",
});

const CategoryAddBtn = styled("button")({
  position: "absolute",
  height: "100%",
  width: "30px",
  bottom: 0,
  right: 0,
  backgroundColor: "transparent",
  border: "none",
});

const CategoryViewer = styled("div")({
  width: "100%",
  height: "30px",
  backgroundColor: "beige",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "flex-end",
});

const CategoryContainer = styled("div")({
  height: "100%",
  display: "flex",
});

const Category = styled("div")({
  width: "70px",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.2)",
});

const CategoryDeleteBtn = styled("button")({
  width: "20px",
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
  const userName = useRecoilValue(userNameState);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const { mutate } = useMutation(
    () =>
      createNotice({ clubId: clubID || "", title, content, writer: userName }),
    {
      onSuccess: (data) => {
        navigate(`/club/${clubID}/notice`);
        window.location.reload();
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
  };

  const handleCategoryInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setCategory(event.target.value);
  };

  const handleCategoryAddBtnClick = () => {
    setCategories((prev) => [...prev, category]);
    setCategory("");
  };

  const handleCategoryDeleteBtnClick = () => {
    // setCategories(prev => )
  };
  // const { mutate } = useMutation(() => );
  return (
    <AddNoticePageContainer onSubmit={handleNewNoticeSubmit}>
      <HeaderInptut>
        <TitleInput required onChange={handleTitleChange} />
        <CategoryInputContainer>
          <CategoryInput onChange={handleCategoryInputChange} />
          <CategoryAddBtn onClick={handleCategoryAddBtnClick}>
            <GrFormAdd size="1.3em" />
          </CategoryAddBtn>
        </CategoryInputContainer>
      </HeaderInptut>
      <CategoryViewer>
        {categories.map((category, index) => (
          <CategoryContainer key={index}>
            <Category>{category}</Category>
            <CategoryDeleteBtn>
              <FiDelete />
            </CategoryDeleteBtn>
          </CategoryContainer>
        ))}
      </CategoryViewer>
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
