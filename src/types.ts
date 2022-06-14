export enum GroupTypes {
  Day = "D",
  Week = "W",
  Month = "M",
  Year = "Y",
}

export interface Event {
  date: Date;
  title: string;
  text?: string;
  icon?: string;
  bgColor?: string;
}

export type Groups = Event[][];
