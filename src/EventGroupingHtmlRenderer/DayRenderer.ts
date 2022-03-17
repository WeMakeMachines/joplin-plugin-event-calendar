import EventGrouping from "../EventGrouping";
import Renderer from "./Renderer";

export default class DayRenderer extends Renderer {
  constructor(eventGrouping: EventGrouping) {
    super(eventGrouping);
    this.container.className += " scale-day";
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

    return html;
  }
}
