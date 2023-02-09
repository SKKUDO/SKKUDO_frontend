import { useState } from "react";
import { useParams } from "react-router-dom";

import {
  styled,
  Select,
  MenuItem,
  FormControl,
  TextField,
  InputLabel,
  Button,
} from "@mui/material";
import { addClubUserColumn } from "../../../utils/fetch/fetchClub";

import { ColumnType, NewColumnType } from "../../../types/common";

type ValueType = "string" | "number" | "boolean";

const MainWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "20px",
  marginBottom: "20px",
});

export default function ColumnCreate() {
  const [columnForm, setColumnForm] = useState<NewColumnType>({
    key: "",
    valueType: "string",
  });
  const clubId = useParams().clubID as string;

  const handleButtonClick = () => {
    if (columnForm.key.length === 0) {
      alert("생성하고자 하는 열의 값이 비어있습니다.");
    } else {
      addClubUserColumn(clubId, columnForm)
        .then(() => {
          alert("열을 추가했습니다.");
        })
        .catch((error) => alert(error.response.data.error));
    }
  };

  return (
    <>
      <MainWrapper>
        <FormControl>
          <TextField
            label="열이름"
            color="success"
            margin="dense"
            onChange={(e) => {
              setColumnForm({ ...columnForm, key: e.target.value });
            }}
          ></TextField>
        </FormControl>
        <div
          style={{ width: "200px", marginTop: "10px", marginBottom: "10px" }}
        >
          <FormControl fullWidth>
            <InputLabel color="success" id="demo-simple-select-label">
              해당 열의 형식
            </InputLabel>
            <Select
              value={columnForm.valueType}
              color="success"
              id="demo-simple-select"
              label="열 형식"
              margin="dense"
              onChange={(e) =>
                setColumnForm({
                  ...columnForm,
                  valueType: e.target.value as ValueType,
                })
              }
            >
              <MenuItem value={"string"}>문자</MenuItem>
              <MenuItem value={"number"}>숫자</MenuItem>
              <MenuItem value={"boolean"}>O/X</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          color="success"
          variant="contained"
          onClick={() => handleButtonClick()}
        >
          열 생성하기
        </Button>
      </MainWrapper>
    </>
  );
}
