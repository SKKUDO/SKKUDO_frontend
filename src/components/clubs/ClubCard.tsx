import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Card, Link, Typography, Stack, Button } from "@mui/material";
import Sunkyun from "./../../assets/images/sunkyun.png";
import { styled } from "@mui/material/styles";
import { ClubType } from "../../types/club";
import { motion } from "framer-motion";
import { BASE_URL } from "../../utils/fetch/fetch";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const ClubInfoContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const CardOverlay = styled(motion.div)({
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  opacity: 0,
  justifyContent: "center",
  alignItems: "center",
  zIndex: "20",
});

const ApplyBtn = styled(Button)({
  fontSize: "20px",
});
interface IClubCard {
  club: ClubType;
}

export default function ClubCard({ club }: IClubCard) {
  const { _id, name, location, type, image } = club;
  const navigate = useNavigate();
  const onApplyBtnClick = () => {
    navigate(`/apply/${_id}`, { state: name });
  };
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        <ProductImgStyle
          alt={name}
          src={image ? BASE_URL + "/" + image : Sunkyun}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="h4" noWrap sx={{ color: "#000069" }}>
            {name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <ClubInfoContainer>
            <Typography
              component="span"
              variant="h5"
              sx={{
                color: "#1c3879",
              }}
            >
              {type && type.hasOwnProperty("name") && type.name}
            </Typography>
            <Typography
              component="span"
              variant="h5"
              sx={{
                color: "#1c3879",
              }}
            >
              {location}
            </Typography>
          </ClubInfoContainer>
        </Stack>
      </Stack>
      <CardOverlay whileHover={{ opacity: 1 }}>
        <ApplyBtn variant="contained" color="success" onClick={onApplyBtnClick}>
          지원하기
        </ApplyBtn>
      </CardOverlay>
    </Card>
  );
}
