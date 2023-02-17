import styled from "@emotion/styled";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

interface TagType {
  _id: string;
  clubId: string | undefined;
  name: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

interface FilterTagProps {
  tags: TagType[];
  usingItems: any[];
  setItems: (values: any[]) => void;
  isClub: boolean;
}

const MainWrapper = styled("div")({
  // marginTop: "40px",
  // marginBottom: "0",
  // height: "50px",
});

export default function FilterTag({
  tags,
  usingItems,
  setItems,
  isClub,
}: FilterTagProps) {
  const [value, setValue] = useState<string>("전체");
  return (
    <FormControl sx={{ minWidth: 100 }} color="success">
      <InputLabel id="demo-simple-select-helper-label">Filter</InputLabel>
      <Select
        sx={{ height: "13%", fontSize: "30%" }}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        label="Age"
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === "전체") {
            setItems(usingItems);
            return;
          }
          if (isClub) {
            setItems(
              usingItems.filter((item) => item.type.name === e.target.value)
            );
          } else {
            setItems(
              usingItems.filter((item) => {
                const tags = item.noticeTags ? item.noticeTags : item.tags;
                return tags.indexOf(e.target.value) !== -1;
              })
            );
          }
        }}
      >
        <MenuItem value={"전체"}>전체</MenuItem>
        {tags.length > 0 &&
          tags.map((tag) => (
            <MenuItem key={tag._id} value={tag.name}>
              {tag.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
