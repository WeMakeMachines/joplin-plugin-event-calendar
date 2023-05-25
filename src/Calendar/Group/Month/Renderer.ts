import { Event } from "../../../types";
import MonthGrouping from "./MonthGrouping";
import AbstractRenderer from "../../Abstract/Renderer";
import MonthRenderer from "./MonthRenderer";

export default class Renderer extends AbstractRenderer {
  constructor(eventGrouping: MonthGrouping) {
    super(eventGrouping);
    this.container.className += " scale-month";
  }

  protected renderGroups(
    group: Event[],
    groupDate: Date,
    groupIndex: number
  ): HTMLDivElement {
    return new MonthRenderer(group, groupDate, groupIndex).render();
  }
}
