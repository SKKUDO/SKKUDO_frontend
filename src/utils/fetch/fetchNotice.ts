import axios from "axios";
import {
  DeleteNoticeType,
  NewNoticeTagType,
  NewNoticeType,
  UpdateNoticeType,
} from "../../types/notice";
import { BASE_URL } from "./fetch";

const GET_ALL_NOTICES_URL = `${BASE_URL}/notices/notices`;

export const getAllNotices = async () =>
  axios.get(GET_ALL_NOTICES_URL).then((res) => res.data.data);

export const getNoticesByClubID = async (clubID: string) =>
  axios
    .get(GET_ALL_NOTICES_URL.concat("/club/", clubID))
    .then((res) => res.data.data);

export const createNotice = async (newNotice: NewNoticeType) =>
  axios.post(GET_ALL_NOTICES_URL, newNotice).then((res) => res.data);

export const deleteNotice = async (deleteNoticeInfo: DeleteNoticeType) =>
  axios
    .delete(GET_ALL_NOTICES_URL.concat("/", deleteNoticeInfo._id), {
      data: { clubId: deleteNoticeInfo.clubId },
    })
    .then((res) => res.data);

export const updateNotice = async (newNotice: UpdateNoticeType) =>
  axios
    .patch(GET_ALL_NOTICES_URL.concat("/", newNotice._id), newNotice)
    .then((res) => res.data);

const GET_ALL_NOTICE_TAGS_URL = `${BASE_URL}/notices/noticeTags`;

export const createNoticeTag = async (newNoticeTag: NewNoticeTagType) =>
  axios.post(GET_ALL_NOTICE_TAGS_URL, newNoticeTag).then((res) => res.data);

export const getNoticeTagsByClubID = async (clubID: string) =>
  axios
    .get(GET_ALL_NOTICE_TAGS_URL.concat("/", clubID))
    .then((res) => res.data.data)
    .catch((error) => console.log(error));

export const deleteNoticeTag = async (deleteNoticeTagInfo: DeleteNoticeType) =>
  axios
    .delete(GET_ALL_NOTICE_TAGS_URL.concat("/", deleteNoticeTagInfo._id), {
      data: { clubId: deleteNoticeTagInfo.clubId },
    })
    .then((res) => res.data);
