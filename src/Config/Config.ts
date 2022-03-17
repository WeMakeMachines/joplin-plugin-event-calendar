import { GroupTypes } from "../types";

export default class Config {
  groupTypes: GroupTypes;

  constructor({ groupTypes }) {
    this.groupTypes = groupTypes.toUpperCase() || GroupTypes.Week;
  }
}
