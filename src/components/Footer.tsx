import styled from "styled-components";
import logo from "../assets/images/skkudo_logo.png";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 400px;
  width: 100%;
  background-color: #1c3879;
  padding: 20px;
  @media screen and (max-width: 1024px) {
    display: none;
  } 
`;

const ItemContainer = styled.div`
  width: 100%;
  max-width: 1500px;
  /* background-color: whitesmoke; */
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const CompanyItem = styled.div`
  height: 100%;
  padding-top: 30px;
  width: 300px;
  margin-right: 200px;
`;

const ImgContainer = styled.img`
  width: 250px;
  @media screen and (max-width: 1024px) {
    width: 50%;
  } 
`;

const EmailContainer = styled.div`
  margin-top: 20px;
  display: flex;
  padding-left: 8px;
  align-items: center;
  gap: 10px;
  color: white;
`;

const Email = styled.div`
  color: white;
  font-size: 20px;
`;

const PlainItemContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  padding-top: 40px;
`;
const PlainItem = styled.div`
  flex: 1;
  height: 100%;
`;
const PlainTitle = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
`;
const Content = styled(Link)`
  color: white;
  font-size: 15px;
  display: block;
  text-decoration: none;
  @media screen and (max-width: 1024px) {
    font-size: 80%;
  } 
  @media screen and (max-width: 490px) {
    font-size: 50%;
  } 
`;
export default function Footer() {
  return (
    <Container>
      <ItemContainer>
        <CompanyItem>
          <ImgContainer src={logo} />
          <EmailContainer>
            <AiOutlineMail size="20px" />
            <Email>pp2lycee@naver.com</Email>
          </EmailContainer>
        </CompanyItem>
        <PlainItemContainer>
          <PlainItem>
            <PlainTitle>소개</PlainTitle>
            <ContentContainer>
              <Content to="/about/main">SKKUDO에 대해</Content>
              <Content to="/about/apply">동아리 지원</Content>
              <Content to="/about/makeclub">동아리 생성</Content>
              <Content to="/about/mypage">개인정보</Content>
              <Content to="/about/manage">동아리 관리</Content>
            </ContentContainer>
          </PlainItem>
          <PlainItem>
            <PlainTitle>서비스</PlainTitle>
            <ContentContainer>
              <Content to="/clubs">동아리 둘러보기</Content>
              <Content to="/applyClub">동아리 만들기</Content>
              <Content to="/test">체험해보기</Content>
            </ContentContainer>
          </PlainItem>
          {/* <PlainItem /> */}
        </PlainItemContainer>
      </ItemContainer>
    </Container>
  );
}
