export type Totals = {
  balance: number;
  transactionCount: number;
  debitCount: number;
  creditCount: number;
  averageDebits: number;
  averageCredits: number;
}

export type MonthlyTotals = {
  [Identifier: number]: Totals;
}
