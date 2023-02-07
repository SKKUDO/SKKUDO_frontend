import { useQuery } from "react-query";
import styled from "styled-components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Box } from "@mui/material";
import { NotAcceptedClubType } from "../../types/club";
import NotAcceptedClubDialog from "../../components/admin/NotAcceptedClubDialog";
import { useState } from "react";
import { getNotAcceptedClubs } from "../../utils/fetch/fetchClub";
import { PageTitle } from "../../components/admin/PageTitle";

export default function ClubCreatePage() {
  const [open, setOpen] = useState(false);
  const [clickedClub, setClickedClub] = useState<NotAcceptedClubType>();
  const { data } = useQuery<NotAcceptedClubType[]>(
    "getNotAcceptedClubs",
    getNotAcceptedClubs,
    {
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: (error) => console.log(error),
    }
  );

  const handleClubItemClick = (club: NotAcceptedClubType) => {
    setOpen(true);
    setClickedClub(club);
  };
  return (
    <>
      <PageTitle>새 동아리 신청서</PageTitle>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1024,
          bgcolor: "background.paper",
          margin: "0 auto",
        }}
      >
        <List>
          {data
            ? data.map((newClub) => (
                <ListItem key={newClub._id} disablePadding>
                  <ListItemButton onClick={() => handleClubItemClick(newClub)}>
                    <ListItemText primary={newClub.name} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
        </List>
      </Box>
      <NotAcceptedClubDialog
        open={open}
        setOpen={setOpen}
        clickedClub={clickedClub}
      />
    </>
  );
}
