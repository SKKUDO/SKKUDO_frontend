import { PageTitle } from "../../components/admin/PageTitle";
import AllNoticeTable from "../../components/admin/AllNoticeTable";
import { Box } from "@mui/material";

export default function AllNoticesPage() {
  return (
    <>
      <PageTitle>전체 공지</PageTitle>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1024,
          bgcolor: "background.paper",
          margin: "0 auto",
        }}
      >
        <AllNoticeTable />
      </Box>
      {/* <PageTitle>동아리별로 보기</PageTitle> */}
    </>
  );
}
