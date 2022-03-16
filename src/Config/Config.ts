import { Scale } from "../types";

export default class Config {
  scale: Scale;

  constructor({ scale }) {
    this.scale = scale.toUpperCase() || Scale.Week;
  }
}
