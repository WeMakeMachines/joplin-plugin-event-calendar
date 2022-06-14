import { Event } from "../../types";
import { YearGrouping } from "../../EventGrouping";

import GroupRenderer from "../Abstract/GroupRenderer";

export default class GroupYearRenderer extends GroupRenderer {
  constructor(group: Event[], groupDate: Date, groupIndex: number) {
    super(group, groupDate, groupIndex);

    if (YearGrouping.isThisYear(groupDate)) {
      this.highlightGroup();
    }
  }

  protected renderDateAsIcon(eventDate, groupIndex): HTMLSpanElement {
    const html = document.createElement("span");
    html.className = "icon";

    html.textContent = eventDate.toLocaleDateString(undefined, {
      year: "numeric",
    });
    html.className += " primary";

    if (YearGrouping.isThisYear(eventDate)) {
      html.className += " highlighted";
    }

    return html;
  }
}
