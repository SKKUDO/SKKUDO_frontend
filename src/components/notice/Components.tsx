import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

export const AddNoticePageContainer = styled("form")({
  width: "100%",
  maxWidth: "90%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

export const NoticeTitleInput = styled("input")({
  width: "80%",
  height: "50px",
  margin: "0 auto",
  marginBottom: "20px",
  marginTop: "20px",
  borderRadius: "5px",
  backgroundColor: "#fff",
  color: "#000069",
  border: "2px solid",
  fontSize: "1.5rem",
  paddingLeft: "10px",
});

export const NoticeContentInput = styled("textarea")({
  backgroundColor: "#fff",
  margin: "0 auto",
  marginTop: "20px",
  border: "2px solid #000069",
  fontSize: "1.2rem",
  borderRadius: "5px",
  padding: "10px",
  width: "80%",
});

export const NoticeButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "right",
  marginTop: "40px",
});

export const NoticeAddButton = styled(Button)({
  width: "200px",
  color: "white",
  marginBottom: "40px",
});

export const BtnContainer = styled("div")({
  position: "relative",
  display: "flex",
  width: "80%",
  margin: "0 auto",
  justifyContent: "flex-end",
  gap: "1%",
  marginTop: "30px",
});

export const AddCategoryBtn = styled(motion.button)({
  backgroundColor: "transparent",
  color: "#000069",
  fontWeight: "calc(12px+1vw)",
  paddingLeft: "10px",
  paddingRight: "10px",
  fontSize: "1vw",
  border: "2px solid #000069",
  borderRadius: "10px",
  marginTop: "8px",
  height: "32px",
});

export const FilterWrapper = styled("div")({
  position: "absolute",
  display: "flex",
  left: 0,
  justifyContent: "flex-start",
});
