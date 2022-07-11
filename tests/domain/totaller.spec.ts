import { Totaller } from "../../src/domain/totaller";

describe("Totals correctly", () => {
  test("works with credit amount", () => {
    const totaller = new Totaller();

    const current = {
      balance: 100,
      transactionCount: 2,
      debitCount: 1,
      creditCount: 1,
      averageDebits: -50,
      averageCredits: 150,
    };

    expect(totaller.getUpdatedTotals(current, 40)).toEqual({
      balance: 140,
      transactionCount: 3,
      debitCount: 1,
      creditCount: 2,
      averageDebits: -50,
      averageCredits: 95,
    });
  });

  test("works with debit amount", () => {
    const totaller = new Totaller();

    const current = {
      balance: 100,
      transactionCount: 2,
      debitCount: 1,
      creditCount: 1,
      averageDebits: -50,
      averageCredits: 150,
    };

    expect(totaller.getUpdatedTotals(current, -40)).toEqual({
      balance: 60,
      transactionCount: 3,
      debitCount: 2,
      creditCount: 1,
      averageDebits: -45,
      averageCredits: 150,
    });
  });

  test("works with 0 amount", () => {
    const totaller = new Totaller();

    const current = {
      balance: 100,
      transactionCount: 2,
      debitCount: 1,
      creditCount: 1,
      averageDebits: 50,
      averageCredits: 150,
    };

    expect(totaller.getUpdatedTotals(current, 0)).toEqual({
      balance: 100,
      transactionCount: 3,
      debitCount: 1,
      creditCount: 2,
      averageDebits: 50,
      averageCredits: 75,
    });
  });

  test("works starting from new totals", () => {
    const totaller = new Totaller();

    const current = {
      balance: 0,
      transactionCount: 0,
      debitCount: 0,
      creditCount: 0,
      averageDebits: 0,
      averageCredits: 0,
    };

    expect(totaller.getUpdatedTotals(current, 89.7)).toEqual({
      balance: 89.7,
      transactionCount: 1,
      debitCount: 0,
      creditCount: 1,
      averageDebits: 0,
      averageCredits: 89.7,
    });
  });
});

describe("New totals", () => {
  test("are correct", () => {
    const totaller = new Totaller();

    expect(totaller.getNewTotals()).toEqual({
      balance: 0,
      transactionCount: 0,
      debitCount: 0,
      creditCount: 0,
      averageDebits: 0,
      averageCredits: 0,
    });
  });
});
