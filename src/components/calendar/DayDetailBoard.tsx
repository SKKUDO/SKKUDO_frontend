import styled from "styled-components";
import { IDayDetailOverlay } from "../../pages/CalendarPage";
import { MdOutlineAlarmAdd } from "react-icons/md";
import { useState } from "react";
import TodoAddDialog from "./TodoAddDialog";
import { useRecoilValue } from "recoil";
import { dayDetailState } from "../../atoms/calendarAtom";

import moment from "moment";
import { motion } from "framer-motion";
import { List, ListSubheader } from "@mui/material";
import DayItem from "./DayItem";

const BoardContainer = styled.div<IDayDetailOverlay>`
  position: fixed;
  top: 10%;
  transform: translateX(-50%);
  left: 50%;
  width: 100%;
  max-width: 70%;
  height: 80%;
  background-color: #e0e7e9;
  display: ${(props) => (props.isDayDetailOpened ? "flex" : "none")};
  flex-direction: column;
  border-radius: 10px;
  z-index: 10;
`;

const TodoAddBtn = styled.button`
  border: none;
  color: white;
  background-color: #1c3879;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  &:hover {
    color: #000069;
    background-color: transparent;
  }
`;

interface DayDetailBoardType {
  isDayDetailOpened: boolean;
  date: Date;
}

function DayDetailBoard({ isDayDetailOpened, date }: DayDetailBoardType) {
  const dayDetail = useRecoilValue(dayDetailState);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTodoAddBtnClick = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <BoardContainer isDayDetailOpened={isDayDetailOpened}>
      <TodoAddBtn onClick={handleTodoAddBtnClick}>
        <MdOutlineAlarmAdd size="3rem" />
      </TodoAddBtn>

      <List
        sx={{
          width: "100%",
          bgcolor: "#e0e7e9",
          padding: 0,
        }}
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            sx={{
              fontSize: {
                xs: "18px",
                lg: "30px",
              },
              width: "100%",
              padding: "20px",
              backgroundColor: "#e0e7e9",
              color: "#000069",
            }}
            component="div"
            id="nested-list-subheader"
          >
            {`${moment(date).format("YYYY-MM-DD")} 일정 목록`}
          </ListSubheader>
        }
      >
        {dayDetail.map((todo) => (
          <DayItem key={todo._id} todo={todo} setDialogOpen={setDialogOpen} />
        ))}
      </List>
      <TodoAddDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        date={date}
      />
    </BoardContainer>
  );
}

export default DayDetailBoard;
