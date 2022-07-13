import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { ConfigService } from "../config.service";
import { streamToString } from "../string.utils";
import { FilestoreService } from "./filestore.service";

export class S3FilestoreService implements FilestoreService {
  private configService = new ConfigService();

  private client = new S3Client({
    region: this.configService.getAwsRegion()
  });

  getFileContents = async (filename: string): Promise<string> => {
    const command = new GetObjectCommand({
      Bucket: this.configService.getTransactionsBucket(),
      Key: filename,
    });

    const res = await this.client.send(command);

    return await streamToString(res.Body);
  }
}
