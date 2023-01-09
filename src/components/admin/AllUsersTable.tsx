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
import useTablePage from "../../hooks/useTablePage";
import { UserType } from "../../types/user";
import { getAllUsers } from "../../utils/fetch/fetchUser";
import { applySortFilter, getComparator } from "../../utils/Sorting";
import csvDownload from "json-to-csv-export";
import UserListHead from "../user/UserListHead";
import UserListToolbar from "../user/UserListToolbar";
import SearchNotFound from "../user/SearchNotFound";
import UserInfoDialog from "./UserInfoDialog";
import { IoIosDocument } from "react-icons/io";

interface UserTableType {
  isManage: boolean;
}

const TABLE_HEAD = [
  { id: "name", label: "이름", alignRight: false },
  { id: "userID", label: "아이디", alignRight: false },
  { id: "studentId", label: "학번", alignRight: false },
  { id: "major", label: "학과", alignRight: false },
  { id: "location", label: "위치", alignRight: false },
];

export default function AllUsersTable({ isManage }: UserTableType) {
  const { clubID } = useParams();
  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePage();

  const [selected, setSelected] = useState<string[]>([]);

  const [order, orderBy, filterName, handleRequestSort, handleFilterByName] =
    useOrderWithFilter();

  const [open, setOpen] = useState(false);
  const [clickedUser, setClickedUser] = useState<UserType>();

  const handleUserItemClick = (user: UserType) => {
    setOpen(true);
    setClickedUser(user);
  };

  const { data } = useQuery<UserType[]>("getAllUsers", () => getAllUsers(), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => alert(error.response.data.error),
  });

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
        // role: new Map(Object.entries(item.registeredClubs)).get(
        //   clubID as string
        // )?.role,
        major: item.major,
        location: item.location,
        contact: item.contact,
      };
      // new Map(Object.entries(item.registeredClubs))
      //   .get(clubID as string)
      //   ?.moreColumns.forEach((item: IMoreColumn) => {
      //     newObject[item.column.key] = item.value;
      //   });
      return newObject;
    });

    // const club: ClubType = await getOneClub(clubID as string);

    let usingHeaders: string[] = [
      "이름",
      "학번",
      // "역할",
      "학과",
      "위치",
      "연락처",
    ];

    // usingHeaders = [
    //   ...usingHeaders,
    //   ...club.userColumns.map((item) => item.key),
    // ];

    const dataToConvert = {
      data: rangedArray,
      filename: "동아리원",
      delimiter: ",",
      headers: usingHeaders,
    };

    csvDownload(dataToConvert);
  };

  return (
    <>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <TableContainer sx={{ minWidth: 800 }}>
        <Button onClick={downloadCSV}>export to CSV</Button>
        <Table>
          <UserListHead
            isManaging={isManage}
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
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
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {name}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {userID}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {studentId}
                    </TableCell>

                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {major}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                    >
                      {location}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                      onClick={() => handleUserItemClick(row)}
                    >
                      <IoIosDocument />
                    </TableCell>
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

      <UserInfoDialog open={open} setOpen={setOpen} clickedUser={clickedUser} />
    </>
  );
}
