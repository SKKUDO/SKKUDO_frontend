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
  recruitType: RecruitType;
  recruitStart: string | null; //모집 시작일
  recruitEnd: string | null; //모집 종료일
  createdAt: Date;
  updatedAt: Date;
}

export interface NewClubType
  extends Pick<ClubType, "name" | "location" | "recruitType"> {
  type: {
    name: string;
  };
}

export interface NotAcceptedClubType
  extends Pick<
    ClubType,
    "name" | "location" | "recruitType" | "type" | "userColumns" | "_id"
  > {
  accpeted: boolean;
  initializer: string;
}
export interface ClubTypeType {
  _id: string;
  name: string; //프로그래밍, 경영
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateClubInfoType
  extends Partial<Pick<ClubType, "name" | "location" | "recruitType">> {
  type?: { name: string };
  recruitStart?: Date;
  recruitEnd?: Date;
}

export interface NewClubColumnType {
  userColumn: {
    key: string;
    valueType: string;
  };
}
