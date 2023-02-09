import styled from "@emotion/styled";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../atoms/userAtom";
import { NoticeTagType } from "../types/notice";
import ClubDetailHeader from "../components/ClubDetailHeader";
import {
  createNotice,
  getNoticeTagsByClubID,
} from "../utils/fetch/fetchNotice";

const AddNoticePageContainer = styled("form")({
  width: "100%",
  maxWidth: "90%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  position: "relative",
});

const TitleInput = styled("input")({
  width: "80%",
  height: "50px",
  margin: "0 auto",
  marginBottom: "20px",
  marginTop: "20px",
  borderRadius: "5px",
  backgroundColor: "#fff",
  color: "#000069",
  border: "2px solid",
  fontSize: "1.5rem",
  paddingLeft: "10px",
});

const ContentInput = styled("textarea")({
  backgroundColor: "#fff",
  margin: "0 auto",
  marginTop: "20px",
  border: "2px solid #000069",
  fontSize: "1.2rem",
  borderRadius: "5px",
  padding: "10px",
  width: "80%",
});

const ButtonContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "right",
  marginTop: "40px",
});
const AddButton = styled(Button)({
  width: "200px",
  color: "white",
  marginBottom: "40px",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let rawTags: string[] = [];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AddNoticePage() {
  const navigate = useNavigate();
  const { clubID } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useRecoilValue(userInfoState);

  const [private_, setPrivate] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);

  const theme = useTheme();
  const queryClient = useQueryClient();

  const { data } = useQuery<NoticeTagType[]>(
    "getNoticeTagsByClubID",
    () => getNoticeTagsByClubID(clubID || ""),
    {
      onSuccess: (data) => {
        const temp: string[] = [];
        data.forEach((tag) => temp.push(tag.name));
        rawTags = temp;
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const { mutate } = useMutation(
    () =>
      createNotice({
        clubId: clubID || "",
        title,
        content,
        writer: user.name,
        noticeTags: tags,
        private: private_,
      }),
    {
      onSuccess: (data) => {
        navigate(`/club/${clubID}/notice`);
        queryClient.invalidateQueries("getNoticesByClubID");
        // console.log(data);
      },
      onError: (error: any) => {
        alert(error.response.data.error);
      },
    }
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const handleNewNoticeSubmit = () => {
    if (data) {
      mutate();
    }
  };

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // const { mutate } = useMutation(() => );
  return (
    <AddNoticePageContainer>
      <ClubDetailHeader pageType="공지사항 추가" />
      <TitleInput
        required
        onChange={handleTitleChange}
        placeholder={"공지 제목"}
      />
      <FormControl sx={{ m: 1, width: "80%", margin: "0 auto" }}>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{ margin: 0, padding: 0 }}
        >
          공지 카테고리
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tags}
          onChange={handleTagsChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          sx={{ marginBottom: "20px" }}
          renderValue={(selected) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {rawTags.map((selectedTag, idx) => (
            <MenuItem
              key={idx}
              value={selectedTag}
              style={getStyles(selectedTag, tags, theme)}
            >
              {selectedTag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: "80%", margin: "0 auto" }}>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{ margin: 0, padding: 0 }}
        >
          공개 여부
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={private_}
          label="공개 여부"
          onChange={(e) => {
            const result: boolean = e.target.value === "true" ? true : false;
            setPrivate(result);
          }}
        >
          <MenuItem value={"false"}>공개</MenuItem>
          <MenuItem value={"true"}>비공개</MenuItem>
        </Select>
      </FormControl>
      <ContentInput required rows={22} onChange={handleContentChange} />
      <ButtonContainer>
        <AddButton
          variant="contained"
          color="success"
          onClick={handleNewNoticeSubmit}
        >
          공지 추가하기
        </AddButton>
      </ButtonContainer>
    </AddNoticePageContainer>
  );
}

export default AddNoticePage;
