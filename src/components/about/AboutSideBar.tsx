import { Collapse, List, ListItemButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { BiMenu } from "react-icons/bi";

const AboutSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100%;
  @media screen and (max-width: 490px) {
    width: 20vw;
  }
  @media screen and (max-width: 320px) {
    width: 25vw;
  }
`;

const MobileAboutSideBarContainer = styled.div`
  margin-top: 8vh;
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: 100%;
  background-color: #e0e7e9;
`;

const NestedListHeader = styled.div`
  color: #000069;
  font-size: 20px;
  margin-top: 1vh;
  margin-left: 1vw;
  font-weight: 800;
  white-space: nowrap;
`;

const MenuLink = styled(Link)`
  color: #000069;
  text-decoration: none;
  font-size: 1.3rem;
  margin-left: 1vw;
  font-weight: 800;
  white-space: nowrap;
`;

const MobileNavigatorBtn = styled.button`
  position: absolute;
  top: 10vh;
  border: none;
  background-color: transparent;
`;

interface OverlayType {
  isOpen: boolean;
}

const Overlay = styled.div<OverlayType>`
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

function AboutSideBar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const [isMobileSideBarOpen, setIsMobileSideBarOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleMobileNavigatorBtnClick = () => {
    setIsMobileSideBarOpen(true);
  };

  const handleOverlayClick = () => {
    setIsMobileSideBarOpen(false);
  };

  return !isMobile ? (
    <AboutSideBarContainer>
      <List>
        <ListItemButton
          onClick={() => navigate("/about/main")}
          sx={{
            paddingTop: "15px",
            paddingBottom: "15px",
            borderBottom: "1px solid",
          }}
        >
          <MenuLink style={{ fontSize: "20px" }} to={"/about/main"}>
            소개
          </MenuLink>
        </ListItemButton>
        <ListItemButton
          onClick={handleClick}
          sx={{
            paddingTop: "15px",
            "@media screen and (max-width: 1200px)": { display: "none" },
          }}
        >
          <NestedListHeader>스꾸도 사용방법</NestedListHeader>
        </ListItemButton>
        <Collapse in={open}>
          <List>
            <ListItemButton onClick={() => navigate("/about/apply")}>
              <MenuLink to={"/about/apply"}>동아리 지원</MenuLink>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/about/makeclub")}>
              <MenuLink to={"/about/makeclub"}>동아리 생성</MenuLink>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/about/mypage")}>
              <MenuLink to={"/about/mypage"}>개인 정보</MenuLink>
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/about/manage")}>
              <MenuLink to={"/about/manage"}>동아리 관리</MenuLink>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </AboutSideBarContainer>
  ) : (
    <>
      <MobileNavigatorBtn onClick={handleMobileNavigatorBtnClick}>
        <BiMenu size="30px" />
      </MobileNavigatorBtn>
      <Overlay isOpen={isMobileSideBarOpen} onClick={handleOverlayClick}>
        <MobileAboutSideBarContainer>
          <List>
            <ListItemButton
              onClick={() => navigate("/about/main")}
              sx={{
                paddingTop: "15px",
                paddingBottom: "15px",
                borderBottom: "1px solid",
              }}
            >
              <MenuLink style={{ fontSize: "20px" }} to={"/about/main"}>
                소개
              </MenuLink>
            </ListItemButton>
            <ListItemButton
              onClick={handleClick}
              sx={{
                paddingTop: "15px",
                "@media screen and (max-width: 1200px)": { display: "none" },
              }}
            >
              <NestedListHeader>스꾸도 사용방법</NestedListHeader>
            </ListItemButton>
            <Collapse in={open}>
              <List>
                <ListItemButton onClick={() => navigate("/about/apply")}>
                  <MenuLink to={"/about/apply"}>동아리 지원</MenuLink>
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/about/makeclub")}>
                  <MenuLink to={"/about/makeclub"}>동아리 생성</MenuLink>
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/about/mypage")}>
                  <MenuLink to={"/about/mypage"}>개인 정보</MenuLink>
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/about/manage")}>
                  <MenuLink to={"/about/manage"}>동아리 관리</MenuLink>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </MobileAboutSideBarContainer>
      </Overlay>
    </>
  );
}

export default AboutSideBar;
