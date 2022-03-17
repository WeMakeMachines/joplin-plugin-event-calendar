import { getWeek } from "date-fns";
import EventGrouping from "../EventGrouping";
import Renderer from "./Renderer";

export default class WeekRenderer extends Renderer {
  constructor(eventGrouping: EventGrouping) {
    super(eventGrouping);
    this.container.className += " scale-week";
  }

  protected renderDateAsIcon(eventDate, groupIndex): HTMLSpanElement {
    const html = document.createElement("span");
    html.className = "icon";

    const week = getWeek(eventDate);

    if (week === 1) {
      html.textContent = eventDate.toLocaleDateString(undefined, {
        year: "numeric",
      });
      html.className += " primary";
    } else {
      html.textContent = week.toString();
    }

    return html;
  }
}
