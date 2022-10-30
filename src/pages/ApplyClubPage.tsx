import { Button, makeStyles, MenuItem, styled, TextField } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "react-query";
import FormTitle from "../components/FormTitle";
import { RecruitType } from "../types/club";
import { LocationType } from "../types/common";
import { createClub } from "../utils/fetch";
// import { makeStyles } from '@material-ui/core/styles';

const Blank = styled("div")({
  height: "180px",
});
const ApplyClubPageContainer = styled("form")({
  paddingTop: "50px",
  width: "100%",
  maxWidth: "1024px",
  backgroundColor: "#fff",
  borderRadius: "3px",
  margin: "0 auto",
  paddingBottom: "200px",
  position: "relative",
  boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
});

const ApplyInputContainer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-evenly",
  marginBottom: "70px",
  marginTop: "40px",
});

const locationList = [
  {
    value: "인사캠",
    label: "인사캠",
  },
  {
    value: "자과캠",
    label: "자과캠",
  },
];

const recruitTypeList = [
  {
    value: "상시모집",
    label: "상시모집",
  },
  {
    value: "정규모집",
    label: "정규모집",
  },
];

function ApplyClubPage() {
  const [name, setName] = useState("동아리 이름");
  const [clubType, setClubType] = useState("동아리 주제");
  const [location, setLocation] = useState<LocationType>("인사캠");
  const [recruitType, setRecruitType] = useState<RecruitType>("상시모집");

  const { mutate } = useMutation(
    () => createClub({ name, location, type: { name: clubType }, recruitType }),
    {
      //need to fix
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  const handleApplyClubSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(event.target.value);
  };

  const handleClubTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClubType(event.target.value);
  };
  const handleLocationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocation(event.target.value as LocationType);
  };

  const handleRecruitTypeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRecruitType(event.target.value as RecruitType);
  };

  return (
    <>
      <Blank />
      <ApplyClubPageContainer onSubmit={handleApplyClubSubmit}>
        <FormTitle title="동아리 신청서" />
        <ApplyInputContainer>
          <TextField
            required
            sx={{ width: "40%", input: { backgroundColor: "#fff" } }}
            label="동아리 이름"
            variant="outlined"
            onChange={handleNameChange}
          />
          <TextField
            sx={{ width: "40%" }}
            label="동아리 주제"
            variant="outlined"
            required
            onChange={handleClubTypeChange}
          />
        </ApplyInputContainer>
        <ApplyInputContainer>
          <TextField
            select
            required
            sx={{ width: "40%" }}
            label="동아리 모집 방식"
            variant="outlined"
            value={recruitType}
            onChange={handleRecruitTypeChange}
          >
            {recruitTypeList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            required
            sx={{ width: "40%" }}
            label="지역"
            variant="outlined"
            value={location}
            onChange={handleLocationChange}
          >
            {locationList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ApplyInputContainer>

        <Button
          sx={{ position: "absolute", right: "20px" }}
          type="submit"
          variant="outlined"
        >
          submit
        </Button>
      </ApplyClubPageContainer>
    </>
  );
}

export default ApplyClubPage;
