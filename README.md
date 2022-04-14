# Event Calendar Plugin for Joplin

This is a plugin for the Joplin note-taking app.

It creates a calendar view of events that have been specified using the [YAML](https://yaml.org/) syntax within a fenced block.

*Example Day view*
![preview](./DOCS/preview_day.png)

## About

- Ability to change the group view; you can group events by day, week or by month
- Events can be specified in any order
- Events can be given an icon
- Focus is on readability and simplicity of content, which is why the YAML is simple in structure

## How to use

Create a fenced block with the **codetype** `joplin-plugin-event-calendar`

### Example with one event

    ```joplin-plugin-event-calendar
    group: day
    events:
    - date: 2012-11-05
      icon: 🔥
      title: Bonfire night
      text: We have been collecting wood for a week now...
      bgColor: orange
    ```

Events are specified using the YAML syntax, with the following keys:

### Group

> **group**
>
> - _**optional**_ 
> - **accepts** : `day`, `week`, `month`, `d`, `w`, `m`
> - **default** `day`
>
> Sets the grouping for the view

### Each event has the following properties

> **date**
>
> - **required**
> - **accepts** : _yyyy-mm-dd_ or _mm-dd-yyyy_
>
> The date of the event

> **icon**
>
> - **optional**
> - **accepts** : _string_
>
> The icon for the event

> **title**
>
> - **required**
> - **accepts** : _string_
>
> The title or heading of the event

> **text**
>
> - **optional**
> - **accepts** : _string_
>
> A more detailed description of the event

> **bgColor**
>
> - **optional**
> - **accepts** : _string_
> - **default** : random
>
> The background color for the event container

## Acknowledgements

This project was inspired by the [Joplin Life Calendar Plugin](https://github.com/hieuthi/joplin-plugin-life-calendar)
