import { RoleType, LocationType, ColumnType } from "./common";

export interface RegisteredClubType {
  _id: string;
  clubId: string;
  role: RoleType;
  moreColumns: {
    column: ColumnType;
    value: String;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  _id: string;
  studentId: string;
  password: string;
  location: LocationType;
  registeredClubs: RegisteredClubType[];
  name: string;
  major: string;
  token: string;
  tokenExp: number;
  createdAt: Date;
  updatedAt: Date;
}