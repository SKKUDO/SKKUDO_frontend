import { useMutation, useQuery, useQueryClient } from "react-query";
import { AppliedUserType } from "../../types/apply";
import {
  deleteAppliedUser,
  getAppliedUserByClubID,
} from "../../utils/fetch/fetchApply";
import { useParams } from "react-router-dom";
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
import UserListHead from "../../components/user/UserListHead";
import { useState, useEffect } from "react";
import UserListToolbar from "../../components/user/UserListToolbar";
import SearchNotFound from "../../components/user/SearchNotFound";
import { filter } from "lodash";
import { RegisterInfoType } from "../../types/user";
import { HiDocumentText } from "react-icons/hi";
import DocumentDialog from "../../components/manageAuth/DocumentDialog";
import { ColumnType } from "../../types/common";
import ApplierForm from "../../components/manageRecruit/ApplierForm";
import ScoreDialog from "../../components/manageRecruit/ScoreDialog";
import { useRecoilValue } from "recoil";
import { applierState } from "../../atoms/utilAtom";
import Iconify from "../../components/Iconify";
import AutoDialog from "../../components/manageRecruit/AutoDialog";
import useTablePage from "../../hooks/useTablePage";
import { registerClub } from "../../utils/fetch/fetchUser";

type orderType = "desc" | "asc";
type orderByType = "name" | "studentId" | "major";

const TABLE_HEAD = [
  { id: "name", label: "이름", alignRight: false },
  { id: "studentId", label: "학번", alignRight: false },
  { id: "major", label: "학과", alignRight: false },
  { id: "contact", label: "연락처", alignRight: false },

  {
    id: `docTotalScore`,
    label: `서류점수 총합`,
    alignRight: false,
  },
  {
    id: `interTotalScore`,
    label: `면접점수 총합`,
    alignRight: false,
  },
  {
    id: `totalScore`,
    label: `점수 총합`,
    alignRight: false,
  },
];

