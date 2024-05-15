export type Expense = {
  _id: string;
  type: string;
  name: string;
  amount: number;
  date: Date;
  lastCreated?: Date;
  lastUpdated?: Date;
};

export type ExpenseResponse = {
  expense: Expense[];
  income: number;
  outcome: number;
  total: number;
};
