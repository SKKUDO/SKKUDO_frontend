import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState } from "../atoms/loginAtom";
import { loggedInUserState } from "../atoms/userAtom";
import { loginFromServer } from "../utils/fetch/fetchAuth";
import { UserType } from "../types/user";

const Container = styled.div`
  width: 100%;
  padding-top: 8vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 100px;
  margin-bottom: 100px;
`;

const QuickLoginBtn = styled.button`
  width: 300px;
  height: 50px;
  background-color: #000069;
  color: white;
  border: none;
  margin-bottom: 60px;
  border-radius: 5px;
  font-weight: 700;

  &:hover {
    background-color: #1c3879;
  }
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

export default function TestPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [user, setUser] = useRecoilState(loggedInUserState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutate } = useMutation(
    ({ userID, password }: LoginInfo) => loginFromServer(userID, password),
    {
      //need to fix
      onSuccess: (data: UserType) => {
        setIsLoggedIn(true);
        setUser(data);
        alert(
          "테스트 유저로 로그인했습니다. 마이페이지에서 내 동아리 정보를 확인하세요."
        );
        navigate("/");
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
    <Container>
      <Label>테스트에 사용할 계정을 선택해주세요</Label>
      <QuickLoginBtn onClick={() => handleSubmit(usingInfo[0])}>
        회장
      </QuickLoginBtn>
      <QuickLoginBtn onClick={() => handleSubmit(usingInfo[1])}>
        운영진
      </QuickLoginBtn>
      <QuickLoginBtn onClick={() => handleSubmit(usingInfo[2])}>
        부원
      </QuickLoginBtn>
    </Container>
  );
}
