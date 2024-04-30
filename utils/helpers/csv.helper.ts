import * as fastCsv from 'fast-csv';
import { Readable } from 'stream';

export const generateCsvStream = (data: any[]): Readable => {
  const csvStream = fastCsv.format({ headers: true });
  data.forEach((row) => csvStream.write(row));
  csvStream.end();

  return csvStream;
};
