import { Paper, Stack, styled } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BiMessageSquareAdd } from "react-icons/bi";
import { deleteNotice, getNoticesByClubID } from "../utils/fetch";
import {
  ClickedNoticeInfoType,
  DeleteNoticetype,
  NoticeType,
  UpdateNoticeType,
} from "../types/notice";
import ClubDetailHeader from "../components/ClubDetailHeader";
import FilterTag from "../components/FilterTag";
import { useNavigate, useParams } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import NoticeDetail from "../components/notice/NoticeDetail";
import { useSetRecoilState } from "recoil";
import { isNoticeDetailOpenState } from "../atoms/utilAtom";
import CategoryAddDialog from "../components/notice/CategoryAddDialog";
import { motion } from "framer-motion";
import { getNoticeTagsByClubID } from "./../utils/fetch";

interface TagType {
  _id: string;
  clubId: string | undefined;
  name: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

const BtnContainer = styled("div")({
  position: "relative",
  display: "flex",
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  justifyContent: "flex-end",
  gap: "20px",
  marginTop: "80px",
});

const AddCategoryBtn = styled(motion.button)({
  backgroundColor: "transparent",
  color: "#0c4426",
  fontWeight: "600",
  paddingLeft: "10px",
  paddingRight: "10px",
  fontSize: "20px",
  border: "2px solid ",
  borderRadius: "10px",
});

const AddIconContainer = styled(motion.div)({
  display: "flex",
  justifyContent: "right",
});

const OptionBtn = styled(motion.button)({
  position: "relative",
  height: "100%",
  // right: 0,
  border: "none",
  backgroundColor: "transparent",
  width: "20px",
});

const NoticeTitle = styled(motion.div)({
  flex: 1,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingLeft: "40px",
  fontSize: "25px",
});

interface OptionContainerType {
  isOptionOpened: boolean;
}

const OptionContainer = styled("div")<OptionContainerType>(
  {
    position: "absolute",
    width: "60px",
    height: "100px",
    backgroundColor: "white",
    left: -20,
    zIndex: 3,
    borderRadius: "10px",
    border: "1px solid #0c4426",
  },
  (props) => ({
    display: props.isOptionOpened ? "block" : "none",
  })
);

const Option = styled(motion.div)({
  color: "#0c4426",
  width: "100%",
  height: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: "600",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100%",
  height: "60px",
}));

export const Tag = styled("div")({
  height: "100%",
  backgroundColor: "#0c4426",
  color: "white",
  borderRadius: "4px",
  padding: "5px",
  fontSize: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const FilterWrapper = styled("div")({
  position: "absolute",
  display: "flex",
  left: 0,
  justifyContent: "flex-start",
});

function NoticePage() {
  const navigate = useNavigate();
  const { clubID } = useParams();
  const queryClient = useQueryClient();

  const { data: noticeData, isLoading: isNoticeLoading } = useQuery<
    NoticeType[]
  >("getNoticesByClubID", () => getNoticesByClubID(clubID || ""), {
    onError: (error: any) => alert(error.response.data.error),
    onSuccess(data: NoticeType[]) {
      setUsingItems(data);
    },
  });

  const [clickedNoticeID, setClickedNoticeID] = useState("");
  const [usingItems, setUsingItems] = useState<NoticeType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [isOptionOpened, setIsOptionOpened] = useState(false);
  const [clickedNoticeInfo, setClickedNotiiceInfo] =
    useState<ClickedNoticeInfoType>({
      writer: "",
      title: "",
      content: "",
      noticeTags: [],
    });

  const setIsNoticeDetailOpen = useSetRecoilState(isNoticeDetailOpenState);

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

  const handleTitleClick = (
    writer: string,
    title: string,
    content: string,
    noticeTags: string[]
  ) => {
    setClickedNotiiceInfo({ writer, title, content, noticeTags });
    setIsNoticeDetailOpen(true);
    setIsOptionOpened((prev) => !prev);
  };

  const { mutate } = useMutation(
    (deleteNoticeInfo: DeleteNoticetype) => deleteNotice(deleteNoticeInfo),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getNoticesByClubID");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const handleNoticeDeleteBtnClick = (deleteNoticeInfo: DeleteNoticetype) => {
    mutate(deleteNoticeInfo);
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

  useEffect(() => {
    getNoticeTagsByClubID(clubID as string).then((data) => {
      setTags(data);
    });
  }, [clubID]);
  return (
    <>
      <ClubDetailHeader pageType="공지사항" />

      <BtnContainer>
        <FilterWrapper>
          <FilterTag
            tags={tags}
            usingItems={noticeData ? noticeData : []}
            setItems={setUsingItems}
            isClub={false}
          />
        </FilterWrapper>
        <AddCategoryBtn
          whileHover={{
            backgroundColor: "#0c4426",
            color: "#FFFFFF",
            border: "1px solid #FFFFFF",
          }}
          onClick={handlClickOpen}
        >
          카테고리 추가
        </AddCategoryBtn>
        <AddIconContainer whileHover={{ scale: 1.1 }}>
          <BiMessageSquareAdd size="2.5rem" onClick={onNoticeAddBtnClicked} />
        </AddIconContainer>
      </BtnContainer>
      <CategoryAddDialog open={isCategoryDialogOpen} onClose={handleClose} />
      <Stack
        spacing={1}
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        {isNoticeLoading ? (
          <>
            <div>아직 공지가 없습니다.</div>
          </>
        ) : (
          [...usingItems!].reverse().map((notice) => (
            <Stack
              key={notice._id}
              spacing={1}
              sx={{ width: "100%", maxWidth: "1024px" }}
            >
              <Stack
                sx={{
                  width: "100%",
                  justifyContent: "flex-end",
                  height: "30px",
                }}
                spacing={2}
                direction={"row"}
              >
                {notice.noticeTags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
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
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                  onClick={() =>
                    handleTitleClick(
                      notice.writer || "unknown",
                      notice.title,
                      notice.content,
                      notice.noticeTags
                    )
                  }
                >
                  {notice.title}
                </NoticeTitle>
                <OptionBtn
                  onClick={() => handleOptionBtnClicked(notice._id)}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}
                >
                  <BsThreeDotsVertical />
                  <OptionContainer
                    isOptionOpened={
                      isOptionOpened && clickedNoticeID === notice._id
                    }
                  >
                    <Option
                      style={{ borderBottom: "1px solid #0c4426" }}
                      onClick={() =>
                        handleNoticeDeleteBtnClick({
                          _id: notice._id,
                          clubID: notice.clubId,
                        })
                      }
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}
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
                          noticeTags: notice.noticeTags,
                          private: notice.private,
                        })
                      }
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.2)" }}
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
