/**
 * enumeracion para deficinir el estado de la tarea
 */
export enum TaskType {
  new = 0,
  active = 1,
  pause = 2,
  complete = 3,
}

/**
 * Este tipo Tarea se utiliza a lo largo de toda la apliación, de esta manera se tiene un mayor controlo sobre las propiedes
 * que tiene cada tarea.
 */
export type Task = {
  id: number;
  name: string;
  detail: string;
  duration: number;
  active: boolean;
  time: number;
  durationTask: string | null;
  estatus: TaskType;
  createDate: string | null;
  endDate: string | null;
  min: number | null;
  seg: number | null;
};
