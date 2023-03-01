import { useRef, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Dialog,
  styled,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import Iconify from "../Iconify";
import { RoleType } from "../../types/common";
import { useMutation, useQueryClient } from "react-query";
import { deregisterClub, updateRole } from "../../utils/fetch/fetchUser";
// component

const MainWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // width: "400px",
  height: "200px",
});

const SelectWrapper = styled("div")({ width: 200 });

const SubmitButtonWrapper = styled("div")({ marginTop: 30, display: "flex" });

const ButtonWrapper = styled("div")({
  padding: "10px",
  display: "flex",
  justifyContent: "flex-end",
});

const ModalTitle = styled("h1")({
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  color: "darkgreen",
  marginTop: "5px",
  marginBottom: "30px",
});

// ----------------------------------------------------------------------

interface UserMoreMenuProps {
  userID: string;
  role: RoleType;
}

export default function UserMoreMenu({ userID, role }: UserMoreMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [updateRoleModalOpen, setUpdateRoleModalOpen] =
    useState<boolean>(false);
  const [updatingRole, setUpdatingRole] = useState<RoleType>(role);

  const clubId = useParams().clubID as string;
  const queryClient = useQueryClient();

  const { mutate: deregisterMutate } = useMutation(
    () => deregisterClub(userID, clubId),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("getClubMembers");
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );
  const handleUpdateRole = () => {
    updateRole(clubId, userID, updatingRole)
      .then(() => {
        alert("역할을 수정했습니다.");
        window.location.reload();
      })
      .catch((error) => alert(error.response.data.error));
  };

  const handleDeregisterBtnClick = () => {
    deregisterMutate();
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
          onClick={() => setUpdateRoleModalOpen(true)}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="역할 수정"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
          onClick={handleDeregisterBtnClick}
        >
          <ListItemIcon>
            <Iconify icon="fluent-mdl2:release-gate" width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="방출하기"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
      </Menu>

      <Dialog
        open={updateRoleModalOpen}
        onClose={() => setUpdateRoleModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth
      >
        <MainWrapper>
          <ModalTitle>유저의 역할 수정</ModalTitle>
          <SelectWrapper>
            <FormControl fullWidth>
              <InputLabel color="success" id="demo-simple-select-label">
                수정할 열 선택
              </InputLabel>

              <Select
                value={updatingRole}
                onChange={(e) => setUpdatingRole(e.target.value as RoleType)}
                color="success"
                id="demo-simple-select"
                label="열 형식"
                margin="dense"
              >
                <MenuItem value={"회장"}>회장</MenuItem>
                <MenuItem value={"부회장"}>부회장</MenuItem>
                <MenuItem value={"운영진"}>운영진</MenuItem>
                <MenuItem value={"부원"}>부원</MenuItem>
              </Select>
            </FormControl>
          </SelectWrapper>
          <SubmitButtonWrapper>
            <Button
              color="success"
              variant="contained"
              onClick={() => handleUpdateRole()}
            >
              역할 수정
            </Button>
          </SubmitButtonWrapper>
        </MainWrapper>
        <ButtonWrapper>
          <Button color="success" onClick={() => setUpdateRoleModalOpen(false)}>
            CLOSE
          </Button>
        </ButtonWrapper>
      </Dialog>
    </>
  );
}
