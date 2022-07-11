import * as postmark from "postmark";

import { MonthlyTotals, Totals } from "../domain/types/totals";
import { toMonthName } from "./date.utils";

type PostmarkTemplateModel = {
  total_balance: string;
  number_of_transactions: number;
  average_debits: string;
  average_credits: string;
  month: {
    month_name: string;
    no_of_transactions: number;
    average_debits: string;
    average_credits: string;
  }[];
};

export class EmailService {
  private ccyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  sendEmail = async (to: string, totals: Totals, monthlyTotals: MonthlyTotals) => {
    const client = new postmark.ServerClient("2f8548f8-7737-45c5-865a-10e45a729bc8");
    let months: PostmarkTemplateModel["month"] = [];

    for (const [month, value] of Object.entries(monthlyTotals)) {
      months.push({
        month_name: toMonthName(parseInt(month)),
        no_of_transactions: value.transactionCount,
        average_debits: this.ccyFormatter.format(value.averageDebits),
        average_credits: this.ccyFormatter.format(value.averageCredits),
      });
    }

    const templateModel: PostmarkTemplateModel = {
      total_balance: this.ccyFormatter.format(totals.balance),
      number_of_transactions: totals.transactionCount,
      average_debits: this.ccyFormatter.format(totals.averageDebits),
      average_credits: this.ccyFormatter.format(totals.averageCredits),
      month: months,
    };

    await client.sendEmailWithTemplate({
      From: "adam@nolte.io",
      To: to,
      TemplateAlias: "transaction-report",
      TemplateModel: templateModel,
    });
  }
}
