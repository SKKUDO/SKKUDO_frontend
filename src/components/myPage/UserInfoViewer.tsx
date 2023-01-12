import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInUserState } from "../../atoms/userAtom";
import UserEditDialog from "./UserEditDialog";
import { FaPen } from "react-icons/fa";
import { motion } from "framer-motion";

const InfoContainer = styled.div`
  background-color: #1c3879;
  /* border-radius: 10px; */
  width: 100%;
  /* margin-top: 100px; */
  padding: 20px;
  color: #e0e7e9;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 2px solid; */
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); */
`;

const RowContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-end;
  margin-bottom: 30px;
`;

const Name = styled.div`
  font-size: 45px;
  font-weight: 700;
  @media screen and (max-width: 490px) {
    font-size: 150%;
  }
  margin-bottom: 5px;
  margin-top: 10px;
`;

const Major = styled.div`
  font-size: 30px;
  font-weight: 600;
  @media screen and (max-width: 490px) {
    font-size: 100%;
  }
  margin-bottom: 30px;
`;

const StudentID = styled.div`
  font-size: 25px;
  margin-bottom: 22px;
  font-weight: 600;
  @media screen and (max-width: 490px) {
    font-size: 100%;
  }
`;

const Location = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 22px;
  display: flex;
  @media screen and (max-width: 490px) {
    font-size: 100%;
  }
`;

const EditBtnContainer = styled(motion.div)`
  width: 40px;
  height: 40px;
  margin-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  @media screen and (max-width: 490px) {
    width: 10%;
    height: 10%;
  }
`;

export default function UserInfoViewer() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const loggedInUser = useRecoilValue(loggedInUserState);
  const handleEditBtnClick = () => {
    setDialogOpen(true);
  };

  return (
    <InfoContainer>
      {loggedInUser ? (
        <>
          {/* <RowContainer> */}
          <Name>{loggedInUser.name}</Name>
          <Major>{loggedInUser.major}</Major>
          {/* </RowContainer> */}
          <StudentID>{`학번 : ${loggedInUser.studentId}`}</StudentID>
          <Location>{`소속 : ${loggedInUser.location}`}</Location>
          <Location>
            {`연락처 : ${loggedInUser.contact}`}
            <EditBtnContainer
              whileHover={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              onClick={handleEditBtnClick}
            >
              <FaPen />
            </EditBtnContainer>
          </Location>
          <UserEditDialog open={dialogOpen} setOpen={setDialogOpen} />
        </>
      ) : (
        <RowContainer>
          정보를 불러오지 못했습니다. 다시 로그인 해주세요
        </RowContainer>
      )}
    </InfoContainer>
  );
}
