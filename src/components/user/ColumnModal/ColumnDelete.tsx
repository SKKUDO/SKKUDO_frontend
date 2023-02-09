import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getOneClub,
  deleteClubUserColumn,
} from "../../../utils/fetch/fetchClub";
import {
  styled,
  Select,
  MenuItem,
  FormControl,
  Button,
  InputLabel,
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

export default function ColumnDelete() {
  const [deletingColumn, setDeletingColumn] = useState<string>("");
  const [userColumns, setUserColumns] = useState<ColumnType[]>([]);
  const clubId: string = useParams().clubID as string;
  useEffect(() => {
    getOneClub(clubId).then(({ userColumns }) => setUserColumns(userColumns));
  }, []);

  const handleSubmit = () => {
    if (deletingColumn.length === 0) {
      alert("삭제할 열을 선택하세요.");
    } else {
      deleteClubUserColumn(clubId, deletingColumn)
        .then(() => {
          alert("열을 삭제했습니다.");
        })
        .catch((error) => alert(error.response.data.error));
    }
  };

  return (
    <MainWrapper>
      <FormControl fullWidth>
        <InputLabel color="success" id="demo-simple-select-label">
          삭제할 열 선택
        </InputLabel>
        <Select
          value={deletingColumn}
          color="success"
          id="demo-simple-select"
          label="열 형식"
          margin="dense"
          onChange={(e) => setDeletingColumn(e.target.value)}
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
      <ButtonWrapper>
        <Button
          color="success"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          열 삭제
        </Button>
      </ButtonWrapper>
    </MainWrapper>
  );
}
