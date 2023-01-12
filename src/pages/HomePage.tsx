import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isManageState } from "../atoms/NavigatorAtom";
import QuickLogin from "../components/mainPage/QuickLogin";
import myeong from "../assets/images/myeong.jpeg";
import yul from "../assets/images/yul.png";
import logo from "../assets/images/skkudo_logo.png";

const HomePageContainer = styled.div`
  /* padding-top: 7vh; */
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
`;

const Phrase = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* gap: 10px; */
  color: #000069;
`;

const ImgContainer = styled.img`
  width: 45%;
  /* @media screen and (max-width: 1024px) {
    width: 20%;
  } */

  margin-bottom: -4%;
`;

const Name = styled(motion.div)`
  font-size: 13em;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  @media screen and (max-width: 490px) {
    font-size: 4em;
  }
  margin-bottom: -3%;
`;

const SubName = styled.div`
  font-size: 1.7em;
  top: -2px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  /* margin-top: 9vh; */
`;

const MainPageBtn = styled(motion.button)`
  height: 100%;
  flex: 1;
  font-size: 1.4em;
  border: none;
  color: #000069;
  font-weight: 550;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 1em;
    border-radius: 8vw;
    width: 35vw;
  }
  @media screen and (max-width: 490px) {
    width: 30%;
    font-size: 80%;
  }
  background-color: #e0e7e9;

  &:hover {
    background-color: #1c3879;
    color: white;
  }
`;

function HomePage() {
  const navigate = useNavigate();
  const setIsManage = useSetRecoilState(isManageState);

  useEffect(() => {
    setIsManage(false);
  }, []);

  const handleMainPageBtnClick = (btnType: string) => {
    if (btnType === "search") {
      navigate("/clubs");
    } else if (btnType === "make") {
      navigate("/applyClub");
    } else {
      return;
    }
  };
  return (
    <HomePageContainer>
      <Banner>
        {/* <ImgContainer src={myeong} /> */}
        <Phrase>
          {/* <Name
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            SKKUDO
          </Name> */}
          <ImgContainer src={logo} />
          <SubName>
            {" "}
            복잡한 동아리 관리를 한번에! 성균관대학교 동아리 플랫폼 스꾸도
          </SubName>
        </Phrase>
        {/* <ImgContainer src={yul} /> */}
      </Banner>
      <ButtonsContainer>
        <MainPageBtn onClick={() => handleMainPageBtnClick("search")}>
          동아리 둘러보기
        </MainPageBtn>
        <MainPageBtn onClick={() => handleMainPageBtnClick("make")}>
          동아리 만들기
        </MainPageBtn>
        <MainPageBtn onClick={() => handleMainPageBtnClick("make")}>
          체험해보기
        </MainPageBtn>
      </ButtonsContainer>
      {/* <QuickLogin /> */}
    </HomePageContainer>
  );
}

export default HomePage;
