import { useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { getOneClub } from "../utils/fetch";
import { useQuery } from "react-query";
import { ClubType } from "../types/club";

const NavigationButton = styled.button`
  position: fixed;
  right: 0;
  background-color: transparent;
  border: none;
  margin: 10px;
  padding-top: 80px;
`;

const DrawerTitle = styled.div`
  width: 300px;
`;

const NavigateToManagePageButton = styled.button`
  width: 100%;
  height: 60px;
  background-color: transparent;
  border: none;
  text-align: start;
  padding-left: 15px;

  :hover {
    background-color: #fbf7f7;
  }
`;

const navigationList = [
  { navigationTitle: "공지사항", navigationPath: "notice" },
  { navigationTitle: "동아리 일정", navigationPath: "calendar" },
  { navigationTitle: "동아리 멤버", navigationPath: "members" },
];

function ClubDetailNavigator() {
  const { clubID } = useParams();
  localStorage.setItem("currentClubID", clubID || "");
  const { data: clubData, isLoading: isClubLoading } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || "")
  );

  const [state, setState] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => setState(open);

  const list = () => (
    <Box
      sx={{}}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <DrawerTitle>{isClubLoading ? "" : clubData?.name}</DrawerTitle>
      <Divider />
      <List>
        {navigationList.map((navigationItem, index) => (
          <ListItem key={navigationItem.navigationTitle} disablePadding>
            <ListItemButton
              onClick={() => navigate(navigationItem.navigationPath)}
            >
              <ListItemText primary={navigationItem.navigationTitle} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <NavigateToManagePageButton
        onClick={() => navigate(`/manage/${clubID}/main`)}
      >
        <ListItemText>동아리 관리</ListItemText>
      </NavigateToManagePageButton>
    </Box>
  );
  return (
    <React.Fragment>
      <NavigationButton onClick={() => toggleDrawer(true)}>
        <AiOutlineMenu size="2rem" />
      </NavigationButton>
      <Drawer anchor="right" open={state} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}

export default ClubDetailNavigator;
