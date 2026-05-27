import WeekGrouping from "../../Group/Week/WeekGrouping";
import mockSortedEvents from "./mockSortedEvents";

describe("groupEventsByWeek should", () => {
  const eventGrouping = new WeekGrouping(mockSortedEvents);

  test("generate the correct number of groups", () => {
    expect(eventGrouping.groups.length).toEqual(2);
  });

  test("place into the same group, events that occur on the same week", () => {
    expect(eventGrouping.groups[1].length).toEqual(3);
  });
});
