import { Event } from "../../../types";
import { generateRandomColor } from "../../../utilities";

export default abstract class GroupRenderer {
  protected container: HTMLDivElement;
  protected group: Event[];
  protected groupDate: Date;
  protected groupIndex: number;

  protected abstract renderDateAsIcon(
    eventDate: Date,
    groupIndex: number
  ): HTMLSpanElement;

  constructor(group: Event[], groupDate: Date, groupIndex: number) {
    this.container = document.createElement("div");
    this.container.className = "group";
    this.group = group;
    this.groupDate = groupDate;
    this.groupIndex = groupIndex;
  }

  highlightGroup(): void {
    this.container.className += " highlight";
  }

  render(): HTMLDivElement {
    if (this.group.length) {
      const htmlHoverCard = this.renderHoverCard(this.group);
      this.container.appendChild(htmlHoverCard);
    }

    let htmlGroupIcon: HTMLSpanElement;
    // only need to render icon from first event in group
    const event = this.group[0];

    if (event) {
      htmlGroupIcon = this.renderIcon(event);
      this.container.className += " icon";
      if (event.bgColor) {
        this.container.style.backgroundColor = event.bgColor;
      } else {
        const randomColor = generateRandomColor();
        this.container.style.backgroundColor = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;
      }
    } else {
      htmlGroupIcon = this.renderDateAsIcon(this.groupDate, this.groupIndex);
    }

    this.container.appendChild(htmlGroupIcon);

    return this.container;
  }

  renderIcon(event: Event | undefined): HTMLSpanElement {
    const html = document.createElement("span");
    html.className = "event";

    if (event.icon) {
      html.textContent = event.icon;
    } else {
      html.textContent = event.title.slice(0, 2);
    }

    return html;
  }

  renderHoverCard(events: Event[]): HTMLDivElement {
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
      htmlEventDate.textContent = event.date.toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
      });
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
}
