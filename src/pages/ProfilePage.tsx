import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInUserState } from "../atoms/userAtom";
import ClubDetailHeader from "../components/ClubDetailHeader";
import { RegisteredClubType } from "../types/user";
import { FaPen } from "react-icons/fa";
import { motion } from "framer-motion";
import ColumnDialog from "../components/profile/ColumnDialog";
import DeregisterDialog from "../components/profile/DeregisterDialog";

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 40px;
  position: relative;
`;

const Name = styled.span`
  font-size: 160%;
  margin-right: 20px;
  color: #000069;
`;
const Role = styled.span`
  font-size: 150%;
  font-weight: 600;
  color: #000069;
`;

const BtnContainer = styled(motion.button)`
  position: absolute;
  right: 10px;
  border: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: transparent;
`;

function ProfilePage() {
  const { clubID } = useParams();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const [clubProfile, setClubProfile] = useState<RegisteredClubType>();
  const [keyword, setKeyword] = useState("");
  const [deregisterDialogOpen, setDeregisterDialogOpen] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      const registedClubs = new Map(
        Object.entries(loggedInUser.registeredClubs)
      );
      setClubProfile(registedClubs.get(clubID || ""));
    }
  }, [loggedInUser]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handelEditButtonClick = (selectedKeyword: string) => {
    setDialogOpen(true);
    setKeyword(selectedKeyword);
  };

  const handleDeregisterBtnClcik = () => {
    setDeregisterDialogOpen(true);
  };
  return (
    <>
      <ClubDetailHeader pageType="내 프로필" />
      <ProfileContainer>
        <Button
          color="error"
          variant="contained"
          onClick={handleDeregisterBtnClcik}
          sx={{ position: "absolute", right: 0 }}
        >
          탈퇴
        </Button>
        <DeregisterDialog
          open={deregisterDialogOpen}
          setOpen={setDeregisterDialogOpen}
        />
        <Name>{loggedInUser?.name}</Name>
        <Role>{clubProfile?.role}</Role>

        <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: "50%",
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#000069",
                  }}
                >
                  정보
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: "50%",
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#000069",
                  }}
                >
                  답변
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clubProfile?.moreColumns.map((ele) => (
                <TableRow
                  key={ele.column.key}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      textAlign: "center",
                      fontSize: "20px",
                      color: "#1c3879",
                    }}
                  >
                    {ele.column.key}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      position: "relative",
                      fontSize: "20px",
                      color: "#1c3879",
                    }}
                    align="right"
                  >
                    {ele.value || "정보가 없습니다."}
                    <BtnContainer
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                      onClick={() => handelEditButtonClick(ele.column.key)}
                    >
                      <FaPen />
                    </BtnContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ProfileContainer>
      <ColumnDialog
        keyword={keyword}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
}

export default ProfilePage;
