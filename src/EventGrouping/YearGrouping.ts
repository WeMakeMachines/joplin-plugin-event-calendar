import EventGrouping from "./EventGrouping";
import { Event, Groups } from "../types";
import {
  add,
  differenceInCalendarYears,
  isThisYear as dateFnsIsThisYear,
} from "date-fns";

export default class YearGrouping extends EventGrouping {
  static isThisYear(date: Date): boolean {
    return dateFnsIsThisYear(date);
  }

  constructor(sortedEvents: Event[]) {
    super(sortedEvents);
    this.groups = this.group();
  }

  group(): Groups {
    const numberOfGroups = differenceInCalendarYears(
      this.lastEvent.date,
      this.firstEvent.date
    );

    return this.sortedEvents.reduce((prev, event) => {
      const groupNumber = differenceInCalendarYears(
        event.date,
        this.firstEvent.date
      );

      prev[groupNumber].push(event);

      return prev;
    }, this.generateEmptyGroups(numberOfGroups));
  }

  public getDateFromGroupIndex(index: number): Date {
    const startDate = this.firstEvent.date;

    return add(startDate, { years: index });
  }
}
