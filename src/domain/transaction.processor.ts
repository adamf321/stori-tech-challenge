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
      const { month, amount } = this.parseRow(row);

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

  parseRow = (row: string[]): { month: number, amount: number } => {
    if (!row[1].match(/^([1-9]|1[012])\//)) {
      throw new Error(`Row has invalid month. Full row content: ${row}`);
    }
    const month = parseInt(row[1].split("/")[0]); // assume date is of format MM/DD

    if (!row[2].match(/^(-|\+)\d+(\.\d+)?$/)) {
      throw new Error(`Row has invalid amount. Full row content: ${row}`);
    }
    const amount = parseFloat(row[2]);

    return {
      month,
      amount,
    }
  }
}
