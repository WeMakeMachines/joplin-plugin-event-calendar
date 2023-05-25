import { Event } from "../../../types";
import DayGrouping from "../../EventGrouping/DayGrouping";

import GroupRenderer from "../Abstract/GroupRenderer";

export default class GroupDayRenderer extends GroupRenderer {
  constructor(group: Event[], groupDate: Date, groupIndex: number) {
    super(group, groupDate, groupIndex);

    if (DayGrouping.isToday(groupDate)) {
      this.highlightGroup();
    }
  }

  protected renderDateAsIcon(eventDate, groupIndex): HTMLSpanElement {
    const html = document.createElement("span");
    html.className = "icon";

    const dayInMonth = eventDate.getDate();

    if (dayInMonth === 1) {
      html.textContent = eventDate
        .toLocaleDateString(undefined, { month: "long" })
        .slice(0, 3);
      html.className += " primary";
    } else {
      html.textContent = dayInMonth.toString();
    }

    if (DayGrouping.isToday(eventDate)) {
      html.className += " highlighted";
    }

    return html;
  }
}
