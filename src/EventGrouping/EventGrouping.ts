import { Event, Groups } from "../types";

export default abstract class EventGrouping {
  protected readonly sortedEvents: Event[];
  protected readonly firstEvent: Event;
  protected readonly lastEvent: Event;
  public groups: Groups;

  protected constructor(sortedEvents: Event[]) {
    this.sortedEvents = sortedEvents;
    this.firstEvent = this.sortedEvents[0];
    this.lastEvent = this.sortedEvents[this.sortedEvents.length - 1];
  }

  protected generateEmptyGroups(length: number): Groups {
    const groups = [];

    for (let i = 0; i <= length; i += 1) {
      groups.push([]);
    }

    return groups;
  }

  public abstract getDateFromGroupIndex(index: number): Date;

  public abstract group(): Groups;
}
