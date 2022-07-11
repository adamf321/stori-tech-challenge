import { Totals } from "./types/totals";

export class Totaller {
  getUpdatedTotals(current: Totals, amount: number): Totals {
    const debit = amount < 0; // assume $0 is counted as a credit
    const newTotals = { ...current }; // create a new object so we don't mutate, making this a pure function

    newTotals.balance += amount;
    newTotals.transactionCount += 1;
    newTotals.debitCount += debit ? 1 : 0;
    newTotals.creditCount += !debit ? 1 : 0;
    newTotals.averageDebits = debit
      ? (newTotals.averageDebits + amount) / newTotals.debitCount
      : newTotals.averageDebits;
    newTotals.averageCredits = !debit
      ? (newTotals.averageCredits + amount) / newTotals.creditCount
      : newTotals.averageCredits;

    return newTotals;
  }

  getNewTotals(): Totals {
    return {
      balance: 0,
      transactionCount: 0,
      debitCount: 0,
      creditCount: 0,
      averageDebits: 0,
      averageCredits: 0,
    };
  }
}
