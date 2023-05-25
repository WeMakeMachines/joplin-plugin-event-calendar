import { Event } from "../../../types";
import WeekGrouping from "./WeekGrouping";
import AbstractRenderer from "../../Abstract/Renderer";
import WeekRenderer from "./WeekRenderer";

export default class Renderer extends AbstractRenderer {
  constructor(eventGrouping: WeekGrouping) {
    super(eventGrouping);
    this.container.className += " scale-week";
  }

  protected renderGroups(
    group: Event[],
    groupDate: Date,
    groupIndex: number
  ): HTMLDivElement {
    return new WeekRenderer(group, groupDate, groupIndex).render();
  }
}
