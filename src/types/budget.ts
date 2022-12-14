export interface BudgetType {
  _id: string;
  clubId: string;
  rows: BudgetRowType[];
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewBudgetType {
  clubId: string;
  name: string;
  rows: BudgetRowType[];
}

export interface BudgetRowType {
  _id?: string;
  date: Date; //날짜
  income: string; //수입
  expense: string; //지출
  whom: string; //Who/m
  content: string; //내용
  balance: string; //잔액
  note: string; //비고
  account: string; //사용계좌
}

export interface NewBudgetRowType {
  date?: Date;
  clubId: string;
  income: string;
  expense: string; //지출
  whom: string; //Who/m
  content: string; //내용
  balance: string; //잔액
  note: string; //비고
  account: string; //사용계좌
}
