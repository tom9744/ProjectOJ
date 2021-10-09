import { BufferStream } from './buffer-stream';

export type Tag = {
  [tagNumber: number]: string;
};

export interface JpegSection {
  markerType: number;
  name: string;
  payload: BufferStream;
}

export interface Marker {
  openWithOffset: (offset: number) => BufferStream;
  offset: number;
}

export class IFDEntry {
  private _tagName: string;

  constructor(
    public tagType: number,
    public format: number,
    public values: Array<number> | string,
  ) {}

  get tagName(): string {
    return this._tagName;
  }

  set tagName(value: string) {
    this._tagName = value;
  }
}

export class IFDEntryRational64u {
  private _tagName: string;
  public simplifedValues: Array<number>;

  constructor(
    public tagType: number,
    public format: 0x05 | 0x0a,
    public values: Array<[number, number]>,
  ) {
    this.simplifedValues = values.map(
      ([numerator, denominator]) => numerator / denominator,
    );
  }

  get tagName(): string {
    return this._tagName;
  }

  set tagName(value: string) {
    this._tagName = value;
  }
}

export interface App1Data {
  ifd0: Array<IFDEntry | IFDEntryRational64u>;
  ifd1: Array<IFDEntry | IFDEntryRational64u>;
  subIfd: Array<IFDEntry | IFDEntryRational64u>;
  gps: Array<IFDEntry | IFDEntryRational64u>;
}
