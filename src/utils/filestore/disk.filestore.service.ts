import * as fs from "fs";
import { FilestoreService } from "./filestore.service";

export class DiskFilestoreService implements FilestoreService {
  getFileContents = async (filename: any): Promise<string> => fs.readFileSync(filename, "utf8");
}
