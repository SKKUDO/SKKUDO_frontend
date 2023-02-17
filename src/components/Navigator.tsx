import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isManageState } from "../atoms/NavigatorAtom";
import { useMutation } from "react-query";
import { isLoggedInState } from "../atoms/loginAtom";
import { loggedInUserState, userInfoState } from "../atoms/userAtom";
import { motion } from "framer-motion";
import { logoutFromServer } from "../utils/fetch/fetchAuth";
import logo from "../assets/images/skkudo_logo.png";

interface INavigationConatiner {
  isManage: boolean;
}
const NavigatorContainer = styled.header<INavigationConatiner>`
  position: fixed;
  width: 100%;
  height: 8vh;
  background-color: #e0e7e9;
  display: ${(props) => (props.isManage ? "none" : "block")};
  z-index: 100;
  opacity: 0.9;
`;

const ItemsContainer = styled.div`
  margin: 0 auto;
  display: flex;
  height: 100%;
  max-width: 140vw;
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 10vw;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 2vw;
  margin-right: 3vw;
  justify-content: center;
  @media screen and (max-width: 1024px) {
    margin-left: 6vw;
    margin-right: 7vw;
  }
  @media screen and (max-width: 768px) {
    margin-left: 8vw;
  }
  @media screen and (max-width: 490px) {
    margin-left: 4%;
    width: 28vw;
    margin-right: 2vw;
  }
`;

const Logo = styled.div`
  font-size: 2em;
  font-family: "Poppins", sans-serif;
  color: #000069;
  @media screen and (max-width: 490px) {
    font-size: 80%;
  }
  font-weight: 600;
`;

const NavigationContainer = styled.nav`
  @media screen and (max-width: 768px) {
    margin-left: 5vw;
  }
  @media screen and (max-width: 490px) {
    margin-left: 0.5%;
  }
`;

const NavigationUl = styled.ul`
  display: flex;
  height: 100%;
  gap: 3.5vw;
`;

const NavigationLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavigationLink = styled(Link)`
  text-decoration: none;
  color: #000069;
  font-size: 1.3rem;
  white-space: nowrap;
  font-family: "Heebo", sans-serif;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 490px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 320px) {
    font-size: 0.9em;
  }
`;

const LoginBtn = styled.div`
  position: relative;
  border: none;
  background-color: transparent;
  margin-right: 2vw;
  margin-left: auto;
  color: #000069;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 490px) {
    margin-left: auto;
  }
`;

interface ILoginOptionContainer {
  isLoginOptionOpened: boolean;
}
const LoginOptionContainer = styled.ul<ILoginOptionContainer>`
  position: absolute;
  width: 100px;
  background-color: #1c3879;
  right: 0;
  top: 70px;
  border-radius: 5px;
  display: ${(props) => (props.isLoginOptionOpened ? "block" : "none")};
  @media screen and (max-width: 490px) {
    width: 80px;
  }
`;

const LoginOption = styled(motion.div)`
  cursor: pointer;
  text-align: start;
  width: 100%;
  background-color: transparent;
  color: white;
  border-bottom: 0.5px solid white;
  padding: 10px;
  font-size: 1em;
  padding-top: 1.2vh;
  display: flex;
  padding-bottom: 1.2vh;
  font-weight: 500;
  @media screen and (max-width: 490px) {
    font-size: 15%;
  }
`;

const UserInfo = styled.h2`
  font-size: 1.2rem;
  white-space: nowrap;
  font-weight: 520;
  color: #000069;
  margin-right: 1vw;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
  }
  @media screen and (max-width: 490px) {
    font-size: 25%;
  }
`;

const ImgContainer = styled.img`
  width: 100%;
  margin-top: -5%;
`;

function Navigator() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [isLoginOptionOpened, setIsLoginOptionOpened] = useState(false);
  const isManage = useRecoilValue(isManageState);
  const handleLoginBtnClick = () => {
    setIsLoginOptionOpened((prev) => !prev);
  };
  const navigate = useNavigate();

  const { mutate: logoutMutate } = useMutation(logoutFromServer, {
    onSuccess: (data) => {
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다");
    },
    onError: (error: any) => {
      alert(error.response.data.error);
    },
  });
  const handleLogoutBtnClick = () => {
    logoutMutate();
    navigate("/");
  };

  const handleLoginOptionClick = () => {
    navigate("/login");
  };

  const handleSignupOptionClick = () => {
    navigate("/signup");
  };

  return (
    <NavigatorContainer isManage={isManage}>
      <ItemsContainer>
        <LogoContainer to="/">
          <ImgContainer src={logo} />
        </LogoContainer>
        <NavigationContainer>
          <NavigationUl>
            <NavigationLi>
              <NavigationLink to="/clubs">Club</NavigationLink>
            </NavigationLi>
            <NavigationLi>
              <NavigationLink to="/about/main">About</NavigationLink>
            </NavigationLi>
            <NavigationLi>
              <NavigationLink to="/myPage">My Page</NavigationLink>
            </NavigationLi>
          </NavigationUl>
        </NavigationContainer>
        <LoginBtn onClick={handleLoginBtnClick}>
          <UserInfo>{isLoggedIn ? "로그아웃" : "로그인"}</UserInfo>
          <IoPersonOutline size="35%" />
          <LoginOptionContainer isLoginOptionOpened={isLoginOptionOpened}>
            {!isLoggedIn ? (
              <>
                <LoginOption
                  onClick={handleLoginOptionClick}
                  whileHover={{ backgroundColor: "#d4e7c6bf" }}
                >
                  로그인
                </LoginOption>
                <LoginOption
                  onClick={handleSignupOptionClick}
                  whileHover={{ backgroundColor: "#d4e7c6bf" }}
                >
                  회원가입
                </LoginOption>
              </>
            ) : (
              <LoginOption
                onClick={handleLogoutBtnClick}
                whileHover={{ backgroundColor: "#d4e7c6bf" }}
                style={{ border: "none" }}
              >
                로그아웃
              </LoginOption>
            )}
          </LoginOptionContainer>
        </LoginBtn>
      </ItemsContainer>
    </NavigatorContainer>
  );
}

export default Navigator;
