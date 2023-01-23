import { ColumnType } from "./common";

export interface ApplierType {
  _id: string;
  clubId: string;
  documentQuestions: string[]; //서류 질문
  interviewQuestions: string[]; //면접 질문
  appliedUserColumns: ColumnType[];
  createdAt: Date;
  updatedAt: Date;
}

export type NewApplierType = Pick<
  ApplierType,
  "clubId" | "documentQuestions" | "interviewQuestions" | "appliedUserColumns"
>;
interface AdditionalAppliedUserType {
  _id: string;
  interviewAnswers: string[]; //면접 답변
  pass?: boolean; //합불여부
  createdAt?: Date;
  updatedAt?: Date;
}

export type AppliedUserType = Omit<ApplyFormType, "clubName"> &
  AdditionalAppliedUserType;

export interface ApplyFormType {
  clubId: string;
  clubName: string;
  userID: string;
  studentId: string;
  name: string;
  major: string;
  contact: string;
  moreColumns: {
    column: ColumnType;
    value: String;
  }[];
  documentAnswers: string[]; //서류 답변
  documentScores: number[]; //서류 점수
  interviewScores: number[]; //면접 점수
}

export interface NewAppliedUserColumnsType {
  key: string;
  valueType: string;
  _id?: string;
}
export interface UpdateApplierType {
  documentQuestions?: string[]; //서류 질문
  interviewQuestions?: string[]; //면접 질문
  appliedUserColumns?: { key: string; valueType: string; _id?: string }[];
}

export type UpdateAppliedUserType = Pick<
  AppliedUserType,
  "documentScores" | "interviewScores" | "clubId"
>;
