import Event from "./Event";

export default class Events {
  sortedEvents: Event[];

  constructor(events: Event[]) {
    this.sortedEvents = this.processEvents(events);
  }

  processEvents(events): Event[] {
    const _events = events.map((event) => new Event(event));

    return _events.sort((a, b) => a.date - b.date);
  }
}
