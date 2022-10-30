import { Link as RouterLink, useParams } from "react-router-dom";
import { useState } from "react";
// material
import {
  Container,
  Stack,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AUTH_LABEL_LIST, AUTH_LIST } from "../../constants/AuthManageContants";
import { RoleType } from "../../types/common";
import { useQuery } from "react-query";
import { ValidationKeyType, ValidationType } from "../../types/validation";
import { getValidatonByClubID } from "../../utils/fetch";
import AlertDialog from "../../components/manageAuthComponents/AuthConfirmAlert";
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

  const { clubID } = useParams();
  const { data, isLoading } = useQuery<ValidationType>(
    "getValidationByClubID",
    () => getValidatonByClubID(clubID || "")
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
    } else {
      return noticeRead;
    }
  };

  // const handleChange = (event: SelectChangeEvent, authKey: string) => {
  //   // setAuth(event.target.value);
  //   if (authKey === "noticeRead") {
  //     setNoticeRead(event.target.value);
  //   } else if (authKey === "noticeWrite") {
  //     setNoticeWrite(event.target.value);
  //   } else if (authKey === "userRead") {
  //     setUserRead(event.target.value);
  //   } else if (authKey === "userWrite") {
  //     setUserWrite(event.target.value);
  //   } else if (authKey === "userColumnWrite") {
  //     setUserColumnWrite(event.target.value);
  //   } else if (authKey === "todoRead") {
  //     setTodoRead(event.target.value);
  //   } else if (authKey === "todoWrite") {
  //     setTodoWrite(event.target.value);
  //   } else if (authKey === "applyRead") {
  //     setApplyRead(event.target.value);
  //   } else if (authKey === "applyWrite") {
  //     setApplyWrite(event.target.value);
  //   } else if (authKey === "validationRead") {
  //     setValidationRead(event.target.value);
  //   } else if (authKey === "validationWrite") {
  //     setValidationWrite(event.target.value);
  //   } else if (authKey === "clubRead") {
  //     setClubRead(event.target.value);
  //   } else if (authKey === "clubWrite") {
  //     setClubWrite(event.target.value);
  //   } else {
  //     setNoticeRead(event.target.value);
  //   }
  // };

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
          "동아리 이름" 권한 관리
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
                <ListItemText primary={ele.label} />
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
