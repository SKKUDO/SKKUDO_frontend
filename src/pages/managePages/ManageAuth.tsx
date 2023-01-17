import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AUTH_LABEL_LIST } from "../../constants/AuthManageContants";
import { useQuery } from "react-query";
import { ValidationKeyType, ValidationType } from "../../types/validation";
import { getValidatonByClubID } from "../../utils/fetch/fetchValidation";
import AlertDialog from "../../components/manageAuth/AuthConfirmAlert";
import { useSetRecoilState } from "recoil";
import { isAuthConfirmAlertOpenState } from "../../atoms/alertAtom";

export default function ManageAuth() {
  const [noticeRead, setNoticeRead] = useState("회장");
  const [noticeWrite, setNoticeWrite] = useState("회장");
  const [userRead, setUserRead] = useState("회장");
  const [userWrite, setUserWrite] = useState("회장");
  const [userColumnWrite, setUserColumnWrite] = useState("회장");
  const [todoRead, setTodoRead] = useState("회장");
  const [todoWrite, setTodoWrite] = useState("회장");
  const [applyRead, setApplyRead] = useState("회장");
  const [applyWrite, setApplyWrite] = useState("회장");
  const [validationRead, setValidationRead] = useState("회장");
  const [validationWrite, setValidationWrite] = useState("회장");
  const [clubRead, setClubRead] = useState("회장");
  const [clubWrite, setClubWrite] = useState("회장");
  const [tagWrite, setTagWrite] = useState("회장");
  const [budgetRead, setBudgetRead] = useState("회장");
  const [budgetWrite, setBudgetWrite] = useState("회장");
  const [appliedUserRead, setAppliesUserWrite] = useState("회장");
  const [appliedUserWrite, setAppliedUserWrite] = useState("회장");

  const navigate = useNavigate();

  const { clubID } = useParams();
  const { data, isLoading } = useQuery<ValidationType>(
    "getValidationByClubID",
    () => getValidatonByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
        navigate(-1);
      },
    }
  );
  const [selectedLabel, setSelectedLabel] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const returnSelectValue = (authKey: string) => {
    if (authKey === "noticeRead") {
      return noticeRead;
    } else if (authKey === "noticeWrite") {
      return noticeWrite;
    } else if (authKey === "userRead") {
      return userRead;
    } else if (authKey === "userWrite") {
      return userWrite;
    } else if (authKey === "userColumnWrite") {
      return userColumnWrite;
    } else if (authKey === "todoRead") {
      return todoRead;
    } else if (authKey === "todoWrite") {
      return todoWrite;
    } else if (authKey === "applyRead") {
      return applyRead;
    } else if (authKey === "applyWrite") {
      return applyWrite;
    } else if (authKey === "validationRead") {
      return validationRead;
    } else if (authKey === "validationWrite") {
      return validationWrite;
    } else if (authKey === "clubRead") {
      return clubRead;
    } else if (authKey === "clubWrite") {
      return clubWrite;
    } else if (authKey === "budgetRead") {
      return budgetRead;
    } else if (authKey === "budgetWrite") {
      return budgetWrite;
    } else if (authKey === "appliedUserRead") {
      return appliedUserRead;
    } else if (authKey === "appliedUserWrite") {
      return appliedUserWrite;
    } else if (authKey === "tagWrite") {
      return tagWrite;
    } else {
      return "";
    }
  };

  const setIsAuthConfirmAlertOpen = useSetRecoilState(
    isAuthConfirmAlertOpenState
  );
  const handleChange = (
    event: SelectChangeEvent,
    authLabel: string,
    authKey: string
  ) => {
    setSelectedLabel(authLabel);
    setSelectedKey(authKey);
    setSelectedValue(event.target.value);
    setIsAuthConfirmAlertOpen(true);
  };
  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          권한 관리
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          maxWidth: 1024,
          bgcolor: "background.paper",
          padding: "20px",
        }}
      >
        <List>
          {AUTH_LABEL_LIST.map((ele) => (
            <ListItem
              key={ele.key}
              sx={{ marginBottom: "50px", bgcolor: "whitesmoke" }}
              disablePadding
            >
              <ListItemButton sx={{ paddingLeft: "40px" }}>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "25px" }}
                  primary={ele.label}
                />
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">권한</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={
                        isLoading
                          ? returnSelectValue(ele.key)
                          : data![ele.key as ValidationKeyType]
                      }
                      label="권한"
                      // onChange={(event) => handleChange(event, ele.key)}
                      onChange={(event) =>
                        handleChange(event, ele.label, ele.key)
                      }
                    >
                      <MenuItem value={"회장"}>회장까지</MenuItem>
                      <MenuItem value={"부회장"}>부회장까지</MenuItem>
                      <MenuItem value={"운영진"}>운영진까지</MenuItem>
                      <MenuItem value={"부원"}>모든 사람이</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <AlertDialog
        selectedLabel={selectedLabel}
        selectedKey={selectedKey}
        selectedValue={selectedValue}
      />
    </Container>
  );
}
