import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isNoticeDetailOpenState } from "../../atoms/utilAtom";
import { ClickedNoticeInfoType } from "../../types/notice";

interface NoticeDetailElementType {
  isNoticeDetailOpen: boolean;
}
const NoticeDetailOverlay = styled.div<NoticeDetailElementType>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.isNoticeDetailOpen ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const NoticeBoard = styled.div<NoticeDetailElementType>`
  position: fixed;
  top: 10%;
  transform: translateX(-50%);
  left: 50%;
  width: 100%;
  max-width: 1024px;
  height: 800px;
  background-color: aliceblue;
  display: ${(props) => (props.isNoticeDetailOpen ? "flex" : "none")};
  flex-direction: column;
`;

const NoticeTitle = styled.div``;
const NoticeWriter = styled.div``;
const NoticeContent = styled.div``;

function NoticeDetail({ noticeInfo }: { noticeInfo: ClickedNoticeInfoType }) {
  const [isNoticeDetailOpen, setIsNoticeDetailOpen] = useRecoilState(
    isNoticeDetailOpenState
  );
  const handleOverlayClick = () => {
    setIsNoticeDetailOpen(false);
  };

  return (
    <>
      <NoticeDetailOverlay
        isNoticeDetailOpen={isNoticeDetailOpen}
        onClick={handleOverlayClick}
      />
      <NoticeBoard isNoticeDetailOpen={isNoticeDetailOpen}>
        <NoticeTitle>{noticeInfo.title}</NoticeTitle>
        <NoticeWriter>{noticeInfo.writer}</NoticeWriter>
        <NoticeContent>{noticeInfo.content}</NoticeContent>
      </NoticeBoard>
    </>
  );
}

export default NoticeDetail;
