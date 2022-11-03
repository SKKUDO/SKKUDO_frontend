import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { display, flexbox } from "@mui/system";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameState } from "../atoms/userAtom";
import { createNotice, getNoticeTagsByClubID } from "../utils/fetch";
import { GrFormAdd } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
import { NoticeTagType } from "../types/notice";

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
  display: "flex",
});

const CategorySelect = styled("select")({
  backgroundColor: "rgba(0,0,0,0.2)",
  width: "100%",
  height: "100%",
  border: "none",
  borderBottom: "1px solid",
});

const CategoryAddBtn = styled("button")({
  height: "100%",
  width: "30px",

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
  const [category, setCategory] = useState<NoticeTagType>();
  const [categories, setCategories] = useState<NoticeTagType[]>([]);

  const { data, isLoading } = useQuery<NoticeTagType[]>(
    "getNoticeTagsByClubID",
    () => getNoticeTagsByClubID(clubID || "")
  );

  console.log(data);
  // console.log(data);

  const { mutate } = useMutation(
    () =>
      createNotice({
        clubId: clubID || "",
        title,
        content,
        writer: userName,
        tags: categories,
      }),
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

  const handleNewNoticeSubmit = () => {
    // event.preventDefault();
    console.log(categories);
    // const newCategories = categories.map((category) => {
    //   delete category?.__v;
    //   return category;
    // });
    // setCategories(newCategories);
    // console.log(categories);
    mutate();
  };

  const handleCategorySelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const categoryName = event.target.value;
    if (data) {
      const selectedCategory = data.filter(
        (cate) => cate.name === categoryName
      );
      setCategory(selectedCategory[0]);
    }
  };

  const handleCategoryAddBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (category) {
      setCategories((prev) => [...prev, category]);
      console.log(categories);
    }
  };

  const handleCategoryDeleteBtnClick = (
    event: React.MouseEvent<HTMLElement>,
    category: NoticeTagType
  ) => {
    event.preventDefault();
    const idx = categories.indexOf(category);
    if (idx === -1) {
      console.log("nocategory found");
    } else {
      let newCategories = [...categories];
      newCategories.splice(idx, 1);
      setCategories(newCategories);
    }
  };
  // const { mutate } = useMutation(() => );
  return (
    <AddNoticePageContainer>
      <HeaderInptut>
        <TitleInput required onChange={handleTitleChange} />
        <CategoryInputContainer>
          <CategorySelect onChange={handleCategorySelect}>
            {isLoading ? (
              <option disabled></option>
            ) : (
              data?.map((cate) => (
                <option key={cate._id} value={cate.name}>
                  {cate.name}
                </option>
              ))
            )}
          </CategorySelect>
          <CategoryAddBtn onClick={handleCategoryAddBtnClick}>
            <GrFormAdd size="1.3em" />
          </CategoryAddBtn>
        </CategoryInputContainer>
      </HeaderInptut>
      <CategoryViewer>
        {categories.map((category, index) => (
          <CategoryContainer key={index}>
            <Category>{category.name}</Category>
            <CategoryDeleteBtn
              onClick={(event) => handleCategoryDeleteBtnClick(event, category)}
            >
              <FiDelete />
            </CategoryDeleteBtn>
          </CategoryContainer>
        ))}
      </CategoryViewer>
      <ContentInput required rows={25} onChange={handleContentChange} />
      <ButtonContainer>
        <AddButton
          variant="contained"
          color="success"
          onClick={handleNewNoticeSubmit}
        >
          공지 추가하기
        </AddButton>
      </ButtonContainer>
    </AddNoticePageContainer>
  );
}

export default AddNoticePage;
