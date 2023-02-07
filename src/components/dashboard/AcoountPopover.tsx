import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedInUserState } from "../../atoms/userAtom";
import { RoleType } from "../../types/common";
import { useMutation } from "react-query";
import { isLoggedInState } from "../../atoms/loginAtom";
import { logoutFromServer } from "../../utils/fetch/fetchAuth";

export default function AccountPopover() {
  const { clubID } = useParams();
  const loggedInUser = useRecoilValue(loggedInUserState);
  const [userRole, setUserRole] = useState<RoleType>("부원");
  const navigate = useNavigate();
  const MENU_OPTIONS = [
    {
      label: "Home",
      icon: "eva:home-fill",
      linkTo: `/club/${clubID}/notice`,
    },
    {
      label: "Profile",
      icon: "eva:person-fill",
      linkTo: `/club/${clubID}/profile`,
    },
  ];

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    if (loggedInUser) {
      const registedClubs = new Map(
        Object.entries(loggedInUser.registeredClubs)
      );
      setUserRole(registedClubs.get(clubID || "").role);
    }
  }, [loggedInUser]);

  const account = {
    displayName: "Jaydon Frankie",
    email: "demo@minimals.cc",
    photoURL: "/static/mock-images/avatars/avatar_default.jpg",
  };

  const { mutate: logoutMutate } = useMutation(logoutFromServer, {
    onSuccess: (data) => {
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다");
    },
    onError: (error: any) => {
      alert(error.response.data.error);
    },
  });

  const anchorRef = useRef(null);

  const [open, setOpen] = useState<EventTarget | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  const handleLogoutBtnClick = () => {
    setOpen(null);
    logoutMutate();
    navigate("/");
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
        <Avatar src={account.photoURL} alt="" />
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
          <Typography variant="h4" noWrap>
            {loggedInUser?.name}
          </Typography>
          <Typography variant="h5" sx={{ color: "text.secondary" }} noWrap>
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
              sx={{ fontSize: "30px" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogoutBtnClick} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
