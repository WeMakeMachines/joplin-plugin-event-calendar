import { MonthGrouping } from "../EventGrouping";
import Renderer from "./Renderer";

export default class MonthRenderer extends Renderer {
  constructor(eventGrouping: MonthGrouping) {
    super(eventGrouping);
    this.container.className += " scale-month";
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

    return html;
  }
}
