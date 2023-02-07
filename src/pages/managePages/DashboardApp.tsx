import {
  Grid,
  Container,
  Typography,
  CardHeader,
  Card,
  Box,
} from "@mui/material";
import AppWidgetSummary from "../../components/dashboardApp/AppWidgetSummary";
import AppWebsiteVisits from "../../components/dashboardApp/AppWebsiteVisits";
import { useRecoilValue } from "recoil";
import { currentClubInfoState } from "../../atoms/utilAtom";
import { useQuery } from "react-query";
import { RegisteredClubType, UserType } from "../../types/user";
import { useParams } from "react-router-dom";
import { getAppliedUserByClubID } from "../../utils/fetch/fetchApply";
import { AppliedUserType } from "../../types/apply";
import { useEffect, useState } from "react";
import { ToDoType } from "../../types/todo";
import AppConversionRates from "../../components/dashboardApp/AppConversionRates";
import StringColumnChart from "../../components/dashboardApp/StringColumnChart";
import BooleanColumnChart from "../../components/dashboardApp/BooleanColumnChart";
import {
  calculateMonthTodos,
  calculateTodayTodos,
  makeChartData,
  studentIDData,
  studentIDExample,
  studentMajorData,
} from "../../utils/makeChartData";
import { getClubMembers } from "../../utils/fetch/fetchUser";
import { getTodosByClubID } from "../../utils/fetch/fetchTodo";

export default function DashboardApp() {
  const currentClubInfo = useRecoilValue(currentClubInfoState);
  const { clubID } = useParams();

  const [stringColumnsData, setStringColumnsData] = useState(
    new Map<string, string[]>()
  );
  const [numberColumnsData, setNumberColumnsData] = useState(
    new Map<string, string[]>()
  );
  const [booleanColumnsData, setBooleanColumnsData] = useState(
    new Map<string, string[]>()
  );

  const { data: clubMembersData } = useQuery<UserType[]>(
    "getClubMembers",
    () => getClubMembers(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const tempStringColumns = new Map();
    const tempNumberColumns = new Map();
    const tempBooleanColumns = new Map();

    if (currentClubInfo) {
      if (clubMembersData) {
        clubMembersData.forEach((member) => {
          Object.values(member.registeredClubs).forEach(
            (club: RegisteredClubType) => {
              if (club.clubId === currentClubInfo._id) {
                club.moreColumns.forEach((col) => {
                  if (col.column.valueType === "string") {
                    if (tempStringColumns.get(col.column.key)) {
                      tempStringColumns.set(col.column.key, [
                        ...tempStringColumns.get(col.column.key),
                        col.value,
                      ]);
                    } else {
                      tempStringColumns.set(col.column.key, [col.value]);
                    }
                  } else if (col.column.valueType === "number") {
                    if (tempNumberColumns.get(col.column.key)) {
                      tempNumberColumns.set(col.column.key, [
                        ...tempNumberColumns.get(col.column.key),
                        col.value,
                      ]);
                    } else {
                      tempNumberColumns.set(col.column.key, [col.value]);
                    }
                  } else if (col.column.valueType === "boolean") {
                    if (tempBooleanColumns.get(col.column.key)) {
                      tempBooleanColumns.set(col.column.key, [
                        ...tempBooleanColumns.get(col.column.key),
                        col.value,
                      ]);
                    } else {
                      tempBooleanColumns.set(col.column.key, [col.value]);
                    }
                  }
                });
              }
            }
          );
        });
        setStringColumnsData(tempStringColumns);
        setNumberColumnsData(tempNumberColumns);
        setBooleanColumnsData(tempBooleanColumns);
      }
    }
  }, [currentClubInfo, clubMembersData]);

  const { data: appliedUsersData } = useQuery<AppliedUserType[]>(
    "getAppliedUserByClubID",
    () => getAppliedUserByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: todoData } = useQuery<ToDoType[]>(
    "getTodosByClubID",
    () => getTodosByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" sx={{ mb: 5, color: "#000069" }}>
        동아리 정보를 한눈에, 대시보드
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="동아리원 수"
            total={
              clubMembersData ? clubMembersData.length : "확인할 수 없습니다."
            }
            icon={"ic:round-people-alt"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="지원자 수"
            total={
              appliedUsersData ? appliedUsersData.length : "확인할 수 없습니다."
            }
            color="info"
            icon={"material-symbols:accessibility-new"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="오늘 일정"
            total={
              todoData ? calculateTodayTodos(todoData) : "확인할 수 없습니다."
            }
            color="warning"
            icon={"ri:todo-fill"}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="이번달 남은 일정"
            total={
              todoData ? calculateMonthTodos(todoData) : "확인할 수 없습니다."
            }
            color="error"
            icon={"ri:calendar-todo-fill"}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={12}>
          <AppWebsiteVisits
            title="학번 분포"
            subheader="동아리원들의 학번 분포 그래프"
            chartLabels={
              clubMembersData
                ? studentIDExample(clubMembersData)
                : ["16", "17", "18", "19", "20", "21", "22", "23"]
            }
            chartData={[
              {
                name: "학번",
                type: "area",
                fill: "gradient",
                data: clubMembersData
                  ? studentIDData(clubMembersData)
                  : [1, 3, 5, 2, 4, 1, 1],
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={12}>
          <AppConversionRates
            title="학과 분포"
            subheader="동아리원들의 학과 분포 그래프"
            chartData={
              clubMembersData
                ? studentMajorData(clubMembersData)
                : [
                    { label: "Italy", value: 400 },
                    { label: "Japan", value: 430 },
                    { label: "China", value: 448 },
                    { label: "Canada", value: 470 },
                    { label: "France", value: 540 },
                    { label: "Germany", value: 580 },
                    { label: "South Korea", value: 690 },
                    { label: "Netherlands", value: 1100 },
                    { label: "United States", value: 1200 },
                    { label: "United Kingdom", value: 1380 },
                  ]
            }
          />
        </Grid>

        {stringColumnsData.size > 0
          ? Array.from(stringColumnsData).map(([key, value]) => {
              const obj = makeChartData(key, value);

              return (
                <Grid key={key} item xs={12} sm={6} md={6}>
                  <Card>
                    <CardHeader title={key} />
                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                      <StringColumnChart
                        name={key}
                        data={Object.values(obj)}
                        categories={Object.keys(obj)}
                      />
                    </Box>
                  </Card>
                </Grid>
              );
            })
          : null}

        {numberColumnsData.size > 0
          ? Array.from(numberColumnsData).map(([key, value]) => {
              const obj = makeChartData(key, value);

              return (
                <Grid key={key} item xs={12} sm={6} md={6}>
                  <AppWebsiteVisits
                    title={key}
                    subheader=""
                    chartLabels={Object.keys(obj)}
                    chartData={[
                      {
                        name: key,
                        type: "area",
                        fill: "gradient",
                        data: Object.values(obj),
                      },
                    ]}
                  />
                </Grid>
              );
            })
          : null}

        {booleanColumnsData.size > 0
          ? Array.from(booleanColumnsData).map(([key, value]) => {
              const obj = makeChartData(key, value);

              return (
                <Grid key={key} item xs={12} sm={6} md={6}>
                  <Card>
                    <CardHeader title={key} />
                    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                      <BooleanColumnChart
                        series={Object.values(obj)}
                        labels={Object.keys(obj)}
                      />
                    </Box>
                  </Card>
                </Grid>
              );
            })
          : null}
      </Grid>
    </Container>
  );
}
