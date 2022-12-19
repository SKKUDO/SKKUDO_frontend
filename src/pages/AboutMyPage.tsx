import styled from "styled-components";
import mypage from "../assets/images/mypage/mypage.png";

const AboutMyPageContainer = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  flex: 1;
`;

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5%;
  padding-bottom: 5%;
`;

const MyPageMassageContainer = styled.div`
  font-size: 18px;
  line-height: 50px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-bottom: 60px;
`;

const MyPageImageContainer = styled.div`
  padding-left: 5%;
  margin-bottom: 60px;
`;

function AboutMyPage() {
  return (
    <AboutMyPageContainer>
      <MyPageContainer>
        <MyPageMassageContainer>
          상단 메뉴에서 My Page를 클릭하시면 오른쪽 그림과 같이 개인정보를
          확인하실 수 있습니다.
        </MyPageMassageContainer>
        <MyPageImageContainer>
          <img src={mypage}></img>
        </MyPageImageContainer>
        <MyPageMassageContainer>
          해당 페이지에서는 개인정보 뿐만 아니라 소속 동아리 및 지원중인
          동아리에 대한 정보도 함께 확인할 수 있습니다!
        </MyPageMassageContainer>
      </MyPageContainer>
    </AboutMyPageContainer>
  );
}

export default AboutMyPage;
