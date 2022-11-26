import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Container,
  Typography,
  CardHeader,
  Card,
  Box,
} from "@mui/material";
import AppWidgetSummary from "../../components/dashboardAppComponents/AppWidgetSummary";
import AppTasks from "../../components/dashboardAppComponents/AppTasks";
import AppWebsiteVisits from "../../components/dashboardAppComponents/AppWebsiteVisits";
import { useRecoilValue } from "recoil";
import { currentClubInfoState } from "../../atoms/utilAtom";
import { useQuery } from "react-query";
import { RegisteredClubType, UserType } from "../../types/user";
import { useParams } from "react-router-dom";
import {
  getAppliedUserByClubID,
  getClubMembers,
  getTodosByClubID,
} from "../../utils/fetch";
import { AppliedUserType } from "../../types/apply";
import { useEffect, useState } from "react";
import { ToDoType } from "../../types/todo";
import moment from "moment";
import AppConversionRates from "../../components/dashboardAppComponents/AppConversionRates";
import ReactApexChart from "react-apexcharts";
import StringColumnChart from "../../components/dashboardAppComponents/StringColumnChart";
import BooleanColumnChart from "../../components/dashboardAppComponents/BooleanColumnChart";
// components
// import Page from '../components/Page';
// import Iconify from '../components/Iconify';
// sections
// import {
//   AppTasks,
//   AppNewsUpdate,
//   AppWebsiteVisits,
//   AppWidgetSummary,
//   AppConversionRates,
// } from '../sections/@dashboard/app';

export default function DashboardApp() {
  const theme = useTheme();
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
        console.log(data);
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
    console.log(currentClubInfo);
    // console.log(stringColumnsData.get("cmfor"));

    const tempStringColumns = new Map();
    const tempNumberColumns = new Map();
    const tempBooleanColumns = new Map();

    if (currentClubInfo && currentClubInfo.userColumns.length > 0) {
      if (clubMembersData) {
        clubMembersData.forEach((member) => {
          Object.values(member.registeredClubs).forEach(
            (club: RegisteredClubType) => {
              if (club.clubId === currentClubInfo._id) {
                club.moreColumns.forEach((col) => {
                  if (col.column.valueType === "string") {
                    // console.log(stringColumnsData.get(col.column.key));
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

  // console.log(stringColumnsData.entries());
  // console.log(stringColumnsData.size);

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

  const { data: todoData, isLoading } = useQuery<ToDoType[]>(
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

  const calculateTodayTodos = (todos: ToDoType[]) => {
    const today = moment(new Date()).format("YYYY-MM-DD");
    const result = todos.filter(
      (todo) => moment(todo.date).format("YYYY-MM-DD") === today
    );

    return result.length;
  };

  const calculateMonthTodos = (todos: ToDoType[]) => {
    const today = moment(new Date()).format("YYYY-MM-DD");
    const thisMonth = moment(new Date()).format("YYYY-MM");
    const result = todos.filter(
      (todo) =>
        moment(todo.date).format("YYYY-MM") === thisMonth &&
        moment(todo.date).format("YYYY-MM-DD") >= today
    );

    return result.length;
  };

  const studentIDExample = (members: UserType[]) => {
    const result = members.map((member) => member.studentId.slice(2, 4));
    // console.log(Array.from(new Set(result)).sort());
    return Array.from(new Set(result)).sort();
  };

  const studentIDData = (members: UserType[]) => {
    const result = new Map(studentIDExample(members).map((ele) => [ele, 0]));
    members.forEach((member) => {
      const id = member.studentId.slice(2, 4);
      // console.log(result.get(id));

      const prev = result.get(id);
      if (typeof prev === "undefined") {
        result.set(id, 0);
      } else {
        result.set(id, prev + 1);
      }
    });

    return Array.from(result.values());
  };

  const studentMajorData = (members: UserType[]) => {
    const result = new Map<string, number>();
    members.forEach((member) => {
      if (result.get(member.major)) {
        result.set(member.major, result.get(member.major)! + 1);
      } else {
        result.set(member.major, 1);
      }
    });

    const realResult: { label: string; value: number }[] = [];
    result.forEach((value, key) => realResult.push({ label: key, value }));
    return realResult;
  };

  const cOption = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany",
        ],
      },
    },
  };
  console.log(Array.from(stringColumnsData));
  return (
    <Container maxWidth="xl">
      <Typography variant="h2" sx={{ mb: 5 }}>
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

        {/* <Grid item xs={12} md={6} lg={4}></Grid> */}

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
              const names = Array.from(new Set(value));
              const obj: { [key: string]: number } = {};
              names.forEach((name) => {
                obj[name] = value.filter((x) => x === name).length;
              });
              console.log(obj);
              if (obj[""]) {
                obj["응답 없음"] = obj[""];
                delete obj[""];
              }

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
              const names = Array.from(new Set(value));
              const obj: { [key: string]: number } = {};
              names.forEach((name) => {
                obj[name] = value.filter((x) => x === name).length;
              });
              console.log(obj);
              if (obj[""]) {
                obj["응답 없음"] = obj[""];
                delete obj[""];
              }

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
              const names = Array.from(new Set(value));
              const obj: { [key: string]: number } = {};
              names.forEach((name) => {
                obj[name] = value.filter((x) => x === name).length;
              });
              console.log(obj);
              if (obj[""]) {
                obj["응답 없음"] = obj[""];
                delete obj[""];
              }

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
        {/* <BooleanColumnChart /> */}
        {/* <ReactApexChart
          options={cOption.options as any}
          series={cOption.series}
          type="bar"
          height={350} */}

        {/* <Grid item xs={12} md={6} lg={4}>
            
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={4}>
            
          </Grid> */}

        {/* <Grid item xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: "1", label: "Create FireStone Logo" },
              { id: "2", label: "Add SCSS and JS files if required" },
              { id: "3", label: "Stakeholder Meeting" },
              { id: "4", label: "Scoping & Estimations" },
              { id: "5", label: "Sprint Showcase" },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
