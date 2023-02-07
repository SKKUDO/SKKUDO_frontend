import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isManageState } from "../../atoms/NavigatorAtom";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DashboardNavBar from "../../components/dashboard/DashboardNavBar";
import DashboardSidebar from "../../components/dashboard/DashboardSideBar";
import { useQuery } from "react-query";
import { getOneClub } from "../../utils/fetch/fetchClub";
import { currentClubInfoState } from "../../atoms/utilAtom";
import { ClubType } from "../../types/club";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

function ClubManagePage() {
  const [open, setOpen] = useState(false);
  const setIsManage = useSetRecoilState(isManageState);
  const setCurrentClubInfo = useSetRecoilState(currentClubInfoState);
  const navigate = useNavigate();

  const { clubID } = useParams();

  const { data } = useQuery<ClubType>(
    "getOneClub",
    () => getOneClub(clubID || ""),
    {
      onSuccess: (data) => {
        setCurrentClubInfo(data);
        // console.log(data);
      },
      onError: (error) => {
        alert("클럽정보를 불러오는중 문제가 생겼습니다");
        navigate("/");
      },
    }
  );

  useEffect(() => {
    setIsManage(true);
  }, []);

  return (
    <RootStyle>
      <DashboardNavBar isAdmin={false} onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
export default ClubManagePage;
