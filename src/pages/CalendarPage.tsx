import styled from "styled-components";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import "./CustomCalendarStyle.css";
import moment from "moment";
import ClubDetailHeader from "../components/ClubDetailHeader";
import FilterTag from "../components/FilterTag";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ToDoType } from "../types/todo";
import DayDetailBoard from "../components/calendar/DayDetailBoard";
import TodoCategoryDialog from "../components/calendar/TodoCategoryDialog";
import { useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { dayDetailState } from "../atoms/calendarAtom";
import {
  getTodosByClubID,
  getTodoTagsByClubID,
} from "../utils/fetch/fetchTodo";

const CalendarContainer = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled("div")({
  position: "relative",
  display: "flex",
  maxWidth: "80%",
  margin: "0 auto",
  justifyContent: "flex-end",
  flexDirection: "row",
  gap: "20px",
  marginTop: "40px",
  marginBottom: "10px",
});

const AddCategoryBtn = styled(motion.button)({
  backgroundColor: "transparent",
  color: "#000069",
  fontWeight: "600",
  marginLeft: "10px",
  marginBottom: "0px",
  height: "50px",
  width: "120px",
  border: "2px solid",
  borderRadius: "10px",
  fontSize: "calc(12px+ 1vw)",
  marginTop: "8px",
});

export interface IDayDetailOverlay {
  isDayDetailOpened: boolean;
}

interface TagType {
  _id: string;
  clubId: string | undefined;
  name: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

const FilterWrapper = styled.div`
  position: absolute;
  left: 0;
`;

const DayDetailOverlay = styled.div<IDayDetailOverlay>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isDayDetailOpened ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin: 0 auto;
`;

function CalendarPage() {
  const [value, onChange] = useState(new Date());
  const [tags, setTags] = useState<TagType[]>([]);
  const { clubID } = useParams();
  const [mark, setMark] = useState<string[]>(["2022-10-02", "2022-10-23"]);

  const setDayDetail = useSetRecoilState(dayDetailState);

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const handleClose = () => {
    setIsCategoryDialogOpen(false);
  };

  const handlClickOpen = () => {
    setIsCategoryDialogOpen(true);
  };

  const { data } = useQuery<ToDoType[]>(
    "getTodosByClubID",
    () => getTodosByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
        setUsingTodos(data);
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const handleDayClick = (value: Date) => {
    const selectedDate = moment(value).format("YYYY-MM-DD");
    const selectedTodos: ToDoType[] = [];
    if (data) {
      data.forEach((todo) => {
        if (moment(todo.date).format("YYYY-MM-DD") === selectedDate) {
          selectedTodos.push(todo);
        }
      });
    }
    setDayDetail(selectedTodos);
    setIsDayDetailOpened((prev) => !prev);
  };

  const [isDayDetailOpened, setIsDayDetailOpened] = useState(false);
  const [usingTodos, setUsingTodos] = useState<ToDoType[]>([]);

  useEffect(() => {
    const newMark: string[] = [];
    usingTodos.map((todo) =>
      newMark.push(moment(todo.date).format("YYYY-MM-DD"))
    );
    setMark(newMark);
  }, [usingTodos]);

  useEffect(() => {
    getTodoTagsByClubID(clubID ? clubID : "").then((tags) => setTags(tags));
  }, [clubID]);
  return (
    <>
      <ClubDetailHeader pageType="일정" />

      <Header>
        <FilterWrapper>
          <FilterTag
            tags={tags}
            usingItems={data ? data : []}
            setItems={setUsingTodos}
            isClub={false}
          />
        </FilterWrapper>
        <AddCategoryBtn
          whileHover={{
            backgroundColor: "#000069",
            color: "#FFFFFF",
            border: "1px solid #FFFFFF",
          }}
          onClick={handlClickOpen}
        >
          카테고리 추가
        </AddCategoryBtn>
      </Header>

      <TodoCategoryDialog open={isCategoryDialogOpen} onClose={handleClose} />
      <CalendarContainer>
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDayClick}
          formatDay={(locale, date) => moment(date).format("DD")}
          tileContent={({ date, view }) => {
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return <Dot></Dot>;
            } else {
              return <div></div>;
            }
          }}
        />
      </CalendarContainer>
      <DayDetailOverlay
        isDayDetailOpened={isDayDetailOpened}
        onClick={() => setIsDayDetailOpened(false)}
      ></DayDetailOverlay>
      <DayDetailBoard
        date={value}
        isDayDetailOpened={isDayDetailOpened}
      ></DayDetailBoard>
    </>
  );
}

export default CalendarPage;
