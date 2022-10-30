import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ClubType } from "../types/club";
import { getOneClub } from "../utils/fetch";

const ClubHeader = styled("div")({
  paddingTop: "120px",
  display: "flex",
  width: "100%",
  maxWidth: "1024px",
  margin: "0 auto",
  gap: "30px",
  fontSize: "40px",
});

interface ClubDetailHeaderType {
  pageType: "공지사항" | "일정" | "동아리원";
}
function ClubDetailHeader({ pageType }: ClubDetailHeaderType) {
  const { clubID } = useParams();
  const { data: clubData, isLoading: isClubLoading } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || "")
  );
  return (
    <ClubHeader>
      <h2>{clubData?.name}</h2>
      <h2>|</h2>
      <h2>{pageType}</h2>
    </ClubHeader>
  );
}

export default ClubDetailHeader;
