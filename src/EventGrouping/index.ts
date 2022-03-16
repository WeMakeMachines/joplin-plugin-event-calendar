import {
  add,
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInCalendarMonths,
} from "date-fns";

import { Event, Groups, Scale } from "../types";

export default class EventGrouping {
  private readonly sortedEvents: Event[];
  private readonly firstEvent: Event;
  private readonly lastEvent: Event;
  public readonly scale: Scale;
  public readonly groups: Groups;

  public static generateEmptyGroups(length: number): Groups {
    const groups = [];

    for (let i = 0; i <= length; i += 1) {
      groups.push([]);
    }

    return groups;
  }

  constructor(sortedEvents: Event[], scale: Scale) {
    this.sortedEvents = sortedEvents;
    this.firstEvent = this.sortedEvents[0];
    this.lastEvent = this.sortedEvents[this.sortedEvents.length - 1];
    this.scale = scale;
    this.groups = this.group(scale);
  }

  private group(scale: Scale): Groups {
    switch (scale) {
      case Scale.Day:
        return this.byDay();
      case Scale.Week:
        return this.byWeek();
      case Scale.Month:
        return this.byMonth();
    }
  }

  private byDay(): Groups {
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
    }, EventGrouping.generateEmptyGroups(numberOfGroups));
  }

  private byWeek(): Groups {
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
    }, EventGrouping.generateEmptyGroups(numberOfGroups));
  }

  private byMonth(): Groups {
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
    }, EventGrouping.generateEmptyGroups(numberOfGroups));
  }

  public getDateFromGroupIndex(index: number): Date {
    const startDate = this.firstEvent.date;

    switch (this.scale) {
      case Scale.Day:
        return add(startDate, { days: index });
      case Scale.Week:
        return add(startDate, { weeks: index });
      case Scale.Month:
        return add(startDate, { months: index });
    }
  }
}
