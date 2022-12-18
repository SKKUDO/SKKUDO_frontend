import { Collapse, List, ListItemButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AboutSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 100%;
`;

const NestedListHeader = styled.div`
  color: #0c4426;
  font-size: 20px;
  font-weight: 800;
`;

const MenuLink = styled(Link)`
  color: #0c4426;
  text-decoration: none;
  font-size: 15px;
  font-weight: 800;
`;

function AboutSideBar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
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
        <ListItemButton onClick={handleClick} sx={{ paddingTop: "15px" }}>
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
  );
}

export default AboutSideBar;