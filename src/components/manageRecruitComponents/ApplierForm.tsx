import {
  Button,
  Card,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  ApplierType,
  NewAppliedUserColumnsType,
  NewApplierType,
  UpdateApplierType,
} from "../../types/apply";
import {
  createApplier,
  deleteApplier,
  getApplierByClubID,
  updateApplier,
} from "../../utils/fetch";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import { HiOutlineDocument, HiOutlineDocumentAdd } from "react-icons/hi";
import { TbSpeakerphone } from "react-icons/tb";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Iconify from "../Iconify";

function ApplierForm() {
  const { clubID } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [dialogType, setDialogType] = useState("");
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<ApplierType>(
    "getApplierByClubID",
    () => getApplierByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => console.log(error),
      retry: 1,
    }
  );

  const { mutate } = useMutation(
    (applierInfo: UpdateApplierType) =>
      updateApplier(clubID || "", applierInfo),
    {
      onSuccess: (data) => {
        // console.log(data);
        setNewQuestion("");
        queryClient.invalidateQueries("getApplierByClubID");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const { mutate: applierDeleteMutate } = useMutation(
    () => deleteApplier(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
        window.location.reload();
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const { mutate: applierCreateMutate } = useMutation(
    (newApplier: NewApplierType) => createApplier(newApplier),
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries("getApplierByClubID");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleApplierDeleteBtnClick = () => {
    applierDeleteMutate();
  };

  const handleApplierCreateBtnClick = () => {
    applierCreateMutate({
      clubId: clubID || "",
      documentQuestions: [],
      interviewQuestions: [],
      appliedUserColumns: [],
    });
  };

  const handleDeleteBtnClick = (key: string, idx: number) => {
    if (data) {
      if (key === "document") {
        const newQuestions = data.documentQuestions;
        newQuestions.splice(idx, 1);
        mutate({ documentQuestions: newQuestions });
      } else if (key === "interview") {
        const newQuestions = data.interviewQuestions;
        newQuestions.splice(idx, 1);
        mutate({ interviewQuestions: newQuestions });
      } else if (key === "more") {
        const newQuestions = data.appliedUserColumns;
        newQuestions.splice(idx, 1);
        mutate({ appliedUserColumns: newQuestions });
      }
    }
  };

  const handleAddBtnClick = (key: string) => {
    setDialogOpen(true);
    setDialogType(key);
  };

  const handleNewQuestionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewQuestion(event.target.value);
  };

  const handleNewQuestionSubmit = (key: string) => {
    if (data) {
      setDialogOpen(false);
      if (key === "document") {
        const newQuestions = data.documentQuestions;
        newQuestions.push(newQuestion);
        mutate({ documentQuestions: newQuestions });
      } else if (key === "interview") {
        const newQuestions = data.interviewQuestions;
        newQuestions.push(newQuestion);
        mutate({ interviewQuestions: newQuestions });
      } else if (key === "more") {
        const newQuestions: NewAppliedUserColumnsType[] =
          data.appliedUserColumns;
        newQuestions.push({ key: newQuestion, valueType: "string" });
        mutate({ appliedUserColumns: newQuestions });
      }
    }
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        sx={{ marginTop: "80px" }}
      >
        <Typography variant="h4" gutterBottom>
          모집 지원서 양식
        </Typography>

        {data ? (
          <Button
            variant="contained"
            // component={RouterLink}
            // to="#"
            onClick={handleApplierDeleteBtnClick}
            color="error"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            지원서 삭제하기
          </Button>
        ) : (
          <Button
            variant="contained"
            // component={RouterLink}
            // to="#"
            onClick={handleApplierCreateBtnClick}
            color="success"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            지원서 생성하기
          </Button>
        )}
      </Stack>
      {data ? (
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              모집 지원서 항목
            </ListSubheader>
          }
        >
          {isLoading ? (
            <div></div>
          ) : (
            <>
              <ListItemButton>
                <ListItemIcon>
                  <HiOutlineDocument />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "24px", fontWeight: 700 }}
                  primary="서류 질문"
                />
                <MdExpandMore />
              </ListItemButton>
              <Collapse in={true} timeout="auto" unmountOnExit>
                {data?.documentQuestions.map((q, idx) => (
                  <List key={q} component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemText
                        disableTypography
                        sx={{ fontSize: "20px" }}
                        primary={q}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteBtnClick("document", idx)}
                      >
                        삭제
                      </Button>
                    </ListItem>
                  </List>
                ))}
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4 }}>
                    <Button
                      variant="outlined"
                      sx={{ width: "100%" }}
                      onClick={() => handleAddBtnClick("document")}
                    >
                      질문 추가하기
                    </Button>
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton>
                <ListItemIcon>
                  <HiOutlineDocumentAdd />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "24px", fontWeight: 700 }}
                  primary="추가 질문"
                />
                <MdExpandMore />
              </ListItemButton>
              <Collapse in={true} timeout="auto" unmountOnExit>
                {data?.appliedUserColumns.map((column, idx) => (
                  <List key={column._id} component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemText
                        primary={column.key}
                        disableTypography
                        sx={{ fontSize: "20px" }}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteBtnClick("more", idx)}
                      >
                        삭제
                      </Button>
                    </ListItem>
                  </List>
                ))}
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4 }}>
                    <Button
                      variant="outlined"
                      sx={{ width: "100%" }}
                      onClick={() => handleAddBtnClick("more")}
                    >
                      질문 추가하기
                    </Button>
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton>
                <ListItemIcon>
                  <TbSpeakerphone />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "24px", fontWeight: 700 }}
                  primary="면접 질문"
                />
                <MdExpandMore />
              </ListItemButton>
              <Collapse in={true} timeout="auto" unmountOnExit>
                {data?.interviewQuestions.map((q, idx) => (
                  <List key={q} component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                      <ListItemText
                        primary={q}
                        disableTypography
                        sx={{ fontSize: "20px" }}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteBtnClick("interview", idx)}
                      >
                        삭제
                      </Button>
                    </ListItem>
                  </List>
                ))}
                <List component="div" disablePadding>
                  <ListItem sx={{ pl: 4 }}>
                    <Button
                      variant="outlined"
                      sx={{ width: "100%" }}
                      onClick={() => handleAddBtnClick("interview")}
                    >
                      질문 추가하기
                    </Button>
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>질문 추가하기</DialogTitle>
            <DialogContent style={{ width: "512px" }}>
              <DialogContentText>
                추가하고 싶은 질문을 적어주세요
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="question"
                fullWidth
                variant="standard"
                value={newQuestion}
                onChange={handleNewQuestionChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>취소</Button>
              <Button onClick={() => handleNewQuestionSubmit(dialogType)}>
                추가
              </Button>
            </DialogActions>
          </Dialog>
        </List>
      ) : (
        <div>지원서가 없습니다! 새로 생성하세요</div>
      )}
    </>
  );
}

export default ApplierForm;
