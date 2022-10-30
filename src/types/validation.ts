import { RoleType } from "./common";

export type ValidationKeyType =
  | "clubId"
  | "noticeRead"
  | "noticeWrite"
  | "userRead"
  | "userWrite"
  | "userColumnWrite"
  | "todoRead"
  | "todoWrite"
  | "applyRead"
  | "applyWrite"
  | "validationRead"
  | "validationWrite"
  | "clubRead"
  | "clubWrite";
export interface ValidationType {
  _id: string;
  clubId: string;
  noticeRead: RoleType;
  noticeWrite: RoleType;
  userRead: RoleType;
  userWrite: RoleType;
  userColumnWrite: RoleType;
  todoRead: RoleType;
  todoWrite: RoleType;
  applyRead: RoleType;
  applyWrite: RoleType;
  validationRead: RoleType;
  validationWrite: "회장단";
  clubRead: RoleType;
  clubWrite: "회장단";
  createdAt: Date;
  updatedAt: Date;
}
