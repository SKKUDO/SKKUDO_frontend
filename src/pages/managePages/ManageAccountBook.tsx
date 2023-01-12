import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  createBudget,
  deleteBudget,
  getBudgetsByClubID,
  updateBudgetRow,
} from "../../utils/fetch/fetchBudget";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  BudgetType,
  NewBudgetRowType,
  NewBudgetType,
} from "../../types/budget";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import AccountRow from "../../components/accoutBook/AccountRow";
import csvDownload from "json-to-csv-export";

const AccountBookPageContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const DeleteBtn = styled(Button)({
  float: "right",
  fontSize: "20px",
  marginBottom: "50px",
  marginLeft: "20px",
});

interface MutateType {
  rowIndex: number;
  budgetRowInfo: NewBudgetRowType;
}

const NewRowBtn = styled(Button)({
  // widht: "100%",
});

function ManageAccountBook() {
  const { clubID } = useParams();
  const queryClient = useQueryClient();
  const [nameDialogOpen, setNameDialogOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleClose = () => {
    setNameDialogOpen(false);
  };

  const { data, isLoading } = useQuery<BudgetType>(
    "getBudgetsByClubID",
    () => getBudgetsByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  const downloadCSV = async () => {
    const dataToConvert = {
      data: data ? data.rows : [],
      filename: "가계부",
      delimiter: ",",
      headers: [
        "날짜",
        "수입",
        "지출",
        "누가",
        "내용",
        "잔고",
        "메모",
        "계좌번호",
        "ID",
      ],
    };
    await csvDownload(dataToConvert);
    window.location.reload();
  };

  const { mutate: deleteBudgetMutate } = useMutation(
    () => deleteBudget(data?._id || "", clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
        alert("가계부가 삭제되었습니다.");
        window.location.reload();
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const { mutate: createBudgetMutate } = useMutation(
    (newBudgetInfo: NewBudgetType) => createBudget(newBudgetInfo),
    {
      onSuccess: (data) => {
        // console.log(data);
        alert("가계부가 성공적으로 생성되었습니다!");
        window.location.reload();
        // queryClient.invalidateQueries("getBudgetByClubID");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const { mutate: updateRowMutate } = useMutation(
    ({ rowIndex, budgetRowInfo }: MutateType) =>
      updateBudgetRow(rowIndex, data?._id || "", budgetRowInfo),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getBudgetsByClubID");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const handleNewRowBtnClick = () => {
    if (data) {
      updateRowMutate({
        rowIndex: data.rows.length,
        budgetRowInfo: {
          date: new Date(), //날짜
          clubId: clubID || "",
          income: "0", //수입
          expense: "0", //지출
          whom: "이름", //Who/m
          content: "주 내용", //내용
          balance: "0", //잔액
          note: "메모", //비고
          account: "계좌 번호",
        },
      });
    }
  };

  const handleDeleteBtnClick = () => {
    if (data) {
      deleteBudgetMutate();
    } else {
      alert("예상치 못한 오류가 발생했습니다!");
    }
  };

  const handleCreateBtnClick = () => {
    if (clubID) {
      createBudgetMutate({
        clubId: clubID,
        name: newName,
        rows: [
          {
            date: new Date(), //날짜
            income: "0", //수입
            expense: "0", //지출
            whom: "이름", //Who/m
            content: "주 내용", //내용
            balance: "0", //잔액
            note: "메모", //비고
            account: "계좌 번호",
          },
        ],
      });
    }
  };

  return (
    <AccountBookPageContainer>
      {data ? //   color="error" // <DeleteBtn
      //   variant="contained"
      //   onClick={handleDeleteBtnClick}
      // >
      //   가계부 삭제
      // </DeleteBtn>
      null : (
        <DeleteBtn
          color="success"
          variant="contained"
          onClick={() => setNameDialogOpen(true)}
        >
          새 가계부 생성
        </DeleteBtn>
      )}
      <DeleteBtn variant="contained" onClick={downloadCSV}>
        Export to CSV
      </DeleteBtn>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontSize: "24px", color: "#000069" }}>
                날짜
              </TableCell>
              <TableCell
                sx={{ fontSize: "24px", color: "#000069" }}
                align="right"
              >
                수입
              </TableCell>
              <TableCell
                sx={{ fontSize: "24px", color: "#000069" }}
                align="right"
              >
                지출
              </TableCell>
              <TableCell
                sx={{ fontSize: "24px", color: "#000069" }}
                align="right"
              >
                누가
              </TableCell>
              <TableCell
                sx={{ fontSize: "24px", color: "#000069" }}
                align="right"
              >
                내용
              </TableCell>
              <TableCell
                sx={{ fontSize: "24px", color: "#000069" }}
                align="right"
              >
                잔액
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading
              ? null
              : data?.rows.map((row, index) => (
                  <AccountRow
                    key={row._id}
                    row={row}
                    rowIndex={index}
                    budgetID={data?._id}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NewRowBtn
        variant="outlined"
        color="success"
        onClick={handleNewRowBtnClick}
        sx={{ width: "100%", marginTop: "10px" }}
      >
        항목 추가
      </NewRowBtn>
      <Dialog open={nameDialogOpen} onClose={handleClose}>
        <DialogTitle sx={{ width: "600px" }}>새 가계부 이름</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleCreateBtnClick}>생성하기</Button>
        </DialogActions>
      </Dialog>
    </AccountBookPageContainer>
  );
}

export default ManageAccountBook;
