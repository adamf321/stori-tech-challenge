'use strict';

import { TransactionProcessor } from "./domain/transaction.processor";
import { MonthlyTotals, Totals } from "./domain/types/totals";
import { ConfigService } from "./utils/config.service";
import { EmailService } from "./utils/email.service";
import { DiskFilestoreService } from "./utils/filestore/disk.filestore.service";
import { FilestoreService } from "./utils/filestore/filestore.service";
import { S3FilestoreService } from "./utils/filestore/s3.filestore.service";
import { logInfo } from "./utils/logger";

type Event = {
  filename: string;
  emailTo: string;
}

type FunctionResponse = {
  statusCode: number;
  body: {
    totals: Totals;
    monthlyTotals: MonthlyTotals;
  };
};

module.exports.processTransactions = async (event: Event): Promise<FunctionResponse> => {
  logInfo("Received event", event);

  const configService = new ConfigService();
  const transactionProcessor = new TransactionProcessor();
  const emailService = new EmailService();

  if (!event.filename || !event.emailTo) {
    throw new Error("The event must include the filename and emailTo");
  }

  // pick the filestore service depending on whether we're running locally or on AWS
  const filestore: FilestoreService = configService.isLocal() ? new DiskFilestoreService() : new S3FilestoreService();
  const data = await filestore.getFileContents(event.filename);

  const { totals, monthlyTotals } = transactionProcessor.getTotals(data);

  await emailService.sendEmail(event.emailTo, totals, monthlyTotals);

  logInfo("Totals", { totals, monthlyTotals });

  logInfo("Email was sent");

  return {
    statusCode: 200,
    body: {
      totals,
      monthlyTotals,
    }
  };
};
