import { Paper, Stack, styled } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { BiMessageSquareAdd } from "react-icons/bi";

import {
  deleteNotice,
  getAllNotices,
  getNoticesByClubID,
} from "../utils/fetch";
import {
  ClickedNoticeInfoType,
  DeleteNoticetype,
  NewNoticeType,
  NoticeType,
  UpdateNoticeType,
} from "../types/notice";

import ClubDetailHeader from "../components/ClubDetailHeader";
import { flexbox } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import NoticeDetail from "../components/noticeComponents/NoticeDetail";
import { useRecoilState } from "recoil";
import { isNoticeDetailOpenState } from "../atoms/utilAtom";
import CategoryAddDialog from "../components/noticeComponents/CategoryAddDialog";

const AddIconContainer = styled("div")({
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "right",
  marginTop: "60px",
});

const OptionBtn = styled("button")({
  position: "absolute",
  right: 0,
  border: "none",
  backgroundColor: "transparent",
});

const NoticeTitle = styled("div")({
  flex: 1,
});

interface OptionContainerType {
  isOptionOpened: boolean;
}

const OptionContainer = styled("div")<OptionContainerType>(
  {
    position: "absolute",
    width: "60px",
    height: "100px",
    backgroundColor: "beige",
    left: -20,
    zIndex: 3,
  },
  (props) => ({
    display: props.isOptionOpened ? "block" : "none",
  })
);

const Option = styled("div")({
  width: "100%",
  height: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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

const AddCategoryBtn = styled("button")({});

function NoticePage() {
  const navigate = useNavigate();
  const { clubID } = useParams();
  console.log(clubID);
  const { data: noticeData, isLoading: isNoticeLoading } = useQuery<
    NoticeType[]
  >("getNoticesByClubID", () => getNoticesByClubID(clubID || ""));
  const [clickedNoticeID, setClickedNoticeID] = useState("");
  const [isOptionOpened, setIsOptionOpened] = useState(false);
  const [clickedNoticeInfo, setClickedNotiiceInfo] =
    useState<ClickedNoticeInfoType>({ writer: "", title: "", content: "" });

  const [isNoticeDetailOpen, setIsNoticeDetailOpen] = useRecoilState(
    isNoticeDetailOpenState
  );

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const handlClickOpen = () => {
    setIsCategoryDialogOpen(true);
  };

  const handleClose = () => {
    setIsCategoryDialogOpen(false);
  };
  const onNoticeAddBtnClicked = () => {
    navigate("add");
  };

  const handleOptionBtnClicked = (clickedNoticeID: string) => {
    setClickedNoticeID(clickedNoticeID);
    setIsOptionOpened((prev) => !prev);
  };

  const handleTitleClick = (writer: string, title: string, content: string) => {
    setClickedNotiiceInfo({ writer, title, content });
    setIsNoticeDetailOpen(true);
  };

  const { mutate } = useMutation(
    (deleteNoticeInfo: DeleteNoticetype) => deleteNotice(deleteNoticeInfo),
    {
      onSuccess: (data) => {
        console.log(data);
        window.location.reload();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  //need to fix this axios error
  const handleNoticeDeleteBtnClick = (deleteNoticeInfo: DeleteNoticetype) => {
    mutate(deleteNoticeInfo);
    console.log(deleteNoticeInfo.clubID);
    console.log(deleteNoticeInfo.noticeID);
  };
  const localStorage = window.localStorage;

  const handleNoticeUpdateBtnClick = (newNoticeInfo: UpdateNoticeType) => {
    localStorage.setItem(
      "noticeData",
      JSON.stringify({
        writer: newNoticeInfo.writer,
        title: newNoticeInfo.title,
        content: newNoticeInfo.content,
      })
    );
    navigate(`${newNoticeInfo.noticeID}`);
  };
  // console.log(noticeData);
  return (
    <>
      <ClubDetailHeader pageType="공지사항" />
      <AddIconContainer>
        <BiMessageSquareAdd size="2.5rem" onClick={onNoticeAddBtnClicked} />
      </AddIconContainer>
      <AddCategoryBtn onClick={handlClickOpen}>카테고리 추가</AddCategoryBtn>
      <CategoryAddDialog open={isCategoryDialogOpen} onClose={handleClose} />
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
            <div>아직 공지가 없습니다.</div>
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
              <Item
                elevation={3}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <NoticeTitle
                  onClick={() =>
                    handleTitleClick(
                      notice.writer || "unknown",
                      notice.title,
                      notice.content
                    )
                  }
                >
                  {notice.title}
                </NoticeTitle>
                <OptionBtn onClick={() => handleOptionBtnClicked(notice._id)}>
                  <BsThreeDotsVertical />
                  <OptionContainer
                    isOptionOpened={
                      isOptionOpened && clickedNoticeID === notice._id
                    }
                  >
                    <Option
                      onClick={() =>
                        handleNoticeDeleteBtnClick({
                          noticeID: notice._id,
                          clubID: notice.clubId,
                        })
                      }
                    >
                      삭제
                    </Option>
                    <Option
                      onClick={() =>
                        handleNoticeUpdateBtnClick({
                          noticeID: notice._id,
                          writer: notice.writer,
                          title: notice.title,
                          content: notice.content,
                          clubId: notice.clubId,
                        })
                      }
                    >
                      수정
                    </Option>
                  </OptionContainer>
                </OptionBtn>
              </Item>
            </Stack>
          ))
        )}
      </Stack>
      <NoticeDetail noticeInfo={clickedNoticeInfo} />
    </>
  );
}

export default NoticePage;
