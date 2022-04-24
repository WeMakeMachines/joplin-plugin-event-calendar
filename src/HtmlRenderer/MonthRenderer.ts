import { Event } from "../types";
import { MonthGrouping } from "../EventGrouping";
import Renderer from "./Renderer";
import GroupMonthRenderer from "./GroupRenderer/GroupMonthRenderer";

export default class MonthRenderer extends Renderer {
  constructor(eventGrouping: MonthGrouping) {
    super(eventGrouping);
    this.container.className += " scale-month";
  }

  protected renderGroups(
    group: Event[],
    groupDate: Date,
    groupIndex: number
  ): HTMLDivElement {
    const monthGroup = new GroupMonthRenderer(group, groupDate, groupIndex);

    return monthGroup.render();
  }
}
