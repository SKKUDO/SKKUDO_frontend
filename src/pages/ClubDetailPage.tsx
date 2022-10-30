import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isManageState } from "../atoms/NavigatorAtom";
import ClubDetailNavigator from "../components/ClubDetailNavigator";

function ClubDetailPage() {
  const setIsManage = useSetRecoilState(isManageState);
  useEffect(() => {
    setIsManage(false);
  }, []);

  return (
    <>
      <ClubDetailNavigator />
      <Outlet />
    </>
  );
}

export default ClubDetailPage;
