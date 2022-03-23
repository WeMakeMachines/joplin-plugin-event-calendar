import { GroupTypes } from "../types";

export default class Config {
  groupType: GroupTypes;

  constructor({ groupType }) {
    this.groupType = groupType.toUpperCase();
  }
}
