import { CsvFile } from "../../src/utils/csv.file";

describe("Parses correctly", () => {
  test("with one row, no header", () => {
    const file = new CsvFile("a,b,c", false);
    expect(file.toArray()).toEqual([["a", "b", "c"]]);
  });

  test("with one row and header", () => {
    const file = new CsvFile("Col1,Col2,Col3\na,b,c", true);
    expect(file.toArray()).toEqual([["a", "b", "c"]]);
  });

  test("with 3 rows and header", () => {
    const file = new CsvFile("Col1,Col2,Col3\na,b,c\na,b,c\na,b,c", true);
    expect(file.toArray()).toEqual([["a", "b", "c"], ["a", "b", "c"], ["a", "b", "c"]]);
  });

  test("with empty string", () => {
    const file = new CsvFile("", false);
    expect(file.toArray()).toEqual([[""]]);
  });

  test("with header only", () => {
    const file = new CsvFile("Col1,Col2,Col3\n", true);
    expect(file.toArray()).toEqual([[""]]);
  });
});
