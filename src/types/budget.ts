export interface BudgetType {
  _id: string;
  clubId: string;
  rows: BudgetRowType[];
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NewBudgetType = Pick<BudgetType, "clubId" | "name" | "rows">;

interface BudgetRowBaseType {
  income: string; //수입
  expense: string; //지출
  whom: string; //Who/m
  content: string; //내용
  balance: string; //잔액
  note: string; //비고
  account: string; //사용계좌
}

export interface BudgetRowType extends BudgetRowBaseType {
  _id?: string;
  date: Date; //날짜
}

export interface NewBudgetRowType extends BudgetRowBaseType {
  date?: Date;
  clubId: string;
}
