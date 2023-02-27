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
import {
  AddNoticePageContainer,
  NoticeAddButton,
  NoticeButtonContainer,
  NoticeContentInput,
  NoticeTitleInput,
} from "../components/notice/Componenets";

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

  const handleNewNoticeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (data) {
      event.preventDefault();
      mutate();
    }
  };

  const handleTagsChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <AddNoticePageContainer onSubmit={handleNewNoticeSubmit}>
      <ClubDetailHeader pageType="공지사항 추가" />
      <NoticeTitleInput
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
      <NoticeContentInput required rows={22} onChange={handleContentChange} />
      <NoticeButtonContainer>
        <NoticeAddButton variant="contained" color="success" type="submit">
          공지 추가하기
        </NoticeAddButton>
      </NoticeButtonContainer>
    </AddNoticePageContainer>
  );
}

export default AddNoticePage;
