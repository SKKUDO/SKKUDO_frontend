import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AboutSideBar from "../../components/about/AboutSideBar";

const AboutContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  background-color: whitesmoke;
  width: 100%;
  max-width: 90vw;
  padding-top: 20vh;
  min-height: 100%;
  margin: 0 auto;
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  padding-left: 2vw;
  padding-right: 2vw;
  flex: 1;
  flex-direction: column;
  overflow-x: visible;
`;

function AboutPage() {
  return (
    <AboutContainer>
      <AboutSideBar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </AboutContainer>
  );
}

export default AboutPage;
