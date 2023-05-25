import { GroupTypes } from "../types";
import Events from "./Events/";
import DayGrouping from "./EventGrouping/DayGrouping";
import MonthGrouping from "./EventGrouping/MonthGrouping";
import WeekGrouping from "./EventGrouping/MonthGrouping";
import YearGrouping from "./EventGrouping/YearGrouping";
import DayRenderer from "./HtmlRenderer/Day";
import MonthRenderer from "./HtmlRenderer/Month";
import WeekRenderer from "./HtmlRenderer/Week";
import YearRenderer from "./HtmlRenderer/Year";

export default class Calendar {
  public readonly jsonContent: object;
  public readonly groupType: GroupTypes;
  public readonly events: Events;

  constructor(json: object) {
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
      case GroupTypes.Year:
        return new YearRenderer(
          new YearGrouping(this.events.sortedEvents)
        ).render();
    }
  }
}
