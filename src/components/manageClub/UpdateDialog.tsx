import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilValue } from "recoil";
import { clubUpdateState } from "../../atoms/alertAtom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocationType } from "../../types/common";
import { RecruitType, UpdateClubInfoType } from "../../types/club";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { updateClub } from "../../utils/fetch/fetchClub";
import { currentClubInfoState } from "../../atoms/utilAtom";
import { getAllClubTypes } from "../../utils/fetch/fetchClub";

interface UpdateDialogType {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProperInputType {
  keyword: string;
  handleClose: () => void;
}

interface TagType {
  _id: string;
  clubId: string | undefined;
  name: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

function ProperInput({ keyword, handleClose }: ProperInputType) {
  const { clubID } = useParams();
  const queryClient = useQueryClient();
  const currentClubInfo = useRecoilValue(currentClubInfoState);

  const [name, setName] = React.useState("변경할 이름");
  const [newType, setNewType] = React.useState("");
  const [location, setLocation] = React.useState<LocationType>("인사캠");
  const [recruitType, setRecruitType] = React.useState<RecruitType>("정규모집");
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    if (currentClubInfo) {
      if (keyword === "name") {
        setName(currentClubInfo.name);
      } else if (keyword === "typeName") {
        setNewType(currentClubInfo.type.name);
      } else if (keyword === "location") {
        setLocation(currentClubInfo.location);
      } else if (keyword === "recruitType") {
        setRecruitType(currentClubInfo.recruitType);
      } else if (keyword === "recruitStart") {
      } else if (keyword === "recruitEnd") {
      } else {
        alert("키워드 에러");
      }
    }
    // console.log(currentClubInfo);
  }, []);

  const { data: clubTypeData } = useQuery<TagType[]>(
    "getAllClubTypes",
    getAllClubTypes,
    {
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    setName(event.target.value);
  };

  const handleLocationChange = (event: SelectChangeEvent<LocationType>) => {
    event.preventDefault();
    setLocation(event.target.value as LocationType);
  };

  const handleClubTypeChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setNewType(event.target.value);
    console.log(newType);
  };

  const handleRecruitTypeChange = (event: SelectChangeEvent<RecruitType>) => {
    event.preventDefault();
    setRecruitType(event.target.value as RecruitType);
  };

  const handleDateChange = (newValue: Date | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const { mutate } = useMutation(
    (updateInfo: UpdateClubInfoType) => updateClub(clubID || "", updateInfo),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getOneClub");
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const handleUpdateSubmit = () => {
    if (keyword === "name") {
      mutate({ name });
    } else if (keyword === "typeName") {
      mutate({ type: { name: newType } });
    } else if (keyword === "location") {
      mutate({ location });
    } else if (keyword === "recruitType") {
      mutate({ recruitType });
    } else if (keyword === "recruitStart") {
      mutate({ recruitStart: date });
    } else if (keyword === "recruitEnd") {
      mutate({ recruitEnd: date });
    } else {
      alert("키워드 에러");
    }
    handleClose();
  };

  if (keyword === "name") {
    return (
      <>
        <DialogContent style={{ width: "512px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="새로운 설정"
            fullWidth
            variant="standard"
            value={name}
            sx={{ marginTop: "20px", fontSize: "30px", color: "#000069" }}
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            취소
          </Button>
          <Button onClick={handleUpdateSubmit} color="success">
            수정
          </Button>
        </DialogActions>
      </>
    );
  } else if (keyword === "typeName") {
    return (
      <DialogContent style={{ width: "512px" }}>
        <FormControl fullWidth sx={{ marginTop: "20px" }}>
          <InputLabel id="recruitType">주제</InputLabel>
          <Select
            value={newType}
            label="동아리 주제"
            onChange={handleClubTypeChange}
          >
            <MenuItem value="" disabled sx={{ display: "none" }}>
              <em>-</em>
            </MenuItem>
            {clubTypeData ? (
              clubTypeData.map((type) => (
                <MenuItem key={type._id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))
            ) : (
              <div>데이터를 불러오는 과정에서 오류가 발생했습니다</div>
            )}
          </Select>
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            취소
          </Button>
          <Button onClick={handleUpdateSubmit} color="success">
            수정
          </Button>
        </DialogActions>
      </DialogContent>
    );
  } else if (keyword === "location") {
    return (
      <>
        <DialogContent style={{ width: "512px" }}>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel id="location">소속 지역</InputLabel>
            <Select
              value={location}
              label="소속 지역"
              onChange={handleLocationChange}
            >
              <MenuItem value={"자과캠"}>자과캠</MenuItem>
              <MenuItem value={"인사캠"}>인사캠</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            취소
          </Button>
          <Button onClick={handleUpdateSubmit} color="success">
            수정
          </Button>
        </DialogActions>
      </>
    );
  } else if (keyword === "recruitType") {
    return (
      <>
        <DialogContent style={{ width: "512px" }}>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel id="recruitType">모집방식</InputLabel>
            <Select
              value={recruitType}
              label="모집 방식"
              onChange={handleRecruitTypeChange}
            >
              <MenuItem value={"정규모집"}>정규모집</MenuItem>
              <MenuItem value={"상시모집"}>상시모집</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            취소
          </Button>
          <Button onClick={handleUpdateSubmit} color="success">
            수정
          </Button>
        </DialogActions>
      </>
    );
  } else if (keyword === "recruitStart" || keyword === "recruitEnd") {
    return (
      <>
        <DialogContent style={{ width: "512px" }}>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            취소
          </Button>
          <Button onClick={handleUpdateSubmit} color="success">
            수정
          </Button>
        </DialogActions>
      </>
    );
  } else {
    return <div></div>;
  }
}

export default function UpdateDialog({
  dialogOpen,
  setDialogOpen,
}: UpdateDialogType) {
  const handleClose = () => {
    setDialogOpen(false);
  };

  const clubUpdate = useRecoilValue(clubUpdateState);

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle
        sx={{ fontSize: "30px", color: "#000069" }}
      >{`동아리 정보 변경`}</DialogTitle>
      <ProperInput
        keyword={clubUpdate.keyword}
        handleClose={handleClose}
      ></ProperInput>
    </Dialog>
  );
}
