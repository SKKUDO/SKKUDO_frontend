import styled from "@emotion/styled";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { ClubType } from "../types/club";

interface ClubTagProps {
  clubs: ClubType[] | undefined;
  usingItems: any[];
  setItems: (values: any[]) => void;
}

const MainWrapper = styled("div")({
  // marginTop: "40px",
  // marginBottom: "0",
  // height: "50px",
});

export default function ClubTag({ clubs, usingItems, setItems }: ClubTagProps) {
  const [value, setValue] = useState<string>("전체");
  return clubs ? (
    <MainWrapper>
      <FormControl sx={{ m: 1, minWidth: 100 }} color="success">
        <InputLabel id="demo-simple-select-helper-label">Filter</InputLabel>
        <Select
          sx={{ height: "13%", fontSize: "30%" }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label="Age"
          onChange={(e) => {
            console.log(usingItems);
            setValue(e.target.value);
            if (e.target.value === "전체") {
              setItems(usingItems);
              return;
            }
            setItems(
              usingItems.filter((item) => {
                console.log(item);
                return item.clubId === e.target.value;
              })
            );
          }}
        >
          <MenuItem value={"전체"}>전체</MenuItem>
          {clubs.length > 0 &&
            clubs.map((clubs) => (
              <MenuItem key={clubs._id} value={clubs.name}>
                {clubs.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </MainWrapper>
  ) : (
    <></>
  );
}
