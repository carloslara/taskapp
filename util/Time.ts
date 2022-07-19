import moment, { Moment } from "moment";

export default class Time {
  private value: number;
  constructor(_value: number) {
    this.value = _value;
  }
  get hour(): string {
    return ("0" + moment.duration(this.value, "milliseconds").hours()).slice(
      -2
    );
  }
  get mintues(): string {
    return ("0" + moment.duration(this.value, "milliseconds").minutes()).slice(
      -2
    );
  }
  get seconds(): string {
    return ("0" + moment.duration(this.value, "milliseconds").seconds()).slice(
      -2
    );
  }
  get format(): string {
    return (
      ("0" + moment.duration(this.value, "milliseconds").hours()).slice(-2) +
      ":" +
      ("0" + moment.duration(this.value, "milliseconds").minutes()).slice(-2) +
      ":" +
      ("0" + moment.duration(this.value, "milliseconds").seconds()).slice(-2)
    );
  }
}
