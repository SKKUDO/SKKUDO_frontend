import styled from "styled-components";
import logo from "../assets/images/skkudo_logo.png";
import { AiOutlineMail } from "react-icons/ai";

const Container = styled.div`
  height: 400px;
  width: 100%;
  background-color: #1c3879;
  padding: 20px;
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
`;

const ImgContainer = styled.img`
  width: 200px;
  /* @media screen and (max-width: 1024px) {
    width: 20%;
  } */
`;

const EmailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: white;
`;

const Email = styled.div`
  color: white;
  font-size: 20px;
`;

export default function Footer() {
  return (
    <Container>
      <ItemContainer>
        <CompanyItem>
          <ImgContainer src={logo} />
          <EmailContainer>
            <AiOutlineMail size="20px" />
            <Email>rixhcire@gmail.com</Email>
          </EmailContainer>
        </CompanyItem>
      </ItemContainer>
    </Container>
  );
}
