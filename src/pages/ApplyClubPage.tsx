import {
  Button,
  MenuItem,
  styled,
  TextField,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

import { useMutation, useQuery } from "react-query";
import FormTitle from "../components/FormTitle";
import { RecruitType } from "../types/club";
import { LocationType } from "../types/common";

import { useNavigate } from "react-router-dom";
import { createClub, getAllClubTypes } from "../utils/fetch/fetchClub";

interface TagType {
  _id: string;
  clubId: string | undefined;
  name: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

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
  paddingBottom: "100px",
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
  const [clubType, setClubType] = useState("프로그래밍");
  const [location, setLocation] = useState<LocationType>("인사캠");
  const [recruitType, setRecruitType] = useState<RecruitType>("상시모집");
  const navigate = useNavigate();

  const { mutate } = useMutation(
    () => createClub({ name, location, type: { name: clubType }, recruitType }),
    {
      //need to fix
      onSuccess: (data) => {
        // console.log(data);
        alert("새 동아리 신청이 성공적으로 접수 되었습니다!");
        navigate("/");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
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

  const handleClubTypeChange = (event: SelectChangeEvent) => {
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

  const [value, setValue] = useState<string>("");
  const [tags, setTags] = useState<TagType[]>([]);

  const { data } = useQuery<TagType[]>("getAllClubs", getAllClubTypes, {
    onSuccess: (data) => {
      // console.log(data);
      setTags(data);
      setValue(data[0].name);
    },
    onError: (error: any) => alert(error.response.data.error),
  });

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
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={clubType}
            label="Age"
            sx={{ width: "40%" }}
            onChange={handleClubTypeChange}
          >
            {tags.length > 0 &&
              tags.map((tag) => (
                <MenuItem key={tag._id} value={tag.name}>
                  {tag.name}
                </MenuItem>
              ))}
          </Select>
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
          sx={{
            position: "absolute",
            right: "40px",
            bottom: "40px",
            fontSize: "20px",
          }}
          type="submit"
          variant="outlined"
          color="success"
        >
          submit
        </Button>
      </ApplyClubPageContainer>
    </>
  );
}

export default ApplyClubPage;
