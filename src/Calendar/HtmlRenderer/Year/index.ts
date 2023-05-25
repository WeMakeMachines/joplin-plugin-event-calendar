import { Event } from "../../../types";
import YearGrouping from "../../EventGrouping/YearGrouping";
import Renderer from "../Abstract/Renderer";
import GroupYearRenderer from "./GroupYearRenderer";

export default class YearRenderer extends Renderer {
  constructor(eventGrouping: YearGrouping) {
    super(eventGrouping);
    this.container.className += " scale-year";
  }

  protected renderGroups(
    group: Event[],
    groupDate: Date,
    groupIndex: number
  ): HTMLDivElement {
    return new GroupYearRenderer(group, groupDate, groupIndex).render();
  }
}
