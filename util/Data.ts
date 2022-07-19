import moment from "moment";
import { Serie } from "../interfaces/IData";
import { Task } from "../interfaces/ITask";

/**
 * Clase escrita con typescript para el calculo de el rendimiento de las tareas
 * tomando como base las fechas en las que se realizo cada tarea
 */
export default class Data {
  private task: Task[] = new Array();
  private uniqueDates: string[] = new Array();
  private series: Serie[] = new Array();

  /**
   * El constructor recibe un arreglo de tipo Task[]
   * @param _task
   */
  constructor(_task: Task[]) {
    this.task = _task;
    this.dates();
    this.calculateSeries();
  }

  /**
   * Ontiene las fechas únicas.
   */
  public dates(): void {
    if (this.task.length > 0) {
      let allDates: string[] = new Array();
      this.task.forEach((e) => {
        e.createDate ? allDates.push(e.createDate) : null;
      });
      this.uniqueDates = allDates.filter((r, i, a) => a.indexOf(r) === i);
    }
  }

  /**
   * Obtiene las sieres apartir de las fechas y hace la sumatoria por cada dia.
   */
  public calculateSeries() {
    let value: Serie = {
      name: "Task",
      data: this.uniqueDates.map((row, i) =>
        this.task
          .filter((e) => e.createDate == row)
          .map((e) => this.getMin(e.time))
          .reduce((x, y) => x + y)
          .toFixed(1)
      ),
    };
    this.series.push(value);
  }

  get _dates(): string[] {
    return this.uniqueDates;
  }

  get _series(): Serie[] {
    return this.series;
  }

  private getMin(time: number): number {
    return moment.duration(time, "millisecond").asHours();
  }
}
