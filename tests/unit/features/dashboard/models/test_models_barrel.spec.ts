import { isValidStock, isValidValuation } from "@/features/dashboard/models";

describe("models barrel exports", () => {
  test("stock validator available", () => {
    expect(typeof isValidStock).toBe("function");
  });

  test("valuation validator available", () => {
    expect(typeof isValidValuation).toBe("function");
  });
});
