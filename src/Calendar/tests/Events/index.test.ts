const Events = require("../../Events").default;

const mockEventsAllValid = [
  {
    date: "2022-3-27",
    title: "d's birthday",
  },
  {
    date: "2022-3-25",
    title: "my birthday",
  },
  {
    date: "2022-3-25",
    title: "buy cake for 27th",
  },
  {
    date: "2022-3-20",
    title: "first day of spring",
  },
];

const mockEventsAllInvalid = [
  {
    date: new Date("haha"),
    title: "first day of spring",
  },
  {
    date: "2022-3-25",
  },
];

describe("Events constructor should", () => {
  describe("When the events are valid", () => {
    const events = new Events(mockEventsAllValid);

    test("generate the correct number of events", () => {
      expect(events.sortedEvents.length).toEqual(4);
    });

    test("sort the events by date, ascending", () => {
      const firstEventDate = new Date(events.sortedEvents[0].date).getDate();
      const lastEventDate = new Date(
        events.sortedEvents[events.sortedEvents.length - 1].date
      ).getDate();
      expect(firstEventDate).toEqual(20);
      expect(lastEventDate).toEqual(27);
    });
  });

  describe("When the events are invalid", () => {
    const events = new Events(mockEventsAllInvalid);

    test("generate the correct number of events", () => {
      expect(events.sortedEvents.length).toEqual(0);
    });
  });
});
