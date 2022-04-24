import EventGrouping from "./EventGrouping";
import { Event, Groups } from "../types";
import {
  add,
  differenceInCalendarMonths,
  isThisMonth as dateFnsIsThisMonth,
} from "date-fns";

export default class MonthGrouping extends EventGrouping {
  static isThisMonth(date: Date): boolean {
    return dateFnsIsThisMonth(date);
  }

  constructor(sortedEvents: Event[]) {
    super(sortedEvents);
    this.groups = this.group();
  }

  group(): Groups {
    const numberOfGroups = differenceInCalendarMonths(
      this.lastEvent.date,
      this.firstEvent.date
    );

    return this.sortedEvents.reduce((prev, event) => {
      const groupNumber = differenceInCalendarMonths(
        event.date,
        this.firstEvent.date
      );

      prev[groupNumber].push(event);

      return prev;
    }, this.generateEmptyGroups(numberOfGroups));
  }

  public getDateFromGroupIndex(index: number): Date {
    const startDate = this.firstEvent.date;

    return add(startDate, { months: index });
  }
}
