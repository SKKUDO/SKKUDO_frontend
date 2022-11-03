import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isManageState } from "../atoms/NavigatorAtom";
import { useMutation } from "react-query";
import { logoutFromServer } from "../utils/fetch";
import { isLoggedInState } from "../atoms/loginAtom";

interface INavigationConatiner {
  isManage: boolean;
}
const NavigatorContainer = styled.header<INavigationConatiner>`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: #0c4426;
  display: ${(props) => (props.isManage ? "none" : "block")};
  z-index: 100;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;

const ItemsContainer = styled.div`
  margin: 0 auto;

  display: flex;
  height: 100%;
  max-width: 1400px;
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 200px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  font-size: 3rem;
  color: #dde143;
`;

const NavigationContainer = styled.nav`
  margin-left: 40px;
`;

const NavigationUl = styled.ul`
  display: flex;
  height: 100%;
  gap: 40px;
`;

const NavigationLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: #dde143;
  font-size: 2rem;
`;

const LoginBtn = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  margin-left: auto;
  margin-right: 20px;
  color: #dde143;
`;

interface ILoginOptionContainer {
  isLoginOptionOpened: boolean;
}
const LoginOptionContainer = styled.ul<ILoginOptionContainer>`
  position: absolute;
  width: 100px;
  background-color: aliceblue;
  right: 0;
  border-radius: 5px;
  display: ${(props) => (props.isLoginOptionOpened ? "block" : "none")};
  padding-bottom: 20px;
`;

const LoginOption = styled.li`
  text-align: start;
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 1.3rem;
  padding-top: 20px;
`;

const LoginLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function Navigator() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isLoginOptionOpened, setIsLoginOptionOpened] = useState(false);
  const isManage = useRecoilValue(isManageState);
  const handleLoginBtnClick = () => {
    setIsLoginOptionOpened((prev) => !prev);
  };

  const { mutate: logoutMutate } = useMutation(logoutFromServer, {
    onSuccess: (data) => {
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다");
    },
    onError: (data) => console.log("error"),
  });
  const handleLogoutBtnClick = () => {
    logoutMutate();
  };
  return (
    <NavigatorContainer isManage={isManage}>
      <ItemsContainer>
        <LogoContainer to="/">
          <Logo>SKKUDO</Logo>
        </LogoContainer>
        <NavigationContainer>
          <NavigationUl>
            <NavigationLi>
              <NavigationLink to="/clubs">Club</NavigationLink>
            </NavigationLi>
            <NavigationLi>
              <NavigationLink to="/about">About</NavigationLink>
            </NavigationLi>
            <NavigationLi>
              <NavigationLink to="/myPage">My Page</NavigationLink>
            </NavigationLi>
          </NavigationUl>
        </NavigationContainer>
        <LoginBtn onClick={handleLoginBtnClick}>
          <IoPersonOutline size="2.3rem" />
          <LoginOptionContainer isLoginOptionOpened={isLoginOptionOpened}>
            {!isLoggedIn ? (
              <>
                <LoginOption>
                  <LoginLink to="/login">로그인</LoginLink>
                </LoginOption>
                <LoginOption>
                  <LoginLink to="/signup">회원가입</LoginLink>
                </LoginOption>
              </>
            ) : (
              <LoginOption>
                <div onClick={handleLogoutBtnClick}>로그아웃</div>
              </LoginOption>
            )}
          </LoginOptionContainer>
        </LoginBtn>
      </ItemsContainer>
    </NavigatorContainer>
  );
}

export default Navigator;
