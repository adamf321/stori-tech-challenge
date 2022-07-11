import { TransactionProcessor } from "../../src/domain/transaction.processor";

describe("Row parses", () => {
  test("with credit", () => {
    const t = new TransactionProcessor();
    const res = t.parseRow(["1", "10/17", "+23.45"]);

    expect(res.month).toBe(10);
    expect(res.amount).toBe(23.45);
  });

  test("with debit", () => {
    const t = new TransactionProcessor();
    const res = t.parseRow(["1", "10/17", "-23.45"]);

    expect(res.month).toBe(10);
    expect(res.amount).toBe(-23.45);
  });

  test("with 0", () => {
    const t = new TransactionProcessor();
    const res = t.parseRow(["1", "10/17", "+0.0"]);

    expect(res.month).toBe(10);
    expect(res.amount).toBe(0);
  });

  test("with no decimals", () => {
    const t = new TransactionProcessor();
    const res = t.parseRow(["1", "10/17", "+24"]);

    expect(res.month).toBe(10);
    expect(res.amount).toBe(24);
  });

  test("with less than 1", () => {
    const t = new TransactionProcessor();
    const res = t.parseRow(["1", "10/17", "+0.24"]);

    expect(res.month).toBe(10);
    expect(res.amount).toBe(.24);
  });

  test("with 1 digit month", () => {
    const t = new TransactionProcessor();
    const res = t.parseRow(["1", "1/17", "+78.24"]);

    expect(res.month).toBe(1);
    expect(res.amount).toBe(78.24);
  });
});

describe("Row fails to parse", () => {
  test("with missing month", () => {
    const t = new TransactionProcessor();
    expect(() => t.parseRow(["1", "/17", "+78.24"])).toThrow();
  });

  test("with 0 month", () => {
    const t = new TransactionProcessor();
    expect(() => t.parseRow(["1", "0/17", "+78.24"])).toThrow();
  });

  test("with over 12 month month", () => {
    const t = new TransactionProcessor();
    expect(() => t.parseRow(["1", "13/17", "+78.24"])).toThrow();
  });

  test("with missing sign on amount", () => {
    const t = new TransactionProcessor();
    expect(() => t.parseRow(["1", "3/17", "78.24"])).toThrow();
  });

  test("with letters in amount", () => {
    const t = new TransactionProcessor();
    expect(() => t.parseRow(["1", "3/17", "+18.24b"])).toThrow();
  });
});
