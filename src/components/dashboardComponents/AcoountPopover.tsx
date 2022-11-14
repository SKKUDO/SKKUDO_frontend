import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import MenuPopover from "./MenuPopover";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../atoms/userAtom";
import { RoleType } from "../../types/common";
// components
// // mocks_
// import account from '../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    linkTo: "/",
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    linkTo: "#",
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    linkTo: "#",
  },
];

export default function AccountPopover() {
  const { clubID } = useParams();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const [userRole, setUserRole] = useState<RoleType>("부원");

  useEffect(() => {
    if (loggedInUser) {
      const registedClubs = new Map(
        Object.entries(loggedInUser.registeredClubs)
      );
      setUserRole(registedClubs.get(clubID || "").role);
      // setSpecificInfo({
      //   role: registedClubs.get(clubID || "").role,
      //   moreColumns: registedClubs.get(clubID || "").moreColumns,
      // });
    }
  }, [loggedInUser]);

  const account = {
    displayName: "Jaydon Frankie",
    email: "demo@minimals.cc",
    photoURL: "/static/mock-images/avatars/avatar_default.jpg",
  };

  const anchorRef = useRef(null);

  const [open, setOpen] = useState<EventTarget | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {loggedInUser?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {userRole}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
