import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedInState } from "../atoms/loginAtom";
import { loggedInUserState, userInfoState } from "../atoms/userAtom";
import { VerifyUserResponseType } from "../types/user";
import { verifyUser } from "../utils/fetch/fetchAuth";

export default function PrivateRoute() {
  const [cookies, setCookies, removeCoolies] = useCookies(["x_auth"]);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const navigate = useNavigate();

  const setUserInfoState = useSetRecoilState(userInfoState);
  const setLoggedInUser = useSetRecoilState(loggedInUserState);
  const { mutate } = useMutation<VerifyUserResponseType>(verifyUser, {
    onSuccess: (data) => {
      setIsLoggedIn(true);

      setUserInfoState({
        userId: data.authUser.userID,
        studentId: data.authUser.studentId,
        name: data.authUser.name,
        major: data.authUser.major,
        contact: data.authUser.contact,
      });
      setLoggedInUser(data.authUser);
    },
    onError: (error: any) => {
      setIsLoggedIn(false);

      setUserInfoState({
        userId: "",
        studentId: "",
        name: "",
        major: "",
        contact: "",
      });
      navigate("/login");
    },
  });

  useEffect(() => {
    mutate();
  }, []);

  // return cookies["x_auth"] ? <Outlet /> : <Navigate replace to="/login" />;
  return <Outlet />;
}
