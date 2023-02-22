import styled from "styled-components";
import { ImWrench } from "react-icons/im";
import { TiGroupOutline } from "react-icons/ti";
import { TbPlugConnected } from "react-icons/tb";
import myeong from "../../assets/images/myeong.jpeg";
import yul from "../../assets/images/yul.png";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

const Intro = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 10vh;
  @media screen and (max-width: 1200px) {
    font-size: 1.9em;
  }
  @media screen and (max-width: 768px) {
    width: 80%;
    margin-left: 4vw;
  }
  color: #000069;
`;

const IntroduceContainer = styled.div`
  border-top-style: solid;
  border-width: 1px;
  border-color: #000069;
  display: flex;
  flex-direction: row;
  padding-top: 10vh;
  padding-bottom: 10vh;
`;
const IntroduceMassageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
  @media screen and (max-width: 768px) {
    width: 70vw;
  }
`;

const ImageContainer = styled.div`
  padding: 2vw;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MobileImageContainer = styled.div`
  padding: 2vw;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 2.2rem;
  font-weight: 600;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    line-height: 2rem;
  }
`;

const SloganContainer = styled.div`
  background-color: #000069;
  padding-top: 10vh;
  padding-bottom: 10vh;
  display: flex;
  gap: 40px;
  flex-direction: column;
  width: 139.4%;
  margin-left: -21.5vw;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.7);
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const SloganMassage = styled.div`
  display: flex;
  justify-content: center;
  color: #e0e7e9;
  font-size: 60px;
  font-weight: 700;

  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const VisionContainer = styled.div`
  border-color: #000069;
  padding-top: 10vh;
  padding-bottom: 10vh;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const VisionMassageContainer = styled.div`
  padding-bottom: 5vh;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #000069;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const IconContainer = styled.div`
  display: flex;
  padding-top: 5vh;
  flex-direction: row;
  justify-content: center;
`;

const MainIconContainer = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 3%;
  padding-bottom: 3%;
  margin-left: 3vw;
  margin-right: 3vw;
  border-style: solid;
  border-width: 1px;
  border-color: #000069;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  color: #000069;
`;

const MainIConMassageContainer = styled.div`
  display: flex;
  margin-top: 8vh;
  font-weight: 600;
  justify-content: center;
`;

const DistinctContainer = styled.div`
  border-top-style: solid;
  border-width: 1px;
  border-color: #000069;
  padding-top: 5%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: row;
`;

const DistinctMassageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 3vw;
  padding-right: 3vw;
  flex: 1;
`;

function AboutMainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Intro>안녕하세요, SKKUDO 입니다.</Intro>
      <IntroduceContainer>
        <IntroduceMassageContainer>
          <Content>
            동아리 활동은 대학 생활의 꽃이라고도 합니다.
            <br /> 학생들은 대학 생활 동안 단순히 동아리 활동에 참여하는
            것뿐만이 아니라 동아리를 관리하면서 더 많은 것을 배우고, 소통하고,
            자신의 미래에 대해 깊은 고민을 하기도 하죠.
            <br />
            <br /> 하지만 대학교에 다양한 동아리가 있는 만큼, 주변에서 동아리
            관리로 어려움을 겪는 학우들을 쉽게 발견할 수 있습니다. 동아리의
            규모가 커지면서 동아리 부원관리에 어려움을 겪거나, 모집 기간과 같은
            동아리가 바쁜 시기 동안 수많은 일정을 조율하는데 불필요한 에너지를
            낭비하는 학우들의 모습을 보며 SKKUDO는 고민했습니다.
            <br />
            <br />
          </Content>
          <Content>
            동아리 관리자들이 더 효율적으로 동아리를 관리할 수 있는 방법이
            없을까? 동아리 부원들이 더 간편하게 동아리의 공지와 일정을 확인할 수
            있는 방법이 없을까? 동아리에 가입하고 싶은 학생들이 더 쉽게
            우리학교의 동아리를 둘러보고 지원할 수 있는 방법이 없을까?
            <br />
            <br />
            SKKUDO는 이러한 생각으로부터 출발하게 되었습니다.
          </Content>
        </IntroduceMassageContainer>
        {!isMobile ? (
          <ImageContainer>
            <img src={yul}></img>
          </ImageContainer>
        ) : null}
      </IntroduceContainer>
      {isMobile ? (
        <MobileImageContainer>
          <img src={yul}></img>
        </MobileImageContainer>
      ) : null}
      <SloganContainer>
        <SloganMassage>“Customizable, But Easy to Use.”</SloganMassage>
        <SloganMassage style={{ fontSize: "40px" }}>
          SKKUDO는 쉽고 편리하게 동아리들을 지원합니다.
        </SloganMassage>
      </SloganContainer>
      <VisionContainer>
        <VisionMassageContainer>SKKUDO의 비전</VisionMassageContainer>
        <IconContainer>
          <MainIconContainer>
            <ImWrench size="150px" color="#000069"></ImWrench>
            <MainIConMassageContainer>Customizable</MainIConMassageContainer>
          </MainIconContainer>
          <MainIconContainer>
            <TiGroupOutline size="150px" color="#000069"></TiGroupOutline>
            <MainIConMassageContainer>Communication</MainIConMassageContainer>
          </MainIconContainer>
          <MainIconContainer>
            <TbPlugConnected size="150px" color="#000069"></TbPlugConnected>
            <MainIConMassageContainer>Easy to Use</MainIConMassageContainer>
          </MainIconContainer>
        </IconContainer>
      </VisionContainer>
      <DistinctContainer>
        {!isMobile ? (
          <ImageContainer>
            <img src={myeong}></img>
          </ImageContainer>
        ) : null}
        <DistinctMassageContainer>
          <Content>
            지금까지의 동아리 관리 플랫폼은 모두 동아리 관리자에게 필요한
            서비스를 충분히 제공하지 않았습니다.
            <br />
            <br />
            동아리 관리의 내용이 형식화되어 있고, 일부 기능이 빠져 있거나
            사용하기 불편했죠. 우리 모두가 만족할 수 있는 동아리 관리 플랫폼이
            존재하지 않았던 것입니다.
            <br /> 바로 SKKUDO가 등장하기 전까지는 말이죠!
          </Content>
          <Content>
            <br />
            SKKUDO는 동아리마다 각각의 목적에 맞춰 동아리를 관리할 수 있도록
            맞춤형 관리 서비스를 지원합니다.
            <br />
            동아리의 관리의 필수 기능인 모집 관리, 공지 관리, 일정 관리, 유저
            관리, 권한 관리에 더해 가계부와 공지 및 일정 숨김기능, 관리자가
            원하는 열을 추가하는 기능까지 모두 포함되어 있습니다.
          </Content>
        </DistinctMassageContainer>
      </DistinctContainer>
      {isMobile ? (
        <MobileImageContainer>
          <img src={myeong}></img>
        </MobileImageContainer>
      ) : null}
    </>
  );
}

export default AboutMainPage;
