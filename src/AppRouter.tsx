import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navigator from "./components/Navigator";
import AboutPage from "./pages/aboutPages/AboutPage";
import CalendarPage from "./pages/CalendarPage";
import ClubDetailPage from "./pages/ClubDetailPage";
import ClubManagePage from "./pages/managePages/ClubManagePage";
import ClubsPage from "./pages/ClubsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ManageRecruit from "./pages/managePages/ManageRecruit";
import ManageUser from "./pages/managePages/ManageUser";
import MembersPage from "./pages/MembersPage";
import MyPage from "./pages/MyPage";
import NoticePage from "./pages/NoticePage";
import Page404 from "./pages/Page404";
import SignupPage from "./pages/SignupPage";
import ManageAuth from "./pages/managePages/ManageAuth";
import ManageNotes from "./pages/managePages/ManageNotes";
import DashboardApp from "./pages/managePages/DashboardApp";
import ApplyClubPage from "./pages/ApplyClubPage";
import AddNoticePage from "./pages/AddNoticePage";
import { useRecoilValue } from "recoil";
import { isLoggedInState } from "./atoms/loginAtom";
import UpdateNoticePage from "./pages/UpdateNoticePage";
import ApplyPage from "./pages/ApplyPage";
import ManageClub from "./pages/managePages/ManageClub";
import ProfilePage from "./pages/ProfilePage";
import ManageAccountBook from "./pages/managePages/ManageAccountBook";
import AboutMainPage from "./pages/aboutPages/AboutMainPage";
import AboutApplyPage from "./pages/aboutPages/AboutApplyPage";
import AboutClubManagePage from "./pages/aboutPages/AboutClubManagePage";
import AboutMakeClubPage from "./pages/aboutPages/AboutMakeClubPage";
import AboutMyPage from "./pages/aboutPages/AboutMyPage";
import AdminMainPage from "./pages/admin/AdminMainPage";
import ClubCreatePage from "./pages/admin/ClubCreatePage";
import AllUsersPage from "./pages/admin/AllUsersPage";
import AllNoticesPage from "./pages/admin/AllNoticesPage";
import AllCalendarPage from "./pages/admin/AllCalendarPage";
import AllClubsPage from "./pages/admin/AllClubsPage";
import AdminClubDetailPage from "./pages/admin/AdminClubDetailPage";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/PublicRoute";
import TestPage from "./pages/TestPage";

function AppRouter() {
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/about" element={<AboutPage />}>
            <Route path="main" element={<AboutMainPage />} />
            <Route path="apply" element={<AboutApplyPage />} />
            <Route path="makeclub" element={<AboutMakeClubPage />} />
            <Route path="mypage" element={<AboutMyPage />} />
            <Route path="manage" element={<AboutClubManagePage />} />
          </Route>
          <Route path="/test" element={<TestPage />} />
        </Route>

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate replace to="/" /> : <LoginPage />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/applyClub"
          element={
            isLoggedIn ? <ApplyClubPage /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/apply/:clubID"
          element={
            isLoggedIn ? <ApplyPage /> : <Navigate replace to="/login" />
          }
        />

        <Route path="/myPage" element={<MyPage />} />
        <Route path="/club/:clubID" element={<ClubDetailPage />}>
          <Route path="notice" element={<NoticePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="notice/add" element={<AddNoticePage />} />
          <Route path="notice/:noticeID" element={<UpdateNoticePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="/manage/:clubID" element={<ClubManagePage />}>
          <Route path="main" element={<DashboardApp />} />
          <Route path="user" element={<ManageUser />} />
          <Route path="recruit" element={<ManageRecruit />} />
          <Route path="auth" element={<ManageAuth />} />
          <Route path="notes" element={<ManageNotes />} />
          <Route path="club" element={<ManageClub />} />
          <Route path="accountBook" element={<ManageAccountBook />} />
        </Route>
        <Route path="/admin/" element={<AdminMainPage />}>
          <Route path="clubCreate" element={<ClubCreatePage />} />
          <Route path="allUsers" element={<AllUsersPage />} />
          <Route path="allNotices" element={<AllNoticesPage />} />
          <Route path="allCalendar" element={<AllCalendarPage />} />
          <Route path="allClubs" element={<AllClubsPage />} />
          <Route path="clubDetail/:clubID" element={<AdminClubDetailPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
