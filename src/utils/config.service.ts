import * as env from "./../../.env.json";

export class ConfigService {
  isLocal = (): boolean => process.env.IS_LOCAL ? process.env.IS_LOCAL === 'true' : false;

  getAwsRegion = (): string => process.env.AWS_REGION || "us-east-1";

  getTransactionsBucket = (): string => process.env.TRANSACTIONS_BUCKET || "us-east-1";

  getFromEmail = (): string => "adam@nolte.io";

  getEmailTemplateAlias = (): string => "transaction-report";

  getPostmarkApiKey = (): string => env.postmark_api_key;
}
