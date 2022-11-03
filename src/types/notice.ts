import { UserType } from "./user";

export interface NoticeTagType {
  _id: string;
  clubId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewNoticeTagType {
  clubId: string;
  name: string;
}

export interface NewNoticeType {
  clubId: string;
  title: string;
  content: string;
  writer: string;
  tags: NoticeTagType[];
}
export interface NoticeType {
  _id: string;
  writer: string;
  clubId: string; //동아리 ID
  title: string; //제목
  content: string; //내용
  tags: NoticeTagType[]; //태그
  createdAt: Date;
  updatedAt: Date;
}

export interface ClickedNoticeInfoType {
  writer: string;
  title: string;
  content: string;
}

export interface DeleteNoticetype {
  clubID: string;
  noticeID: string;
}

export interface UpdateNoticeType extends NewNoticeType {
  noticeID: string;
}
