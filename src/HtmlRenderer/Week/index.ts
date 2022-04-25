import { Event } from "../../types";
import { WeekGrouping } from "../../EventGrouping";
import Renderer from "../Abstract/Renderer";
import GroupWeekRenderer from "./GroupWeekRenderer";

export default class WeekRenderer extends Renderer {
  constructor(eventGrouping: WeekGrouping) {
    super(eventGrouping);
    this.container.className += " scale-week";
  }

  protected renderGroups(
    group: Event[],
    groupDate: Date,
    groupIndex: number
  ): HTMLDivElement {
    return new GroupWeekRenderer(group, groupDate, groupIndex).render();
  }
}
