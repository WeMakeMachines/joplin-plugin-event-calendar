export enum Scale {
  Day = "D",
  Week = "W",
  Month = "M",
}

export interface Event {
  date: Date;
  title: string;
  text?: string;
  icon?: string;
  bgColor?: string;
}

export type Groups = Event[][];
