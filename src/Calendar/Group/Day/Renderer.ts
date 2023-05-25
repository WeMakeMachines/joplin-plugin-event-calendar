import { Event } from "../../../types";
import DayGrouping from "./DayGrouping";
import AbstractRenderer from "../../Abstract/Renderer";
import DayRenderer from "./DayRenderer";

export default class Renderer extends AbstractRenderer {
  constructor(eventGrouping: DayGrouping) {
    super(eventGrouping);
    this.container.className += " scale-day";
  }

  protected renderGroups(
    group: Event[],
    groupDate: Date,
    groupIndex: number
  ): HTMLDivElement {
    return new DayRenderer(group, groupDate, groupIndex).render();
  }
}
