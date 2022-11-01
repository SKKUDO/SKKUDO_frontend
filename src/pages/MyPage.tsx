import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import exampleImage from "../assets/images/example.png";

import { RegisteredClubType, VerifyUserResponseType } from "../types/user";
import { verifyUser } from "../utils/fetch";

const MyPageContainer = styled.div`
  padding-top: 80px;
`;

const SectionContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const Title = styled.div`
  width: 100%;
  max-width: 1024px;
  font-size: 2.5rem;

  margin-bottom: 40px;
`;

const ClubCardsContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  flex-wrap: wrap;
`;

function MyPage() {
  const navigate = useNavigate();
  const [userClubs, setUserClubs] = useState<RegisteredClubType[]>();

  const { mutate, data, isLoading } = useMutation<VerifyUserResponseType>(
    verifyUser,
    {
      onSuccess: (data) => setUserClubs(data.authUser.registeredClubs),
      onError: (error) => navigate("/login"),
    }
  );

  // const cookie = useCookies(["x_auth"]);

  useEffect(() => {
    mutate();
  }, []);

  const handleMyClubCardClick = (clubID: string) => {
    navigate(`/club/${clubID}/notice`);
  };

  return (
    <MyPageContainer>
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <SectionContainer>
            <Title>내 동아리</Title>
            <ClubCardsContainer>
              {isLoading ? (
                <Card sx={{ maxWidth: 345 }}>
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
                        Club Name
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        My Postion
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ) : (
                userClubs?.map((club) => (
                  <Card key={club.clubId} sx={{ maxWidth: 345 }}>
                    <CardActionArea
                      onClick={() => handleMyClubCardClick(club.clubId)}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={exampleImage}
                        alt="green iguana"
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          user registered club
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
              <Card sx={{ maxWidth: 345 }}>
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
                      Club Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      My Postion
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ClubCardsContainer>
          </SectionContainer>
        </>
      )}
    </MyPageContainer>
  );
}

export default MyPage;
