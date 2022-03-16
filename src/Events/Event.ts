import { Event as _Event } from "../types";

export default class Event implements _Event {
  date: Date;
  title: string;
  text?: string;
  icon?: string;
  backgroundColor?: string;

  constructor({ date, title, text, icon, backgroundColor }) {
    this.date = new Date(date);
    this.title = title;
    this.text = text;
    this.icon = icon;
    this.backgroundColor = backgroundColor;
  }
}
