import { toMonthName } from "../../src/utils/date.utils";

describe("Get month name", () => {
  test("for month 6", () => {
    expect(toMonthName(6)).toEqual("June");
  });

  test("for month 1", () => {
    expect(toMonthName(1)).toEqual("January");
  });

  test("for month 12", () => {
    expect(toMonthName(12)).toEqual("December");
  });

  test("fails for month 0", () => {
    expect(() => toMonthName(0)).toThrow();
  });

  test("fails for month 13", () => {
    expect(() => toMonthName(13)).toThrow();
  });
});
