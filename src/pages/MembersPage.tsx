import styled from "styled-components";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { UserType } from "../types/user";
import { getClubMembers } from "../utils/fetch";
import ClubDetailHeader from "../components/ClubDetailHeader";
import { maxWidth } from "@mui/system";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
];

function BasicTable() {
  const { clubID } = useParams();

  const { data, isLoading } = useQuery<UserType[]>("getClubMembers", () =>
    getClubMembers(clubID || "")
  );
  return (
    <TableContainer
      sx={{
        display: "flex",
        justifyContent: "center",
        border: "none",
        boxShadow: "none",
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
        marginTop: "80px",
      }}
      component={Paper}
    >
      <Table sx={{ maxWidth: 1024, width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell align="right">학번</TableCell>
            <TableCell align="right">권한</TableCell>
            <TableCell align="right">학과</TableCell>
            <TableCell align="right">기타</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))
            : data?.map((member) => (
                <TableRow key={member._id}>
                  <TableCell component="th" scope="row">
                    {member.name}
                  </TableCell>
                  <TableCell align="right">{member.studentId}</TableCell>
                  <TableCell align="right">
                    {
                      member.registeredClubs.filter(
                        (club) => club.clubId === clubID
                      )[0].role
                    }
                  </TableCell>
                  <TableCell align="right">{member.major}</TableCell>
                  <TableCell align="right">{member.location}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const MembersPageContainer = styled.div``;
function MembersPage() {
  return (
    <MembersPageContainer>
      <ClubDetailHeader pageType="동아리원" />
      <BasicTable />
    </MembersPageContainer>
  );
}

export default MembersPage;
