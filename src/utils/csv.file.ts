export class CsvFile {
  private rows: string[][];

  constructor(fileContent: string, hasHeaderRow: boolean = true) {
    const rows: string[] = fileContent.split("\n");
    this.rows = rows.map(r => r.split(","));

    if (hasHeaderRow) {
      this.rows.splice(0, 1);
    }
  }

  toArray(): string[][] {
    return this.rows;
  }
}
