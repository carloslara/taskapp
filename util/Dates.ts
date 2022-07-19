import moment, { Moment } from "moment";

export default class Dates {
  private days: number;

  constructor() {
    this.days = Math.floor(Math.random() * (1 - 30) + 1);
  }

  get date(): string {
    return moment().add(-this.days, "days").format("D/M/YYYY");
  }
}
