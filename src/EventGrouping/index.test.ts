const EventGrouping = require("./index").default;
const { GroupTypes } = require("../types");

const mockSortedEvents = [
  {
    date: new Date(2022, 3, 20),
    title: "first day of spring",
  },
  {
    date: new Date(2022, 3, 25),
    title: "my birthday",
  },
  {
    date: new Date(2022, 3, 25),
    title: "buy cake for 27th",
  },
  {
    date: new Date(2022, 3, 27),
    title: "d's birthday",
  },
];

describe("groupEventsByDay should", () => {
  const eventGrouping = new EventGrouping(mockSortedEvents, GroupTypes.Day);

  test("generate the correct number of groups", () => {
    expect(eventGrouping.groups.length).toEqual(8);
  });

  test("place into the same group, events that occur on the same day", () => {
    expect(eventGrouping.groups[5].length).toEqual(2);
  });
});

describe("groupEventsByWeek should", () => {
  const eventGrouping = new EventGrouping(mockSortedEvents, GroupTypes.Week);

  test("generate the correct number of groups", () => {
    expect(eventGrouping.groups.length).toEqual(2);
  });

  test("place into the same group, events that occur on the same week", () => {
    expect(eventGrouping.groups[1].length).toEqual(3);
  });
});

describe("groupEventsByMonth should", () => {
  const eventGrouping = new EventGrouping(mockSortedEvents, GroupTypes.Month);

  test("generate the correct number of groups", () => {
    expect(eventGrouping.groups.length).toEqual(1);
  });

  test("place into the same group, events that occur on the same month", () => {
    expect(eventGrouping.groups[0].length).toEqual(4);
  });
});
