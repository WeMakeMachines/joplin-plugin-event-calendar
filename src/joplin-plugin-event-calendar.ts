import { Scale } from "./types";

const YAML = require("yaml");

import Calendar from "./Calendar/";
import DayRenderer from "./EventGroupingHtmlRenderer/DayRenderer";
import WeekRenderer from "./EventGroupingHtmlRenderer/WeekRenderer";
import MonthRenderer from "./EventGroupingHtmlRenderer/MonthRenderer";

export default function () {
  return {
    plugin: function (markdownIt: any) {
      const defaultRender: Function =
        markdownIt.renderer.rules.fence ||
        function (
          tokens: any[],
          idx: number,
          options: any,
          env: any,
          self: any
        ) {
          return self.renderToken(tokens, idx, options, env, self);
        };

      markdownIt.renderer.rules.fence = function (
        tokens: any[],
        idx: number,
        options: {},
        env: any,
        self: any
      ) {
        const token = tokens[idx];
        if (token.info !== "joplin-plugin-event-calendar")
          return defaultRender(tokens, idx, options, env, self);
        let jsonContent: object;
        let calendar: Calendar;
        let contentHtml = document.createElement("div");
        try {
          jsonContent = YAML.parse(markdownIt.utils.escapeHtml(token.content));
          calendar = new Calendar(jsonContent);
          switch (calendar.config.scale) {
            case Scale.Day:
              contentHtml = new DayRenderer(calendar.eventGrouping).render();
              break;
            case Scale.Week:
              contentHtml = new WeekRenderer(calendar.eventGrouping).render();
              break;
            case Scale.Month:
              contentHtml = new MonthRenderer(calendar.eventGrouping).render();
              break;
          }
        } catch (error) {
          console.log(error);
        }
        return `<div class="joplin-editable">${contentHtml.outerHTML}</div>`;
      };
    },
    assets: function () {
      return [{ name: "event-calendar.css" }];
    },
  };
}
