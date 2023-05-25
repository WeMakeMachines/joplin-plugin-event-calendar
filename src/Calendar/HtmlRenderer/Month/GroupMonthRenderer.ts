import { Event } from "../../../types";
import MonthGrouping from "../../EventGrouping/MonthGrouping";

import GroupRenderer from "../Abstract/GroupRenderer";

export default class GroupMonthRenderer extends GroupRenderer {
  constructor(group: Event[], groupDate: Date, groupIndex: number) {
    super(group, groupDate, groupIndex);

    if (MonthGrouping.isThisMonth(groupDate)) {
      this.highlightGroup();
    }
  }

  protected renderDateAsIcon(eventDate, groupIndex): HTMLSpanElement {
    const html = document.createElement("span");
    html.className = "icon";

    // unlike getDate(), getMonth is 0 based
    const month = eventDate.getMonth() + 1;

    if (month === 1) {
      html.textContent = eventDate.toLocaleDateString(undefined, {
        year: "numeric",
      });
      html.className += " primary";
    } else {
      html.textContent = eventDate
        .toLocaleDateString(undefined, {
          month: "long",
        })
        .slice(0, 3);
    }

    if (MonthGrouping.isThisMonth(eventDate)) {
      html.className += " highlighted";
    }

    return html;
  }
}
