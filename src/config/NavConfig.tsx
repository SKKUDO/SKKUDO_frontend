// component

import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} width={22} height={22} />
);

const navConfig = [
  {
    title: "Dashboard/메인화면",
    path: "/manage/:clubID/main",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "User/멤버관리",
    path: "/manage/:clubID/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Club/동아리관리",
    path: "/manage/:clubID/club",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: "Auth/권한관리",
    path: "/manage/:clubID/auth",
    icon: getIcon("material-symbols:key"),
  },
  {
    title: "Recruit/모집관리",
    path: "/manage/:clubID/recruit",
    icon: getIcon("material-symbols:person-add"),
  },
  {
    title: "AccountBook/가계부",
    path: "/manage/:clubID/accountBook",
    icon: getIcon("fa-solid:money-check-alt"),
  },
  // {
  //   title: "Not found/",
  //   path: "/404",
  //   icon: getIcon("eva:alert-triangle-fill"),
  // },
];

export default navConfig;
