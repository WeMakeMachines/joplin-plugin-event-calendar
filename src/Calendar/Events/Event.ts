import { Event as EventType } from "../../types";

export default class Event implements EventType {
  date: Date;
  title: string;
  text?: string;
  icon?: string;
  bgColor?: string;

  constructor({ date, title, text, icon, bgColor }: EventType) {
    this.date = new Date(date);
    this.title = title;
    this.text = text;
    this.icon = icon;
    this.bgColor = bgColor;
  }
}
