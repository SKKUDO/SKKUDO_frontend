import { Container, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";

import { useState } from "react";
import { useQuery } from "react-query";
import ClubsFilterSidebar from "../components/clubsComponents/ClubsFilterSidebar";
import ClubsList from "../components/clubsComponents/ClubsList";
import { ClubType } from "../types/club";
import { getAllClubs } from "../utils/fetch";

const ALL_CLUBS_LIST: ClubType[] = [
  {
    _id: "1",
    name: "billboard",
    location: "자과캠",
    type: {
      _id: "1",
      name: "보드게임",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userColumns: [
      {
        _id: "1",
        key: "newKey",
        valueType: "string",
      },
    ],
    recruitType: "정규모집",
    recruitStart: null,
    recruitEnd: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    name: "hakhae",
    location: "인사캠",
    type: {
      _id: "2",
      name: "수학",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userColumns: [
      {
        _id: "1",
        key: "newKey",
        valueType: "string",
      },
    ],
    recruitType: "상시모집",
    recruitStart: null,
    recruitEnd: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const RECRUITING_CLUBS_LIST: ClubType[] = [
  {
    _id: "2",
    name: "hakhae",
    location: "인사캠",
    type: {
      _id: "2",
      name: "수학",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    userColumns: [
      {
        _id: "1",
        key: "newKey",
        valueType: "string",
      },
    ],
    recruitType: "상시모집",
    recruitStart: null,
    recruitEnd: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function ClubsPage() {
  const { isSuccess, status, data, error, isLoading } = useQuery<ClubType[]>(
    "getAllClubs",
    getAllClubs
  );

  const filterRecruitingClubs = (allClubs: ClubType[] | undefined) => {
    if (typeof allClubs === "undefined") {
      return null;
    } else {
      const today = moment(new Date()).format("YYYY-MM-DD");
      const recruitingClubs = allClubs.filter((club) => {
        if (club.recruitType === "상시모집") {
          return true;
        } else {
          // console.log(typeof club.recruitStart);
          return (
            today >= club.recruitStart!.substring(0, 10) &&
            today <= club.recruitEnd!.substring(0, 10)
          );
        }
      });
      return recruitingClubs;
    }
  };

  const recruitingClubs = filterRecruitingClubs(data);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container sx={{ paddingTop: "80px" }}>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ClubsFilterSidebar
            isOpenFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
        </Stack>
      </Stack>
      <Stack divider={<Divider />}>
        <div>
          <Typography variant="h4" sx={{ mb: 5 }}>
            모든 동아리/학회
          </Typography>
          {/* {isLoading ? (
            <ClubsList clubs={ALL_CLUBS_LIST} />
          ) : (
            <ClubsList clubs={data!} />
          )} */}
          <ClubsList clubs={isLoading ? ALL_CLUBS_LIST : data!} />
        </div>
        <div>
          <Typography variant="h4" sx={{ mb: 5, marginTop: "40px" }}>
            모집중인 동아리/학회
          </Typography>
          {recruitingClubs ? <ClubsList clubs={recruitingClubs} /> : null}
        </div>
      </Stack>
    </Container>
  );
}

export default ClubsPage;
