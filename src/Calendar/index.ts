import { GroupTypes } from "../types";
import Events from "../Events/";
import { DayGrouping, WeekGrouping, MonthGrouping } from "../EventGrouping";
import {
  DayRenderer,
  WeekRenderer,
  MonthRenderer,
} from "../EventGroupingHtmlRenderer";

export default class Calendar {
  private readonly jsonContent: object;
  public groupType: GroupTypes;
  public events: Events;

  constructor(json) {
    this.jsonContent = json;
    this.groupType = json["group"]
      ? json["group"].charAt(0).toUpperCase()
      : GroupTypes.Day;
    this.events = new Events(json["events"]);
  }

  render(): HTMLDivElement {
    switch (this.groupType) {
      case GroupTypes.Day:
        return new DayRenderer(
          new DayGrouping(this.events.sortedEvents)
        ).render();
      case GroupTypes.Week:
        return new WeekRenderer(
          new WeekGrouping(this.events.sortedEvents)
        ).render();
      case GroupTypes.Month:
        return new MonthRenderer(
          new MonthGrouping(this.events.sortedEvents)
        ).render();
    }
  }
}
