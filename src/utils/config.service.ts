import * as env from "./../../.env.json";

export class ConfigService {
  isLocal = (): boolean => process.env.IS_LOCAL ? process.env.IS_LOCAL === "true" : false;

  getAwsRegion = (): string => process.env.AWS_REGION || "us-east-1";

  getTransactionsBucket = (): string => process.env.TRANSACTIONS_BUCKET || "";

  getFromEmail = (): string => "adam@nolte.io"; // Hard coding ths here, we could make it configurable if needed

  getEmailTemplateAlias = (): string => "transaction-report"; // Hard coding ths here, we could make it configurable if needed

  getPostmarkApiKey = (): string => env.postmark_api_key;
}
