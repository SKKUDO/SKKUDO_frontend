import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ClubType } from "../types/club";
import { getOneClub } from "../utils/fetch/fetchClub";

const ClubHeader = styled("div")({
  display: "flex",
  width: "100%",
  maxWidth: "80%",
  margin: "0 auto",
  gap: "2%",
  fontSize: "calc(10px + 1.8vw)",
  color: "#0C4426",
  borderBottom: "4px solid #000069",
  paddingBottom: "1%",
  marginBottom: "1%",
  fontWeight: 800,
});

const Title = styled("div")({
  color: "#000069",
});

interface ClubDetailHeaderType {
  pageType: string;
}
function ClubDetailHeader({ pageType }: ClubDetailHeaderType) {
  const { clubID } = useParams();
  const { data: clubData, isLoading: isClubLoading } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );
  return (
    <ClubHeader>
      <Title>{clubData?.name}</Title>
      <Title>{pageType}</Title>
    </ClubHeader>
  );
}

export default ClubDetailHeader;
