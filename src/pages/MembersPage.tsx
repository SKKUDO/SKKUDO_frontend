import { filter } from "lodash";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
} from "@mui/material";
import Scrollbar from "../components/dashboardComponents/Scrollbar";
import UserListToolbar from "../components/userComponents/UserListToolbar";
import UserListHead from "../components/userComponents/UserListHead";
import SearchNotFound from "../components/userComponents/SearchNotFound";
import ClubDetailHeader from "../components/ClubDetailHeader";
import { useQuery } from "react-query";
import { getClubMembers, getOneClub } from "../utils/fetch";
import { UserType } from "../types/user";
import { ClubType } from "../types/club";
import { ColumnType } from "../types/common";

interface ITableHeadItem {
  id: string;
  label: string;
  alignRight: boolean;
}

const TABLE_HEAD: ITableHeadItem[] = [
  { id: "name", label: "이름", alignRight: false },
  { id: "studentId", label: "학번", alignRight: false },
  { id: "role", label: "역할", alignRight: false },
  { id: "major", label: "학과", alignRight: false },
  { id: "location", label: "위치", alignRight: false },
];

type orderType = "desc" | "asc";
type orderByType = "name" | "studentId" | "role" | "major" | "location";
type IMoreColumn = {
  column: ColumnType;
  value: String;
};

function descendingComparator(
  a: UserType,
  b: UserType,
  orderBy: orderByType,
  clubID: string
) {
  if (orderBy === "role") {
    const beta = new Map(Object.entries(b.registeredClubs)).get(clubID);
    const alpha = new Map(Object.entries(a.registeredClubs)).get(clubID);
    if (beta && alpha) {
      if (beta.role < alpha.role) {
        return -1;
      }
      if (beta.role > alpha.role) {
        return 1;
      }
      return 0;
    }

    return 0;
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

function getComparator(order: orderType, orderBy: orderByType, clubID: string) {
  return order === "desc"
    ? (a: UserType, b: UserType) => descendingComparator(a, b, orderBy, clubID)
    : (a: UserType, b: UserType) =>
        -descendingComparator(a, b, orderBy, clubID);
}

function applySortFilter(
  array: UserType[] | undefined,
  comparator: (a: UserType, b: UserType) => number,
  query: string
) {
  if (array) {
    const stabilizedThis: [UserType, number][] = array.map((el, index) => [
      el,
      index,
    ]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  } else {
    return [];
  }
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<"desc" | "asc">("asc");

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState<orderByType>("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [tableHead, setTableHead] = useState<ITableHeadItem[]>(TABLE_HEAD);

  const { clubID } = useParams();

  const { data, isLoading } = useQuery<UserType[]>(
    "getClubMembers",
    () => getClubMembers(clubID || ""),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      if (data) {
        const newSelecteds = data.map((n) => n.name);
        setSelected(newSelecteds);
      }
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const emptyRows = data
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data.length)
      : 0
    : 0;

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy, clubID || ""),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  useEffect(() => {
    getOneClub(clubID || "")
      .then((club: ClubType) => {
        const userColumns: ITableHeadItem[] = club.userColumns.map((item) => {
          const elem: ITableHeadItem = {
            id: item.key,
            label: item.key,
            alignRight: false,
          };
          return elem;
        });
        setTableHead([...TABLE_HEAD, ...userColumns]);
      })
      .catch((error) => alert(error.error));
  }, []);
  return (
    <Container sx={{ maxWidth: "1024px" }}>
      <ClubDetailHeader pageType={"동아리원"} />
      <Card
        sx={{
          margin: "0 auto",
          marginTop: "80px",
          width: "100%",
          maxWidth: "1024px",
        }}
      >
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        {/* <Scrollbar> */}
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              isManaging={false}
              order={order}
              orderBy={orderBy}
              headLabel={tableHead}
              rowCount={data?.length || 0}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    studentId,
                    name,
                    registeredClubs,
                    location,
                    major,
                  } = row;
                  const isItemSelected = selected.indexOf(name) !== -1;

                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell sx={{ fontSize: "13px" }} align="left">
                        {name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }} align="left">
                        {studentId}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }} align="left">
                        {clubID && data
                          ? new Map(Object.entries(registeredClubs)).get(clubID)
                              ?.role
                          : ""}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }} align="left">
                        {major}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }} align="left">
                        {location}
                      </TableCell>
                      {clubID && data
                        ? new Map(Object.entries(registeredClubs))
                            .get(clubID)
                            .moreColumns.map(
                              (item: IMoreColumn, index: any) => {
                                return (
                                  <TableCell
                                    sx={{ fontSize: "13px" }}
                                    key={index}
                                    align="left"
                                  >
                                    {item.value}
                                  </TableCell>
                                );
                              }
                            )
                        : ""}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
