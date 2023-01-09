import { LocationType, ColumnType } from "./common";
import { UserType } from "./user";

export type RecruitType = "정규모집" | "상시모집";

export interface ClubType {
  _id: string;
  name: string;
  location: LocationType;
  initializer: string;
  image: string;
  type: ClubTypeType;
  userColumns: ColumnType[];
  //description
  recruitType: RecruitType;
  recruitStart: string | null; //모집 시작일
  recruitEnd: string | null; //모집 종료일
  createdAt: Date;
  updatedAt: Date;
}

export interface NewClubType {
  name: string;
  location: LocationType;
  type: {
    name: string;
  };
  recruitType: RecruitType;
}

export interface NotAcceptedClubType {
  accpeted: boolean;
  initializer: string;
  name: string;
  location: string;
  recruitType: RecruitType;
  type: ClubTypeType;
  userColumn: ColumnType[];
  _id: string;
}
export interface ClubTypeType {
  _id: string;
  name: string; //프로그래밍, 경영
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateClubInfoType {
  name?: string;
  type?: { name: string };
  location?: LocationType;
  recruitType?: RecruitType;
  recruitStart?: Date;
  recruitEnd?: Date;
}

export interface NewClubColumnType {
  userColumn: {
    key: string;
    valueType: string;
  };
}
