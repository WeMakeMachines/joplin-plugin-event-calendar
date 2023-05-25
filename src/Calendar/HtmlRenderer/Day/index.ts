import { Event } from "../../../types";
import DayGrouping from "../../EventGrouping/DayGrouping";
import Renderer from "../Abstract/Renderer";
import GroupDayRenderer from "./GroupDayRenderer";

export default class DayRenderer extends Renderer {
  constructor(eventGrouping: DayGrouping) {
    super(eventGrouping);
    this.container.className += " scale-day";
  }

  protected renderGroups(
    group: Event[],
    groupDate: Date,
    groupIndex: number
  ): HTMLDivElement {
    return new GroupDayRenderer(group, groupDate, groupIndex).render();
  }
}
