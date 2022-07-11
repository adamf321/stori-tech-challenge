import { MonthlyTotals, Totals } from "./types/totals";
import { CsvFile } from "../utils/csv.file";
import { Totaller } from "./totaller";

export class TransactionProcessor {
  getTotals(fileContents: string): { totals: Totals, monthlyTotals: MonthlyTotals } {
    const totaller = new Totaller();
    const transactions = new CsvFile(fileContents);

    let totals = totaller.getNewTotals();
    let monthlyTotals: MonthlyTotals = {};

    for (const row of transactions.toArray()) {
      const month = row[1].split("/")[0]; // assume date is of format MM/DD
      const amount = parseFloat(row[2]);

      // Create month if not yet created
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = totaller.getNewTotals();
      }

      // Update totals
      totals = totaller.getUpdatedTotals(totals, amount);
      monthlyTotals[month] = totaller.getUpdatedTotals(monthlyTotals[month], amount);
    }

    return {
      totals,
      monthlyTotals,
    };
  }
}
