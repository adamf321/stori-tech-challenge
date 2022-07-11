import * as postmark from "postmark";

import { MonthlyTotals, Totals } from "../domain/types/totals";
import { ConfigService } from "./config.service";
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
  private configService = new ConfigService();

  private ccyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  sendEmail = async (to: string, totals: Totals, monthlyTotals: MonthlyTotals) => {
    const client = new postmark.ServerClient(this.configService.getPostmarkApiKey());
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
      From: this.configService.getFromEmail(),
      To: to,
      TemplateAlias: this.configService.getEmailTemplateAlias(),
      TemplateModel: templateModel,
    });
  }
}
