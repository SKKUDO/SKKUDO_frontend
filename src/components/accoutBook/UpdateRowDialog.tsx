import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { BudgetRowType, NewBudgetRowType } from "../../types/budget";
import { useMutation, useQueryClient } from "react-query";
import { updateBudgetRow } from "../../utils/fetch/fetchBudget";
import { useParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers";

interface UpdateRowDialogType {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  rowIndex: number;
  row: BudgetRowType;
  budgetID: string;
}

interface NewRowType {
  income: string;
  expense: string; //지출
  whom: string; //Who/m
  content: string; //내용
  balance: string; //잔액
  note: string; //비고
  account: string; //사용계좌
}

interface MutateType {
  rowIndex: number;
  budgetRowInfo: NewBudgetRowType;
}

export default function UpdateRowDialog({
  dialogOpen,
  setDialogOpen,
  rowIndex,
  row,
  budgetID,
}: UpdateRowDialogType) {
  const { clubID } = useParams();
  const [newRow, setNewRow] = React.useState<NewBudgetRowType>({
    date: row.date,
    income: row.income,
    expense: row.expense, //지출
    whom: row.whom, //Who/m
    content: row.content, //내용
    balance: row.balance, //잔액
    note: row.note, //비고
    account: row.account, //사용계좌
    clubId: clubID || "",
  });
  // console.log(clubID);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ({ rowIndex, budgetRowInfo }: MutateType) =>
      updateBudgetRow(rowIndex, budgetID, budgetRowInfo),
    {
      onSuccess: (data) => {
        // console.log(data);
        alert("가계부가 수정되었습니다");
        queryClient.invalidateQueries("getBudgetsByClubID");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setNewRow({
      ...newRow,
      [id]: value,
    });
  };

  const handleDateChange = (newDate: Date | null) => {
    // setDate(moment(newDate).format("YYYY-MM-DD"));
    // console.log(moment(newDate).format("YYYY-MM-DD"));
    if (newDate) {
      setNewRow({
        ...newRow,
        date: newDate,
      });
    }
  };

  const handleNewRowSubmit = () => {
    mutate({
      rowIndex,
      budgetRowInfo: newRow,
    });
    handleClose();
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose} fullWidth>
      <DialogTitle>가계부 수정</DialogTitle>
      <DialogContent>
        <DesktopDatePicker
          label="날짜 선택"
          inputFormat="MM/DD/YYYY"
          value={newRow.date}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField {...params} sx={{ marginTop: "40px", width: "100%" }} />
          )}
        />
        <TextField
          autoFocus
          margin="dense"
          id="income"
          label="수입"
          fullWidth
          value={newRow.income}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="expense"
          label="지출"
          fullWidth
          value={newRow.expense}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="whom"
          label="누가"
          fullWidth
          value={newRow.whom}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="content"
          label="내용"
          fullWidth
          value={newRow.content}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="balance"
          label="잔액"
          fullWidth
          value={newRow.balance}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="account"
          label="계좌번호"
          fullWidth
          value={newRow.account}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="note"
          label="메모"
          fullWidth
          // variant="standard"
          value={newRow.note}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleNewRowSubmit}>수정</Button>
      </DialogActions>
    </Dialog>
  );
}