function ManageRecruit() {
  const { clubID } = useParams();
  const queryClient = useQueryClient();
  const [scoreDialogOpen, setScoreDialogOpen] = useState(false);
  const [autoDialogOpen, setAutoDialogOpen] = useState(false);
  const applier = useRecoilValue(applierState);
  const [tableHead, setTableHead] = useState(TABLE_HEAD);

  const [clickedAppliedUser, setClickedAppliedUser] =
    useState<AppliedUserType>();

  const { data } = useQuery<AppliedUserType[]>(
    "getAppliedUserByClubID",
    () => getAppliedUserByClubID(clubID || ""),
    {
      onSuccess: (data) => {},
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  interface RegisterMutateType {
    userID: string;
    registerInfo: RegisterInfoType;
  }
  const { mutate: registerMutate } = useMutation(
    ({ userID, registerInfo }: RegisterMutateType) =>
      registerClub(userID, clubID || "", registerInfo),
    {
      onSuccess: (data) => {
        console.log(data);
      },

      onError: (error: any) => alert(error.response.data.error),
    }
  );

  const { mutate: deleteMutate } = useMutation(
    (applyId: string) => deleteAppliedUser(applyId, clubID || ""),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getAppliedUserByClubID");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage] =
    useTablePage();
  const [order, setOrder] = useState<"desc" | "asc">("asc");
  const [orderBy, setOrderBy] = useState<orderByType>("name");
  const [filterName, setFilterName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (applier) {
      const tempHead = [...tableHead];
      applier.documentQuestions.forEach((s, idx) =>
        tempHead.push({
          id: `doc${idx + 1}score`,
          label: `서류${idx + 1} 점수`,
          alignRight: false,
        })
      );

      applier.interviewQuestions.forEach((s, idx) =>
        tempHead.push({
          id: `inter${idx + 1}score`,
          label: `면접${idx + 1} 점수`,
          alignRight: false,
        })
      );

      setTableHead(tempHead);
    }
  }, [applier]);

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
    console.log(selected);
  };

  function applySortFilter(
    array: AppliedUserType[] | undefined,
    comparator: (a: AppliedUserType, b: AppliedUserType) => number,
    query: string
  ) {
    if (array) {
      const stabilizedThis: [AppliedUserType, number][] = array.map(
        (el, index) => [el, index]
      );
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      if (query) {
        return filter(
          array,
          (_user) =>
            _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      }
      return stabilizedThis.map((el) => el[0]);
    } else {
      return [];
    }
  }

  function descendingComparator(
    a: AppliedUserType,
    b: AppliedUserType,
    orderBy: orderByType
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order: orderType, orderBy: orderByType) {
    return order === "desc"
      ? (a: AppliedUserType, b: AppliedUserType) =>
          descendingComparator(a, b, orderBy)
      : (a: AppliedUserType, b: AppliedUserType) =>
          -descendingComparator(a, b, orderBy);
  }

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

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

  const emptyRows = data
    ? page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data.length)
      : 0
    : 0;

  const handlePassBtnClick = (
    userID: string,
    moreColumns: {
      column: ColumnType;
      value: String;
    }[],
    applyId: string
  ) => {
    console.log(userID);
    registerMutate(
      {
        userID,
        registerInfo: { moreColumns, initialRole: "부원" },
      },
      {
        onSuccess: (data) => {
          deleteMutate(applyId);
        },
      }
    );
  };

  const handleFailBtnClick = (applyId: string) => {
    deleteMutate(applyId);
  };

  const handleDocumentBtnClick = (idx: number) => {
    setIsDialogOpen(true);

    if (filteredUsers) {
      setClickedAppliedUser(filteredUsers[idx]);
    }
  };

  const handleScoreDialogOpen = (idx: number) => {
    if (filteredUsers) {
      setClickedAppliedUser(filteredUsers[idx]);
    }
    setScoreDialogOpen(true);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          User
        </Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setAutoDialogOpen(true)}
        >
          자동 합격 버튼
        </Button>
      </Stack>

      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer
          component={Paper}
          sx={{ minWidth: 800, tableLayout: "auto" }}
        >
          <Table sx={{ overflowX: "scroll" }}>
            <UserListHead
              isManaging={true}
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
                .map((row, idx) => {
                  const {
                    _id,
                    studentId,
                    name,
                    major,
                    contact,
                    userID,
                    moreColumns,

                    documentScores,
                    interviewScores,
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, name)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {studentId}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px" }} align="left">
                        {major}
                      </TableCell>

                      <TableCell sx={{ fontSize: "14px" }} align="left">
                        {contact}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px" }} align="left">
                        {documentScores.reduce((a, b) => a + b, 0)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px" }} align="left">
                        {interviewScores.reduce((a, b) => a + b, 0)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px" }} align="left">
                        {documentScores.reduce((a, b) => a + b, 0) +
                          interviewScores.reduce((a, b) => a + b, 0)}
                      </TableCell>
                      {documentScores.map((score, idx) => (
                        <TableCell
                          key={idx}
                          sx={{ fontSize: "14px" }}
                          align="left"
                        >
                          {score}
                        </TableCell>
                      ))}

                      {interviewScores.map((score, idx) => (
                        <TableCell
                          key={idx}
                          sx={{ fontSize: "14px" }}
                          align="left"
                        >
                          {score}
                        </TableCell>
                      ))}

                      <TableCell
                        align="right"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          position: "sticky",
                          right: 30,
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="success"
                          sx={{
                            width: "20px",
                            padding: "5px",
                            paddingLeft: "2px",
                            paddingRight: "2px",
                          }}
                          onClick={() => handleScoreDialogOpen(idx)}
                        >
                          점수입력
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: "20px",
                            padding: "5px",
                          }}
                          onClick={() =>
                            handlePassBtnClick(userID, moreColumns, _id)
                          }
                        >
                          합격
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          sx={{
                            width: "20px",
                            padding: "5px",
                          }}
                          onClick={() => handleFailBtnClick(_id)}
                        >
                          불합격
                        </Button>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ position: "sticky", right: 0 }}
                      >
                        <HiDocumentText
                          size="1.7rem"
                          onClick={() => handleDocumentBtnClick(idx)}
                        />
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
      </Card>
      <DocumentDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        applierInfo={clickedAppliedUser}
      />
      <ScoreDialog
        scoreDialogOpen={scoreDialogOpen}
        setScoreDialogOpen={setScoreDialogOpen}
        appliedUser={clickedAppliedUser}
      />
      <AutoDialog
        open={autoDialogOpen}
        setOpen={setAutoDialogOpen}
        appliedUsers={data}
      />

      <ApplierForm />
    </Container>
  );
}

export default ManageRecruit;
