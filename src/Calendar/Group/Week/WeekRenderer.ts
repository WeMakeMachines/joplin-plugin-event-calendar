import { Event } from "../../../types";
import WeekGrouping from "./WeekGrouping";

import GroupRenderer from "../../Abstract/GroupRenderer";

export default class WeekRenderer extends GroupRenderer {
  constructor(group: Event[], groupDate: Date, groupIndex: number) {
    super(group, groupDate, groupIndex);

    if (WeekGrouping.isThisWeek(groupDate)) {
      this.highlightGroup();
    }
  }

  protected renderDateAsIcon(eventDate, groupIndex): HTMLSpanElement {
    const html = document.createElement("span");
    html.className = "icon";

    const week = WeekGrouping.getWeek(eventDate);

    if (week === 1) {
      html.textContent = eventDate.toLocaleDateString(undefined, {
        year: "numeric",
      });
      html.className += " primary";
    } else {
      html.textContent = week.toString();
    }

    if (WeekGrouping.isThisWeek(eventDate)) {
      html.className += " highlighted";
    }

    return html;
  }
}
