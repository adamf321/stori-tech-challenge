export class ConfigService {
  isLocal = (): boolean => process.env.IS_LOCAL ? process.env.IS_LOCAL === 'true' : false;

  getAwsRegion = (): string => process.env.AWS_REGION || "us-east-1";

  getTransactionsBucket = (): string => process.env.TRANSACTIONS_BUCKET || "us-east-1";
}
