import { Box } from "@mui/material";
import { PageTitle } from "../../components/admin/PageTitle";
import AllUsersTable from "../../components/admin/AllUsersTable";

export default function AllUsersPage() {
  return (
    <>
      <PageTitle>전체 유저</PageTitle>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1024,
          bgcolor: "background.paper",
          margin: "0 auto",
        }}
      >
        <AllUsersTable isManage={true} />
      </Box>
    </>
  );
}
