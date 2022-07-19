import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTask } from "../store/reducers/Task";
import { getSelectedFilter } from "../store/reducers/Filter";
import { Task as ITask, TaskType } from "../interfaces/ITask";
import TaskElement from "./TaskElement";
import { EFilter } from "../interfaces/EFilter";

/**
 * Este componente permite renderizar la lista de tareas activas
 * @returns
 */
const List: any = (): any => {
  const reduxTask: ITask[] = useSelector(getTask);
  const reduxFilter: EFilter = useSelector(getSelectedFilter);
  const [list, setList] = useState<ITask[]>([]);

  /**
   * Este efecto se usa para escuchar los cambios en el filtro y las tareas, de esta manera podemos vizualizar los cambios
   * en la lista de tareas cuando un usuario seleccione un filtro o cree una nueva tarea.
   */
  useEffect(() => {
    if (reduxFilter == EFilter.clear) {
      setList(reduxTask);
    } else if (reduxFilter == EFilter.filter_min) {
      setList(reduxTask.filter((row: ITask) => row.duration <= 1800000));
    } else if (reduxFilter == EFilter.filter_med) {
      setList(
        reduxTask.filter(
          (row: ITask) => row.duration > 1800000 && row.duration <= 3600000
        )
      );
    } else if (reduxFilter == EFilter.filter_max) {
      setList(reduxTask.filter((row: ITask) => row.duration > 3600000));
    }
  }, [reduxFilter, reduxTask]);

  return list.map((e: ITask, i: number) => {
    return e.estatus != TaskType.complete ? (
      <TaskElement key={"task-" + i} data={e} />
    ) : (
      ""
    );
  });
};

export default List;
