import EventGrouping from "./EventGrouping";
import { Event, Groups } from "../types";
import { add, differenceInCalendarWeeks } from "date-fns";

export default class WeekGrouping extends EventGrouping {
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
