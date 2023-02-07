import {
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import useOrderWithFilter from "../../hooks/useOrderWithFilter";
import useTableHead from "../../hooks/useTableHead";
import useTablePage from "../../hooks/useTablePage";
import { ColumnType } from "../../types/common";
import { UserType } from "../../types/user";
import { getClubMembers } from "../../utils/fetch/fetchUser";
import { ClubType } from "../../types/club";
import { applySortFilter, getComparator } from "../../utils/Sorting";
import SearchNotFound from "./SearchNotFound";
import UserListHead from "./UserListHead";
import UserListToolbar from "./UserListToolbar";
import UserMoreMenu from "./UserMoreMenu";
import { getOneClub } from "../../utils/fetch/fetchClub";
import csvDownload from "json-to-csv-export";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

const TableCard = styled.div`
  position: relative;
`;

type IMoreColumn = {
  column: ColumnType;
  value: String;
};

interface UserTableType {
  isManage: boolean;
}

export default function UserTable({ isManage }: UserTableType) {
  const { clubID } = useParams();

  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePage();

  const [selected, setSelected] = useState<string[]>([]);

  const tableHead = useTableHead(isManage);

  const [order, orderBy, filterName, handleRequestSort, handleFilterByName] =
    useOrderWithFilter();

  const { data } = useQuery<UserType[]>(
    "getClubMembers",
    () => getClubMembers(clubID || ""),
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error: any) => alert(error.response.data.error),
    }
  );

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

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const downloadCSV = async () => {
    const rangedArray = filteredUsers.map((item: UserType) => {
      const newObject: any = {
        name: item.name,
        studentId: item.studentId,
        role: new Map(Object.entries(item.registeredClubs)).get(
          clubID as string
        )?.role,
        major: item.major,
        location: item.location,
        contact: item.contact,
      };
      new Map(Object.entries(item.registeredClubs))
        .get(clubID as string)
        ?.moreColumns.forEach((item: IMoreColumn) => {
          newObject[item.column.key] = item.value;
        });
      return newObject;
    });

    const club: ClubType = await getOneClub(clubID as string);

    let usingHeaders: string[] = [
      "이름",
      "학번",
      "역할",
      "학과",
      "위치",
      "연락처",
    ];

    usingHeaders = [
      ...usingHeaders,
      ...club.userColumns.map((item) => item.key),
    ];

    const dataToConvert = {
      data: rangedArray,
      filename: "동아리원",
      delimiter: ",",
      headers: usingHeaders,
    };

    csvDownload(dataToConvert);
  };

  return (
    <TableCard>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <TableContainer component={Paper} sx={{ tableLayout: "auto" }}>
        <Button
          onClick={downloadCSV}
          sx={{ position: "absolute", top: 20, right: 20 }}
        >
          export to CSV
        </Button>
        <Table sx={{ overflowX: "scroll" }}>
          <UserListHead
            isManaging={isManage}
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
                  userID,
                  studentId,
                  name,
                  registeredClubs,
                  location,
                  major,
                  contact,
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
                    {/* {isManage && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell>
                    )} */}

                    <TableCell
                      sx={{
                        fontSize: isManage ? "20px" : "13px",
                        color: "#1c3879",
                      }}
                      align="left"
                    >
                      {name}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: isManage ? "20px" : "13px",
                        color: "#1c3879",
                      }}
                      align="left"
                    >
                      {studentId}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: isManage ? "20px" : "13px",
                        color: "#1c3879",
                      }}
                      align="left"
                    >
                      {clubID && data
                        ? new Map(Object.entries(registeredClubs)).get(clubID)
                            ?.role
                        : ""}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: isManage ? "20px" : "13px",
                        color: "#1c3879",
                      }}
                      align="left"
                    >
                      {major}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: isManage ? "20px" : "13px",
                        color: "#1c3879",
                      }}
                      align="left"
                    >
                      {location}
                    </TableCell>
                    {isManage && (
                      <TableCell
                        sx={{
                          fontSize: isManage ? "20px" : "13px",
                          color: "#1c3879",
                        }}
                        align="left"
                      >
                        {contact}
                      </TableCell>
                    )}
                    {clubID && data
                      ? new Map(Object.entries(registeredClubs))
                          .get(clubID)
                          .moreColumns.map((item: IMoreColumn, index: any) => {
                            return (
                              <TableCell
                                sx={{
                                  fontSize: isManage ? "20px" : "13px",
                                  color: "#1c3879",
                                }}
                                key={index}
                                align="left"
                              >
                                {item.value}
                              </TableCell>
                            );
                          })
                      : ""}
                    {isManage && (
                      <TableCell align="right">
                        <UserMoreMenu
                          userID={userID}
                          role={
                            clubID && data
                              ? new Map(Object.entries(registeredClubs)).get(
                                  clubID
                                )?.role
                              : ""
                          }
                        />
                      </TableCell>
                    )}
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableCard>
  );
}
