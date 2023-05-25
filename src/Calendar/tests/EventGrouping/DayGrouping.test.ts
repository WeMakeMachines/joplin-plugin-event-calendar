const { GroupTypes } = require("../../../types");
const DayGrouping = require("../../EventGrouping/DayGrouping").default;
const mockSortedEvents = require("./mockSortedEvents").default;

describe("groupEventsByDay should", () => {
  const eventGrouping = new DayGrouping(mockSortedEvents, GroupTypes.Day);

  test("generate the correct number of groups", () => {
    expect(eventGrouping.groups.length).toEqual(8);
  });

  test("place into the same group, events that occur on the same day", () => {
    expect(eventGrouping.groups[5].length).toEqual(2);
  });
});
