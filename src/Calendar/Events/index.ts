import { isValid } from "date-fns";
import Event from "./Event";

export default class Events {
  public sortedEvents: Event[];

  constructor(events: Event[]) {
    this.sortedEvents = this.processEvents(events);
  }

  /**
   * processEvents
   *
   * Drops invalid events from dataset
   * Sorts events by date, in ascending order
   *
   * @param events: Event[]
   * @private
   */
  private processEvents(events: Event[]): Event[] {
    const _events = events.reduce((collection, event) => {
      // only include valid events
      if (event.title && event.date && isValid(new Date(event.date))) {
        collection.push(new Event(event));
      }

      return collection;
    }, []);

    // sort events by date, in ascending order
    return _events.sort((a, b) => a.date - b.date);
  }
}
