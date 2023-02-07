import { Paper } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageTitle } from "../../components/admin/PageTitle";
import { ClubType } from "../../types/club";
import { getAllClubs } from "../../utils/fetch/fetchClub";

const ClubsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  gap: 35px;
`;

const ItemBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  padding: 10px;
`;

export default function AllClubsPage() {
  const navigate = useNavigate();
  const { data } = useQuery<ClubType[]>("getAllClubs", getAllClubs, {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const handleItemClick = (clubID: string) => {
    console.log("click");
    navigate(`/admin/clubDetail/${clubID}`);
  };
  return (
    <>
      <PageTitle>전체 동아리</PageTitle>
      <ClubsContainer>
        {data &&
          data.map((club) => (
            <Paper
              key={club._id}
              elevation={3}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.2)",
                },
              }}
            >
              <ItemBtn onClick={() => handleItemClick(club._id)}>
                {club.name}
              </ItemBtn>
            </Paper>
          ))}
      </ClubsContainer>
    </>
  );
}
