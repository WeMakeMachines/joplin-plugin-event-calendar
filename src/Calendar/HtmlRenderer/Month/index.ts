import { Event } from "../../../types";
import MonthGrouping from "../../EventGrouping/MonthGrouping";
import Renderer from "../Abstract/Renderer";
import GroupMonthRenderer from "./GroupMonthRenderer";

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
    return new GroupMonthRenderer(group, groupDate, groupIndex).render();
  }
}
