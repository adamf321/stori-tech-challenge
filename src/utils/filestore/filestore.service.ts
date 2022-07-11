export interface FilestoreService {
  getFileContents(filename): Promise<string>;
}
