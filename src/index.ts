import joplin from "api";
import { ContentScriptType } from "api/types";

joplin.plugins.register({
	onStart: async function () {
		await joplin.contentScripts.register(
			ContentScriptType.MarkdownItPlugin,
			"joplin-plugin-event-calendar",
			"./joplin-plugin-event-calendar.js"
		);
	},
});
