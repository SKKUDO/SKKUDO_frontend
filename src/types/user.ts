import { RoleType, LocationType, ColumnType } from "./common";

export interface RegisteredClubType {
  _id: string;
  clubId: string;
  clubName: string;
  role: RoleType;
  moreColumns: {
    column: ColumnType;
    value: String;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NewUserType {
  name: string;
  studentId: string;
  userID: string;
  password: string;
  location: string;
  major: string;
}

export interface RegisteredClubs {
  [key: string]: RegisteredClubType;
}

export interface UserType {
  _id: string;
  studentId: string;
  password: string;
  location: LocationType;
  registeredClubs: RegisteredClubs;
  name: string;
  major: string;
  token: string;
  tokenExp: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerifyUserResponseType {
  authToken: string;
  authUser: UserType;
}
