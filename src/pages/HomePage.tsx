import { useTheme } from "@mui/material";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomePageContainer = styled.div``;
const Banner = styled.div`
  padding-top: 120px;
  background-color: #aedb8d;
  width: 100%;
  /* height: 500px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const LineOne = styled.div`
  font-size: 4.5rem;
`;

const LineTwo = styled.div`
  font-size: 4.5rem;
`;

const Name = styled.div`
  font-size: 6.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
  gap: 80px;
`;

const MainPageBtn = styled.button`
  width: 170px;
  height: 80px;
  background-color: #0c4426;
  border-radius: 5px;
  font-size: 1rem;
  /* border: 3px solid #dde143; */
  border: none;
  color: #dde143;
  font-weight: 800;
`;

function HomePage() {
  const navigate = useNavigate();

  const handleMainPageBtnClick = (btnType: string) => {
    if (btnType == "search") {
      navigate("/clubs");
    } else if (btnType == "make") {
      navigate("/applyClub");
    } else {
      return;
    }
  };
  return (
    <HomePageContainer>
      <Banner>
        <LineOne>동아리/학회 관리를</LineOne>
        <LineTwo>손쉽게!!</LineTwo>
        <Name>SKKUDO</Name>
      </Banner>
      <ButtonsContainer>
        <MainPageBtn onClick={() => handleMainPageBtnClick("search")}>
          동아리/학회 둘러보기
        </MainPageBtn>
        <MainPageBtn onClick={() => handleMainPageBtnClick("make")}>
          동아리 신청하기
        </MainPageBtn>
      </ButtonsContainer>
      {/* <div
        style={{ height: "500px", width: "100%", backgroundColor: "" }}
      ></div> */}
    </HomePageContainer>
  );
}

export default HomePage;
