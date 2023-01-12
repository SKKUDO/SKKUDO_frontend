import { Container, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";

import ClubsList from "../components/clubs/ClubsList";
import FilterTag from "../components/FilterTag";
import { ClubType } from "../types/club";
import { getAllClubs, getAllClubTypes } from "../utils/fetch/fetchClub";

interface TagType {
  _id: string;
  name: string;
  clubId: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

function ClubsPage() {
  const { data, isLoading } = useQuery<ClubType[]>("getAllClubs", getAllClubs, {
    onSuccess(data) {
      // console.log(data);
      setItems(data);
    },
    onError(error: any) {
      alert(error.response.data.error);
    },
  });

  const filterRecruitingClubs = (allClubs: ClubType[] | undefined) => {
    if (typeof allClubs === "undefined") {
      return null;
    } else {
      const today = moment(new Date()).format("YYYY-MM-DD");
      const recruitingClubs = allClubs.filter((club) => {
        if (club.recruitType === "상시모집") {
          return true;
        } else {
          return (
            club.recruitStart &&
            club.recruitEnd &&
            today >= club.recruitStart.substring(0, 10) &&
            today <= club.recruitEnd.substring(0, 10)
          );
        }
      });
      return recruitingClubs;
    }
  };

  const [items, setItems] = useState<ClubType[] | undefined>(data);

  const recruitingClubs = filterRecruitingClubs(items);

  const { data: tags } = useQuery<TagType[]>(
    "getAllClubTypes",
    getAllClubTypes,
    {
      onError: (error: any) => alert(error.response.data.error),
    }
  );
  return (
    <Container sx={{ paddingTop: "80px" }}>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5, margin: 0, marginTop: "40px" }}
      >
        <FilterTag
          isClub={true}
          tags={tags || []}
          usingItems={data as ClubType[]}
          setItems={setItems}
        />
      </Stack>

      <Stack divider={<Divider />}>
        <>
          <Typography variant="h3" sx={{ mb: 5, color: "#000069" }}>
            모든 동아리/학회
          </Typography>

          <ClubsList clubs={isLoading ? [] : items!} />
        </>
        <>
          <Typography
            variant="h3"
            sx={{ mb: 5, marginTop: "40px", color: "#000069" }}
          >
            모집중인 동아리/학회
          </Typography>
          {recruitingClubs ? <ClubsList clubs={recruitingClubs} /> : null}
        </>
      </Stack>
    </Container>
  );
}

export default ClubsPage;
