import moment from "moment";

export default class Durations {
  private _durationMin: number;

  constructor(min: number, max: number) {
    this._durationMin = Math.floor(Math.random() * (max - min) + min);
  }

  public restante() {
    const duracionTarea = Math.floor(
      Math.random() * (this._durationMin - 1) + 1
    );
    return moment
      .duration(this._durationMin - duracionTarea, "minutes")
      .asMilliseconds();
  }

  get duration(): number {
    return this._durationMin;
  }

  get milliseconds(): number {
    return moment.duration(this._durationMin, "minutes").asMilliseconds();
  }
}
