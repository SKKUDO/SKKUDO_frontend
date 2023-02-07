import { Card, Container } from "@mui/material";
import ClubDetailHeader from "../components/ClubDetailHeader";
import UserTable from "../components/user/UserTable";

export default function User() {
  return (
    <>
      <ClubDetailHeader pageType={"동아리원"} />
      <Card
        sx={{
          margin: "0 auto",
          marginTop: "80px",
          width: "80%",
          maxWidth: "100%",
        }}
      >
        <UserTable isManage={false} />
      </Card>
    </>
  );
}
