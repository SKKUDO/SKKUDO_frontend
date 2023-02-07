import { ButtonGroup, Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../../atoms/loginAtom";
import { useMutation } from "react-query";
import { loginFromServer } from "../../utils/fetch/fetchAuth";

const MainWrapper = styled("div")({
  width: 170,
  height: 310,
  position: "absolute",
  backgroundColor: "#dde143",
  borderRadius: 5,
  paddingLeft: 13,
  top: 200,
  right: 0,
  "@media (max-width: 800px)": {
    display: "none",
  },
});

const ButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const TestFont = styled("h2")({
  fontSize: 25,
  color: "#0c4426",
});

const SideButton = styled(motion.button)`
  width: 140px;
  height: 80px;
  background-color: #0c4426;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 28px;
  border: none;
  color: #dde143;
  font-weight: 800;
`;

interface LoginInfo {
  userID: string;
  password: string;
}

const usingInfo: LoginInfo[] = [
  {
    userID: "test2",
    password: "test2",
  },
  {
    userID: "test2_1",
    password: "test2_1",
  },
  {
    userID: "test2_2",
    password: "test2_2",
  },
];

export default function QuickLogin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const { mutate } = useMutation(
    ({ userID, password }: LoginInfo) => loginFromServer(userID, password),
    {
      //need to fix
      onSuccess: (data) => {
        // console.log(data);
        setIsLoggedIn(true);
        alert(
          "테스트 유저로 로그인했습니다. 마이페이지에서 내 동아리 정보를 확인하세요."
        );
        // navigate("/myPage");
        window.location.reload();
      },
      onError: (error: { response: { data: { error: string } } }) =>
        alert(error.response.data.error),
    }
  );

  const handleSubmit = async (usingInfo: LoginInfo) => {
    if (isLoggedIn) {
      alert("먼저 로그아웃 해주세요.");
      return;
    }
    mutate(usingInfo);
  };
  return (
    <Box
      sx={{
        display: "flex",
        "& > *": {
          m: 1,
        },
        // border: 1,
      }}
    >
      <MainWrapper>
        <TestFont>테스트 하기</TestFont>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
          color="success"
          variant="contained"
        >
          <ButtonWrapper>
            <SideButton
              whileHover={{ scale: 1.1 }}
              onClick={() => handleSubmit(usingInfo[0])}
            >
              회장
            </SideButton>
            <SideButton
              whileHover={{ scale: 1.1 }}
              onClick={() => handleSubmit(usingInfo[1])}
            >
              운영진
            </SideButton>
            <SideButton
              whileHover={{ scale: 1.1 }}
              onClick={() => handleSubmit(usingInfo[2])}
            >
              부원
            </SideButton>
            {/* <SideButton
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/admin/clubCreate")}
            >
              ADMIN
            </SideButton> */}
          </ButtonWrapper>
        </ButtonGroup>
      </MainWrapper>
    </Box>
  );
}
