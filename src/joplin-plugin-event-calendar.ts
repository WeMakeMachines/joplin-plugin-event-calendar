const YAML = require("yaml");

import Calendar from "./Calendar/";

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
        try {
          const jsonContent = YAML.parse(
            markdownIt.utils.escapeHtml(token.content)
          );
          const calendar = new Calendar(jsonContent);
          const contentHtml = calendar.render();
          return `<div class="joplin-editable">${contentHtml.outerHTML}</div>`;
        } catch (error) {
          console.log(error);
        }
      };
    },
    assets: function () {
      return [{ name: "event-calendar.css" }];
    },
  };
}
