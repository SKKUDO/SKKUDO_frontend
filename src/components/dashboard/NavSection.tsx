import { useState } from "react";
import PropTypes from "prop-types";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

interface IItem {
  title: string;
  path: string;
  icon: JSX.Element;
}

type navConfigType = IItem[];

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

interface INavItem {
  item: IItem;
  active(path: any): boolean;
}

function NavItem({ item, active }: INavItem) {
  const currentClubID = localStorage.getItem("currentClubID") || "";
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
    console.log("click");
  };

  const activeRootStyle = {
    color: "white",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  return (
    <ListItemStyle
      component={RouterLink}
      to={path.replace(":clubID", currentClubID)}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle sx={{ color: "white" }}>
        {icon && icon}
      </ListItemIconStyle>
      <ListItemText
        disableTypography
        sx={{ fontSize: "18px" }}
        primary={title}
      />
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

interface INavConfig {
  navConfig: navConfigType;
  [x: string]: any;
}
export default function NavSection({ navConfig, ...other }: INavConfig) {
  const { pathname } = useLocation();

  const match = (path: any) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
