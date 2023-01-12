import { Grid } from "@mui/material";
import ClubCard from "./ClubCard";
import { ClubType } from "../../types/club";

interface IClubsList {
  clubs: ClubType[];
  [x: string]: any;
}

export default function ClubsList({ clubs, ...other }: IClubsList) {
  return (
    <Grid sx={{ marginBottom: "40px" }} container spacing={3} {...other}>
      {clubs.map((club) => (
        <Grid key={club._id} item xs={12} sm={6} md={3}>
          <ClubCard club={club} />
        </Grid>
      ))}
    </Grid>
  );
}
