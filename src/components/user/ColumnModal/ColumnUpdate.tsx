import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getOneClub,
  updateClubUserColumn,
} from "../../../utils/fetch/fetchClub";
import {
  styled,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
  TextField,
} from "@mui/material";
import { ColumnType } from "../../../types/common";

const MainWrapper = styled("div")({
  width: "50%",
});

const ButtonWrapper = styled("div")({
  padding: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

interface UpdateFormType {
  key: string;
  newColumn: ColumnType;
}

const findByKey = (key: string, columns: ColumnType[]): ColumnType => {
  let using: ColumnType = { _id: "", key: "", valueType: "string" };
  columns.forEach((column) => {
    if (column.key === key) using = column;
  });
  return using;
};

export default function ColumnUpdate() {
  const [updateForm, setUpdateForm] = useState<UpdateFormType>({
    key: "",
    newColumn: { key: "", _id: "", valueType: "string" },
  });
  const [userColumns, setUserColumns] = useState<ColumnType[]>([]);
  const clubId: string = useParams().clubID as string;

  useEffect(() => {
    getOneClub(clubId).then(({ userColumns }) => {
      // console.log(userColumns);
      setUserColumns(userColumns);
    });
  }, []);

  const handleSubmit = () => {
    if (updateForm.newColumn.key.length === 0) alert("양식이 비어있습니다.");
    else {
      updateClubUserColumn(clubId, updateForm.key, updateForm.newColumn)
        .then(() => {
          alert("열을 수정했습니다.");
          window.location.reload();
        })
        .catch((error) => {
          // console.log(error);
          alert(error.response.data.error);
        });
    }
  };

  return (
    <MainWrapper>
      <FormControl fullWidth>
        <InputLabel color="success" id="demo-simple-select-label">
          수정할 열 선택
        </InputLabel>
        <Select
          value={updateForm.key}
          color="success"
          id="demo-simple-select"
          label="열 형식"
          margin="dense"
          onChange={(e) => {
            const usingColumn: ColumnType = findByKey(
              e.target.value,
              userColumns
            );
            setUpdateForm({ newColumn: usingColumn, key: e.target.value });
          }}
        >
          {userColumns.map((column: ColumnType, index: number) => {
            return (
              <MenuItem key={index} value={column.key}>
                {column.key}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          color="success"
          margin="dense"
          placeholder="바꿀이름"
          value={updateForm.newColumn.key}
          onChange={(e) => {
            setUpdateForm({
              ...updateForm,
              newColumn: { ...updateForm.newColumn, key: e.target.value },
            });
          }}
        ></TextField>
      </FormControl>
      <ButtonWrapper>
        <Button
          color="success"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          열 수정하기
        </Button>
      </ButtonWrapper>
    </MainWrapper>
  );
}
