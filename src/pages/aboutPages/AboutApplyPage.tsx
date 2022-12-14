import styled from "styled-components";
import apply1 from "../../assets/images/apply/apply1.png";
import apply2 from "../../assets/images/apply/apply2.png";

const FirstApplyContainer = styled.div`
  padding-top: 5%;
  padding-bottom: 5%;
`;
const FirstApplyMassageContainer = styled.div`
  font-size: 1.5em;
  line-height: 2em;
  font-weight: 600;
  margin-left: 17vw;
  margin-bottom: 10%;
  width: 80%;
   @media screen and (max-width: 1660px){
      margin-left: 10vw;
  }
   @media screen and (max-width: 768px){
      font-size: 1rem;
      line-height: 2rem;
      margin-left: 6vw;
      width: 90%;
  }
`;
const FirstApplyImageContainer = styled.div`
  width: 80%;
  margin-left: 20%;
   @media screen and (max-width: 1660px){
      margin-left: 13%;
  }
`;
const SecondApplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5%;
  padding-bottom: 5%;
`;
const SecondApplyMassageContainer = styled.div`
  font-size: 1.5rem;
  line-height: 3rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 14vh;
  margin-top: 5vh;
   @media screen and (max-width: 768px){
      font-size: 0.9rem;
      line-height: 2rem;
  }
`;
const SecondApplyImageContainer = styled.div`
   margin-left: 15%;
   margin-right: 10vw;
   display: flex;
   margin-bottom: 10vh;
   @media screen and (max-width: 1660px){
    margin-left: 10%;
    margin-right: 6vw;
  }
`;

function AboutApplyPage() {
  return (
    <>
      <FirstApplyContainer>
        <FirstApplyMassageContainer>
          <br />
          <br />
          SKKUDO에서는 현재 SKKUDO에 등록된 다양한 동아리들을 확인할 수
          있습니다.
        </FirstApplyMassageContainer>
        <FirstApplyImageContainer>
          <img src={apply1}></img>
        </FirstApplyImageContainer>
      </FirstApplyContainer>
      <SecondApplyContainer>
        <SecondApplyMassageContainer>
          지원하고 싶은 동아리에 마우스를 올려서 "지원하기" 버튼을 눌러주세요!
        </SecondApplyMassageContainer>
        <SecondApplyImageContainer>
          <img src={apply2}></img>
        </SecondApplyImageContainer>
        <SecondApplyMassageContainer>
          그러면 위에 그림처럼 해당 동아리의 지원서가 나타납니다.
          <br /> 지원서를 동아리에 대한 자신의 열정을 마음껏 표출해주세요!
          <br /> 지원서가 성공적으로 제출되면 이제 해당 동아리 관리자의 결정을
          기다리기만 하면 됩니다!!
        </SecondApplyMassageContainer>
      </SecondApplyContainer>
    </>
  );
}

export default AboutApplyPage;
