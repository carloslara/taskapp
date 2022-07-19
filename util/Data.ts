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
  private series: number[] = new Array();

  /**
   * El constructor recibe un arreglo de tipo Task[], se realizo de esta manera
   * pensando en la reutilización del código, en caso de que la aplicación crezca o se mejore
   * se puede generar cambios de manera fácil ya que se tienen los elementos desacoplados de los componentes
   * actuales.
   * @param _task
   */
  constructor(_task: Task[]) {
    this.task = _task;
    this.dates();
    this.calculateSeries();
  }

  /**
   * Obtener las fechas únicas a partir de la lista obtenida en el constructor
   * de esta manera podemos generar las coordenadas en el plano X.
   */
  public dates(): void {
    if (this.task.length > 0) {
      let allDates: string[] = new Array();
      this.task.forEach((e) => {
        e.createDate ? allDates.push(e.createDate) : null;
      });
      this.uniqueDates = this.customSort(
        allDates.filter((r, i, a) => a.indexOf(r) === i)
      );
    }
  }

  /**
   * Obtiene las series a partir de las fechas y hace la sumatoria por cada fecha única que se tenga en el arreglo de fechas únicas.
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
    this.series = value.data.map((e) => parseFloat(e));
  }

  /**
   * Funciones para obtener los arreglos fuera de la clase, de esta manera podemos simular encapsulamiento.
   */
  get _dates(): string[] {
    return this.uniqueDates;
  }

  get _series(): number[] {
    return this.series;
  }

  /**
   * Función para obtener los milisegundo de un número expresado en minutos.
   * @param time
   * @returns
   */
  private getMin(time: number): number {
    return moment.duration(time, "millisecond").asHours();
  }

  /**
   * Función para ordenar las fechas en cadena.
   * @param data
   * @returns
   */
  private customSort(data: string[]): string[] {
    return data.sort((a, b) => {
      const dataA = a.split("/").reverse().join("-");
      const dataB = b.split("/").reverse().join("-");
      return +new Date(dataA) - +new Date(dataB);
    });
  }
}
