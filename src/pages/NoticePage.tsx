import { Paper, Stack, styled } from "@mui/material";
import { useQuery } from "react-query";
import { BiMessageSquareAdd } from "react-icons/bi";

import { getAllNotices } from "../utils/fetch";
import { NoticeType } from "../types/notice";

import ClubDetailHeader from "../components/ClubDetailHeader";
import { flexbox } from "@mui/system";
import { useNavigate } from "react-router-dom";

const AddIconContainer = styled("div")({
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "right",
  marginTop: "60px",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
  height: "60px",
  // maxWidth: "1024px",
}));

function NoticePage() {
  const navigate = useNavigate();
  const { data: noticeData, isLoading: isNoticeLoading } = useQuery<
    NoticeType[]
  >("getAllNotices", getAllNotices);

  const onNoticeAddBtnClicked = () => {
    navigate("add");
  };
  // console.log(noticeData);
  return (
    <>
      <ClubDetailHeader pageType="공지사항" />
      <AddIconContainer>
        <BiMessageSquareAdd size="2.5rem" onClick={onNoticeAddBtnClicked} />
      </AddIconContainer>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {isNoticeLoading ? (
          <>
            <Stack spacing={1} sx={{ width: "100%", maxWidth: "1024px" }}>
              <Stack
                sx={{ width: "100%", justifyContent: "flex-end" }}
                spacing={2}
                direction={"row"}
              >
                <div>cate 1</div>
                <div>cate 1</div>
                <div>cate 1</div>
              </Stack>
              <Item elevation={3}>Item 1</Item>
            </Stack>
            <Stack spacing={1} sx={{ width: "100%", maxWidth: "1024px" }}>
              <Stack
                sx={{ width: "100%", justifyContent: "flex-end" }}
                spacing={2}
                direction={"row"}
              >
                <div>cate 1</div>
                <div>cate 1</div>
                <div>cate 1</div>
              </Stack>
              <Item elevation={3}>Item 1</Item>
            </Stack>
          </>
        ) : (
          noticeData?.map((notice) => (
            <Stack
              key={notice._id}
              spacing={1}
              sx={{ width: "100%", maxWidth: "1024px" }}
            >
              <Stack
                sx={{ widht: "100%", justifyContent: "flex-end" }}
                spacing={2}
                direction={"row"}
              >
                <div>cate 1</div>
                <div>cate 1</div>
                <div>cate 1</div>
              </Stack>
              <Item elevation={3}>{notice.title}</Item>
            </Stack>
          ))
        )}
      </Stack>
    </>
  );
}

export default NoticePage;
