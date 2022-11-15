export interface Budget {
  _id: string;
  clubId: string;
  rows: BudgetRow[];
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetRow {
  date: Date; //날짜
  income: string; //수입
  expense: string; //지출
  whom: string; //Who/m
  content: string; //내용
  balance: string; //잔액
  note: string; //비고
  account: string; //사용계좌
}
