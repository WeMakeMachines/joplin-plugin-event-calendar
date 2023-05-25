import { GroupTypes } from "../types";
import Events from "./Events/";
import DayGrouping from "./Group/Day/DayGrouping";
import MonthGrouping from "./Group/Month/MonthGrouping";
import WeekGrouping from "./Group/Month/MonthGrouping";
import DayRenderer from "./Group/Day/Renderer";
import MonthRenderer from "./Group/Month/Renderer";
import WeekRenderer from "./Group/Week/Renderer";

export default class Calendar {
  public readonly jsonContent: object;
  public readonly groupType: GroupTypes;
  public readonly events: Events;

  constructor(json: object) {
    this.jsonContent = json;
    this.groupType = this.getGroupType(json);
    this.events = new Events(json["events"]);
  }

  private getGroupType(json: object): GroupTypes {
    if (!json["group"]) {
      return GroupTypes.Day;
    }

    const groupType = json["group"].charAt(0).toUpperCase();

    if (!Object.values(GroupTypes).includes(groupType)) {
      return GroupTypes.Day;
    }

    return groupType;
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
