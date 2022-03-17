import { format } from "date-fns";
import { generateRandomColor } from "../utilities";
import EventGrouping from "../EventGrouping";
import { Event } from "../types";

export default abstract class Renderer {
  protected abstract renderDateAsIcon(
    eventDate: Date,
    groupIndex: number
  ): HTMLSpanElement;

  protected container: HTMLDivElement;
  protected eventGrouping: EventGrouping;

  protected constructor(eventGrouping: EventGrouping) {
    this.container = document.createElement("div");
    this.container.className = "event-calendar";
    this.eventGrouping = eventGrouping;
  }

  protected renderGroups(): HTMLDivElement[] {
    return this.eventGrouping.groups.map((group, index) => {
      const html = document.createElement("div");
      html.className = "group";

      if (group.length) {
        const htmlHoverCard = this.renderHoverCard(group);
        html.appendChild(htmlHoverCard);
      }

      let htmlGroupIcon: HTMLSpanElement;
      // only need to render icon from first event in group
      const event = group[0];

      if (event) {
        htmlGroupIcon = this.renderIcon(event);
        html.className += " icon";
        if (event.bgColor) {
          html.style.backgroundColor = event.bgColor;
        } else {
          const randomColor = generateRandomColor();
          html.style.backgroundColor = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;
        }
      } else {
        const eventDate = this.eventGrouping.getDateFromGroupIndex(index);
        htmlGroupIcon = this.renderDateAsIcon(eventDate, index);
      }

      html.appendChild(htmlGroupIcon);

      return html;
    });
  }

  protected renderHoverCard(events: Event[]): HTMLDivElement {
    const html = document.createElement("div");
    html.className = "hover-card";

    const htmlMonthYear = document.createElement("p");
    htmlMonthYear.className = "month-year";
    htmlMonthYear.textContent = events[0].date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
    });

    html.appendChild(htmlMonthYear);

    const cardDetails = events.map((event) => {
      if (!event) {
        return;
      }

      const htmlEvent = document.createElement("div");
      htmlEvent.className = "event";
      const htmlEventDate = document.createElement("p");
      htmlEventDate.className = "date";
      htmlEventDate.textContent = format(event.date, "EEEE do");
      const htmlEventTitle = document.createElement("p");
      htmlEventTitle.className = "title";
      htmlEventTitle.textContent = event.title;
      const htmlEventText = document.createElement("p");
      htmlEventText.className = "text";
      htmlEventText.textContent = event.text;

      htmlEvent.appendChild(htmlEventDate);
      htmlEvent.appendChild(htmlEventTitle);
      htmlEvent.appendChild(htmlEventText);

      return htmlEvent;
    });

    cardDetails.forEach((cardDetail) => html.appendChild(cardDetail));

    return html;
  }

  protected renderIcon(event: Event | undefined): HTMLSpanElement {
    const html = document.createElement("span");
    html.className = "event";

    if (event.icon) {
      html.textContent = event.icon;
    }

    return html;
  }

  public render() {
    const groups = this.renderGroups();

    groups.forEach((group) => this.container.appendChild(group));

    return this.container;
  }
}
