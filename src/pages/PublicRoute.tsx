import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoggedInState } from "../atoms/loginAtom";
import { loggedInUserState, userInfoState } from "../atoms/userAtom";
import Footer from "../components/Footer";
import { VerifyUserResponseType } from "../types/user";
import { verifyUser } from "../utils/fetch/fetchAuth";

export default function PublicRoute() {
  const [cookies, setCookies, removeCoolies] = useCookies(["x_auth"]);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

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
    },
  });

  useEffect(() => {
    if (cookies["x_auth"]) {
      mutate();
    }
  }, []);
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
