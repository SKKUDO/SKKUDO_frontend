export type RoleType = "회장" | "부회장" | "운영진" | "부원";

export type LocationType = "인사캠" | "자과캠";

export type ValueType = "string" | "number" | "boolean";

export interface ColumnType {
  _id: string;
  key: string;
  valueType: ValueType;
}

export type NewColumnType = Omit<ColumnType, "_id">;

export interface ErrorType {
  error: {
    response: {
      data: { error: string };
    };
  };
}
