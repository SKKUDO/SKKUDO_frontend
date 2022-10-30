import { UserType } from "./user";

export interface NoticeTagType {
  _id: string;
  clubId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewNoticeType {
  clubId: string;
  title: string;
  content: string;
}
export interface NoticeType {
  _id: string;
  writer: UserType;
  clubId: string; //동아리 ID
  title: string; //제목
  content: string; //내용
  tags: NoticeTagType[]; //태그
  createdAt: Date;
  updatedAt: Date;
}
