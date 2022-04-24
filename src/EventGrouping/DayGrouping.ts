import EventGrouping from "./EventGrouping";
import { Event, Groups } from "../types";
import {
  add,
  differenceInCalendarDays,
  isToday as dateFnsIsToday,
} from "date-fns";

export default class DayGrouping extends EventGrouping {
  static isToday(date: Date): boolean {
    return dateFnsIsToday(date);
  }

  constructor(sortedEvents: Event[]) {
    super(sortedEvents);
    this.groups = this.group();
  }

  group(): Groups {
    const numberOfGroups = differenceInCalendarDays(
      this.lastEvent.date,
      this.firstEvent.date
    );

    return this.sortedEvents.reduce((prev, event) => {
      const groupNumber = differenceInCalendarDays(
        event.date,
        this.firstEvent.date
      );

      prev[groupNumber].push(event);

      return prev;
    }, this.generateEmptyGroups(numberOfGroups));
  }

  public getDateFromGroupIndex(index: number): Date {
    const startDate = this.firstEvent.date;

    return add(startDate, { days: index });
  }
}
