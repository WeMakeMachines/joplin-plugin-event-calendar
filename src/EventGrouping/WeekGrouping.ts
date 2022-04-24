import EventGrouping from "./EventGrouping";
import { Event, Groups } from "../types";
import {
  add,
  differenceInCalendarWeeks,
  getWeek as dateFnsGetWeek,
  isThisWeek as dateFnsIsThisWeek,
} from "date-fns";

export default class WeekGrouping extends EventGrouping {
  static isThisWeek(date: Date): boolean {
    return dateFnsIsThisWeek(date);
  }

  static getWeek(date: Date): number {
    return dateFnsGetWeek(date);
  }

  constructor(sortedEvents: Event[]) {
    super(sortedEvents);
    this.groups = this.group();
  }

  group(): Groups {
    const numberOfGroups = differenceInCalendarWeeks(
      this.lastEvent.date,
      this.firstEvent.date
    );

    return this.sortedEvents.reduce((prev, event) => {
      const groupNumber = differenceInCalendarWeeks(
        event.date,
        this.firstEvent.date
      );

      prev[groupNumber].push(event);

      return prev;
    }, this.generateEmptyGroups(numberOfGroups));
  }

  public getDateFromGroupIndex(index: number): Date {
    const startDate = this.firstEvent.date;

    return add(startDate, { weeks: index });
  }
}
