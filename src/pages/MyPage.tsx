import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import exampleImage from "../assets/images/example.png";
import { RegisteredClubType } from "../types/user";
import { getAppliedUserByID } from "../utils/fetch/fetchApply";
import { isLoggedInState } from "../atoms/loginAtom";
import { loggedInUserState } from "../atoms/userAtom";
import { BASE_URL } from "../utils/fetch/fetch";
import UserInfoViewer from "../components/myPage/UserInfoViewer";
import DefaultClubCard from "../components/myPage/DefaultClubCard";
import Sunkyun from "../assets/images/sunkyun.png";

const MyPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  /* max-width: 55vw; */
  padding-top: 8vh;
  padding-bottom: 10vh;
  @media screen and (max-width: 1024px) {
    max-width: 90vw;
  }
`;

const SectionContainer = styled.div`
  margin-top: 9vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  max-width: 55vw;
  font-size: 2em;
  color: #000069;
  margin-bottom: 5vh;
  font-weight: 600;
  padding-left: 0.5vw;
`;

const ClubCardsContainer = styled.div`
  width: 100%;
  max-width: 55vw;
  flex-wrap: wrap;
  display: flex;
  gap: 0.5vw;
  @media screen and (max-width: 490px) {
    max-width: 100%;
  }
`;

const ProductImgStyle = styled.img`
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const NoClubLable = styled.div`
  color: #000069;
  font-size: 20px;
  font-weight: 600;
  padding-left: 0.5vw;
`;

function MyPage() {
  const navigate = useNavigate();
  const [userClubs, setUserClubs] = useState<RegisteredClubType[]>([]);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const loggedInUser = useRecoilValue(loggedInUserState);

  const { data: appliedClubs } = useQuery<RegisteredClubType[]>(
    "getAppliedClubsByID",
    getAppliedUserByID,
    {
      onSuccess: (data) => {},
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  useEffect(() => {
    if (!isLoggedIn) {
      // navigate("/login");
      // console.log("nont logged in");
    } else {
      if (loggedInUser) {
        setUserClubs(Object.values(loggedInUser.registeredClubs));
      }
    }
  }, [isLoggedIn, loggedInUser]);

  const handleMyClubCardClick = (clubID: string) => {
    navigate(`/club/${clubID}/notice`);
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = Sunkyun;
  };

  return (
    <>
      <MyPageContainer>
        <UserInfoViewer />
        <SectionContainer>
          <Title>내 동아리</Title>
          <ClubCardsContainer>
            {userClubs.length === 0 ? (
              <NoClubLable>소속된 동아리가 없습니다.</NoClubLable>
            ) : (
              userClubs?.map((club) => (
                <Card key={club.clubId}>
                  <CardActionArea
                    onClick={() => handleMyClubCardClick(club.clubId)}
                  >
                    {/* <CardMedia
                      component="img"
                      height="140"
                      image={BASE_URL + "/" + club.image}
                      alt="green iguana"
                      sx={{ objectFit: "contain" }}
                    /> */}
                    <Box sx={{ pt: "100%", position: "relative" }}>
                      <ProductImgStyle
                        alt={club.clubName}
                        src={club.image ? BASE_URL + "/" + club.image : Sunkyun}
                        onError={handleImageError}
                      />
                    </Box>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "20px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: "#000069" }}
                      >
                        {club.clubName}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ color: "#1c3879" }}
                      >
                        {club.role}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            )}
          </ClubCardsContainer>
        </SectionContainer>

        <SectionContainer>
          <Title>지원중인 동아리</Title>
          <ClubCardsContainer>
            {appliedClubs && appliedClubs.length === 0 ? (
              // <DefaultClubCard text="지원한 동아리가 없습니다" />
              <NoClubLable>지원중인 동아리가 없습니다.</NoClubLable>
            ) : (
              appliedClubs?.map((club) => (
                <Card key={club.clubId} sx={{ width: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={exampleImage}
                      alt="green iguana"
                      sx={{ objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {club.clubName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))
            )}
          </ClubCardsContainer>
        </SectionContainer>
      </MyPageContainer>
    </>
  );
}

export default MyPage;
