import * as React from "react";
import Row from "./Rows";
import { Task as ITask, TaskType } from "../interfaces/ITask";
import { useSelector } from "react-redux";
import { getTask } from "../store/reducers/Task";

/**
 * Este componente componente es stateless ya que no hace uso del ciclo de vida de React, solo pinta
 * los parámetros enviados por el componente padre, esto permite generar desacoplamiento entre los
 * componentes, facilita la modificación ya que este objeto esta encapsulado del entorno.
 * @returns
 */
const Table = (): any => {
  const reduxTask: ITask[] = useSelector(getTask);

  return (
    <div className="bg-white p-4 rounded-lg">
      <table className="table w-full border-separate space-y-6 text-sm text-center">
        <thead className="text-appBlue">
          <tr>
            <th className="p-3 w-2/6">Task</th>
            <th className="p-3">Created at</th>
            <th className="p-3">Completed</th>
            <th className="p-3 hidden md:block">Status</th>
            <th className="p-3">Time</th>
            <th className="p-3">Duration</th>
          </tr>
        </thead>
        <tbody>
          {reduxTask.map((e, i) => {
            return e.estatus == TaskType.complete ? (
              <Row key={"tbl-row" + i} data={e} />
            ) : (
              ""
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
