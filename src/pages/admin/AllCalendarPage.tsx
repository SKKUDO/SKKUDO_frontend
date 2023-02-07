import { useQuery } from "react-query";
import { getAllTodos } from "../../utils/fetch/fetchTodo";
import { ToDoType } from "../../types/todo";
import moment from "moment";
import { filter } from "lodash";
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
import useTablePage from "../../hooks/useTablePage";
import csvDownload from "json-to-csv-export";
import UserListHead from "../../components/user/UserListHead";
import UserListToolbar from "../../components/user/UserListToolbar";
import { useState } from "react";
import { OrderType } from "../../types/user";
import SearchNotFound from "../../components/user/SearchNotFound";
import { Box } from "@mui/system";
import { PageTitle } from "../../components/admin/PageTitle";
import TodoDetailDialog from "../../components/admin/TodoDetailDialog";

const TABLE_HEAD = [
  { id: "title", label: "제목", alignRight: false },
  { id: "date", label: "날짜", alignRight: false },
];

export default function AllCalendarPage() {
  const { data } = useQuery<ToDoType[]>("getAllTodos", getAllTodos, {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<"title" | "date">("title");
  const [filterName, setFilterName] = useState("");
  const [clickedTodo, setClickedTodo] = useState<ToDoType>();

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };
  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePage();

  const [selected, setSelected] = useState<string[]>([]);

  const [open, setOpen] = useState(false);

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      if (data) {
        const newSelecteds = data.map((n) => n.title);
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

  function descendingComparator(
    a: ToDoType,
    b: ToDoType,
    orderBy: "date" | "title"
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: OrderType, orderBy: "date" | "title") {
    return order === "desc"
      ? (a: ToDoType, b: ToDoType) => descendingComparator(a, b, orderBy)
      : (a: ToDoType, b: ToDoType) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(
    array: ToDoType[] | undefined,
    comparator: (a: ToDoType, b: ToDoType) => number,
    query: string
  ) {
    if (array) {
      const stabilizedThis: [ToDoType, number][] = array.map((el, index) => [
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
          (_user) =>
            _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      }
      return stabilizedThis.map((el) => el[0]);
    } else {
      return [];
    }
  }
  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
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
    const rangedArray = filteredUsers.map((item: ToDoType) => {
      const newObject: any = {
        title: item.title,
        writer: item.writer,
      };

      return newObject;
    });

    let usingHeaders: string[] = ["제목", "날짜"];

    const dataToConvert = {
      data: rangedArray,
      filename: "일정",
      delimiter: ",",
      headers: usingHeaders,
    };

    csvDownload(dataToConvert);
  };

  const handleRowClick = (row: ToDoType) => {
    setClickedTodo(row);
    setOpen(true);
  };

  return (
    <>
      <PageTitle>전체 일정</PageTitle>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1024,
          bgcolor: "background.paper",
          margin: "0 auto",
        }}
      >
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer sx={{ minWidth: 800 }}>
          <Button onClick={downloadCSV}>export to CSV</Button>
          <Table>
            <UserListHead
              isManaging={true}
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
                  const { title, date, _id } = row;
                  const isItemSelected = selected.indexOf(title) !== -1;

                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      onClick={() => handleRowClick(row)}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, title)}
                        />
                      </TableCell> */}
                      <TableCell sx={{ fontSize: "13px" }} align="left">
                        {title}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }} align="left">
                        {moment(date).format("YYYY-MM-DD")}
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
        <TodoDetailDialog
          open={open}
          setOpen={setOpen}
          todoInfo={clickedTodo}
        />
      </Box>
    </>
  );
}
