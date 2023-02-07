export interface NoticeTagType {
  _id: string;
  clubId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NewNoticeTagType = Pick<NoticeTagType, "clubId" | "name">;

export interface NoticeType {
  _id: string;
  writer: string;
  private: boolean;
  clubId: string; //동아리 ID
  title: string; //제목
  content: string; //내용
  noticeTags: string[]; //태그
  createdAt: Date;
  updatedAt: Date;
}

export type NewNoticeType = Omit<NoticeType, "_id" | "createdAt" | "updatedAt">;
export interface ClickedNoticeInfoType {
  writer: string;
  title: string;
  content: string;
  noticeTags: string[]; //태그
  _id?: string;
  clubId?: string;
}

export type DeleteNoticeType = Pick<NoticeType, "clubId" | "_id">;

export type UpdateNoticeType = Omit<NoticeType, "createdAt" | "updatedAt">;
