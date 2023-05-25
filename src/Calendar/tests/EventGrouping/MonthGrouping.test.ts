const { GroupTypes } = require("../../../types");
const MonthGrouping = require("../../EventGrouping/MonthGrouping").default;
const mockSortedEvents = require("./mockSortedEvents").default;

describe("groupEventsByMonth should", () => {
  const eventGrouping = new MonthGrouping(mockSortedEvents, GroupTypes.Month);

  test("generate the correct number of groups", () => {
    expect(eventGrouping.groups.length).toEqual(1);
  });

  test("place into the same group, events that occur on the same month", () => {
    expect(eventGrouping.groups[0].length).toEqual(4);
  });
});
