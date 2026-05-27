import MonthGrouping from "../../Group/Month/MonthGrouping";
import mockSortedEvents from "./mockSortedEvents";

describe("groupEventsByMonth should", () => {
  const eventGrouping = new MonthGrouping(mockSortedEvents);

  test("generate the correct number of groups", () => {
    expect(eventGrouping.groups.length).toEqual(1);
  });

  test("place into the same group, events that occur on the same month", () => {
    expect(eventGrouping.groups[0].length).toEqual(4);
  });
});
