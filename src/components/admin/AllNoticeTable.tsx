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
import useTablePage from "../../hooks/useTablePage";
import csvDownload from "json-to-csv-export";
import UserListHead from "../user/UserListHead";
import UserListToolbar from "../user/UserListToolbar";
import SearchNotFound from "../user/SearchNotFound";
import { getAllNotices } from "../../utils/fetch/fetchNotice";
import { NoticeType } from "../../types/notice";
import { OrderType } from "../../types/user";
import { filter } from "lodash";
import { ClickedNoticeInfoType } from "../../types/notice";
import NoticeDetail from "../notice/NoticeDetail";

const TABLE_HEAD = [
  { id: "title", label: "제목", alignRight: false },
  { id: "writer", label: "작성자", alignRight: false },
];

export default function AllNoticeTable() {
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<"title" | "writer">("title");
  const [filterName, setFilterName] = useState("");
  const [clickedNoticeInfo, setClickedNotiiceInfo] =
    useState<ClickedNoticeInfoType>({
      writer: "",
      title: "",
      content: "",
      noticeTags: [],
    });

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

  const { data } = useQuery<NoticeType[]>("getAllNotices", getAllNotices, {
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

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
    a: NoticeType,
    b: NoticeType,
    orderBy: "writer" | "title"
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: OrderType, orderBy: "writer" | "title") {
    return order === "desc"
      ? (a: NoticeType, b: NoticeType) => descendingComparator(a, b, orderBy)
      : (a: NoticeType, b: NoticeType) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(
    array: NoticeType[] | undefined,
    comparator: (a: NoticeType, b: NoticeType) => number,
    query: string
  ) {
    if (array) {
      const stabilizedThis: [NoticeType, number][] = array.map((el, index) => [
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
    const rangedArray = filteredUsers.map((item: NoticeType) => {
      const newObject: any = {
        title: item.title,
        writer: item.writer,
      };

      return newObject;
    });

    let usingHeaders: string[] = ["제목", "작성자"];

    const dataToConvert = {
      data: rangedArray,
      filename: "공지",
      delimiter: ",",
      headers: usingHeaders,
    };

    csvDownload(dataToConvert);
  };

  const handleRowClick = (clickedNoticeInfo: ClickedNoticeInfoType) => {
    setClickedNotiiceInfo(clickedNoticeInfo);
    setOpen(true);
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
                const { _id, title, writer, noticeTags, content } = row;
                const isItemSelected = selected.indexOf(title) !== -1;

                return (
                  <TableRow
                    hover
                    key={_id}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                    onClick={() =>
                      handleRowClick({ writer, title, content, noticeTags })
                    }
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
                      {writer}
                    </TableCell>

                    {/* <TableCell
                      sx={{ fontSize: isManage ? "20px" : "13px" }}
                      align="left"
                      onClick={() => handleUserItemClick(row)}
                    >
                      <IoIosDocument />
                    </TableCell> */}
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
      <NoticeDetail
        noticeInfo={clickedNoticeInfo}
        detailOpened={open}
        setDetailOpened={setOpen}
      />
    </>
  );
}
