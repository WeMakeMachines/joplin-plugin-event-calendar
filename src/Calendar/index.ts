import Config from "../Config/Config";
import Events from "../Events/";
import EventGrouping from "../EventGrouping";

export default class Calendar {
  private readonly jsonContent: object;
  public config: Config;
  public events: Events;
  public eventGrouping: EventGrouping;

  constructor(json) {
    this.jsonContent = json;
    this.config = new Config({
      scale: json["scale"].charAt(0),
    });
    this.events = new Events(json["events"]);
    this.eventGrouping = new EventGrouping(
      this.events.sortedEvents,
      this.config.scale
    );
  }
}
