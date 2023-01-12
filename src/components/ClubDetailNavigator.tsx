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
import { getOneClub } from "../utils/fetch/fetchClub";
import { useQuery } from "react-query";
import { ClubType } from "../types/club";
import { motion } from "framer-motion";

const NavigatorContainer = styled.div`
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  padding-top: 100px;
`;

const NavigationButton = styled(motion.button)`
  background-color: transparent;
  border: none;
  border-radius: 10px;
  padding: 10px;
  color: #000069;
`;

const DrawerTitle = styled.div`
  width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;

  color: #000069;
  font-size: 25px;
  font-weight: 900;
`;

const NavigateToManagePageButton = styled.button`
  width: 100%;
  height: 60px;
  background-color: transparent;
  border: none;
  text-align: start;
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #fbf7f7;
  }
`;

const navigationList = [
  { navigationTitle: "공지사항", navigationPath: "notice" },
  { navigationTitle: "동아리 일정", navigationPath: "calendar" },
  { navigationTitle: "동아리 멤버", navigationPath: "members" },
  { navigationTitle: "내 동아리 프로필", navigationPath: "profile" },
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
      // sx={{ backgroundColor: "#e0e7e9" }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <DrawerTitle>{isClubLoading ? "" : clubData?.name}</DrawerTitle>
      <Divider />
      <List>
        {navigationList.map((navigationItem, index) => (
          <ListItem
            sx={{ color: "#000069", marginBottom: "10px" }}
            key={navigationItem.navigationTitle}
            disablePadding
          >
            <ListItemButton
              onClick={() => navigate(navigationItem.navigationPath)}
            >
              <ListItemText
                disableTypography
                sx={{ fontWeight: 800, fontSize: "22px", paddingLeft: "10px" }}
                primary={navigationItem.navigationTitle}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <NavigateToManagePageButton
        onClick={() => navigate(`/manage/${clubID}/main`)}
      >
        <ListItemText
          disableTypography
          sx={{
            color: "#000069",
            fontWeight: 800,
            fontSize: "22px",
            paddingLeft: "10px",
          }}
        >
          동아리 관리
        </ListItemText>
      </NavigateToManagePageButton>
    </Box>
  );
  return (
    <NavigatorContainer>
      <NavigationButton
        whileHover={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        onClick={() => toggleDrawer(true)}
      >
        <AiOutlineMenu size="3vh" />
      </NavigationButton>
      <Drawer anchor="right" open={state} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </NavigatorContainer>
  );
}

export default ClubDetailNavigator;
