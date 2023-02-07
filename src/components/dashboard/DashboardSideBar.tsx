import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Link, Drawer, Typography, Avatar } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import Scrollbar from "./Scrollbar";
import NavSection from "./NavSection";
import navConfig from "../../config/NavConfig";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../atoms/userAtom";
import { ColumnType, RoleType } from "../../types/common";

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "#000069",
}));

const Logo = styled(RouterLink)({
  color: "white",
  textDecoration: "none",
  fontSize: "50px",
  fontWeight: 900,
  marginBottom: "30px",
});

interface IDashboardSidebar {
  isOpenSidebar: boolean;
  onCloseSidebar(): void;
}
export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
}: IDashboardSidebar) {
  const account = {
    displayName: "Jaydon Frankie",
    email: "demo@minimals.cc",
    photoURL: "/static/mock-images/avatars/avatar_default.jpg",
  };

  // const { pathname } = useLocation();
  const { clubID } = useParams();

  const isDesktop = useResponsive("up", "lg");

  const loggedInUser = useRecoilValue(loggedInUserState);
  const [specificInfo, setSpecificInfo] = useState<{
    role: RoleType;
    moreColumns: {
      column: ColumnType;
      value: String;
    }[];
  }>();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    if (loggedInUser) {
      const registedClubs = new Map(
        Object.entries(loggedInUser.registeredClubs)
      );
      setSpecificInfo({
        role: registedClubs.get(clubID || "").role,
        moreColumns: registedClubs.get(clubID || "").moreColumns,
      });
    }
  }, [loggedInUser]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo to="/">SKKUDO</Logo>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link
          underline="none"
          component={RouterLink}
          to={`/club/${clubID}/profile`}
        >
          <AccountStyle>
            <Avatar src={account.photoURL} alt="" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" sx={{ color: "#e0e7e9" }}>
                {loggedInUser?.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#e0e7e9" }}>
                {specificInfo?.role}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "#1c3879",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "#1c3879",
              color: "white",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
