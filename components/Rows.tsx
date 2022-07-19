import React from "react";
import { Task as ITask, TaskType } from "../interfaces/ITask";
import Time from "../util/Time";
import { CheckIcon } from "@heroicons/react/solid";

/**
 * Se define los parametros de este componente
 */
type Props = {
  data: ITask;
};

/**
 * Este componente componente es stateless ya que no hace uso del ciclo de vida de React, solo pinta
 * los parámetros enviados por el componente padre, esto permite generar desacoplamiento entre los
 * componentes, facilita la modificación ya que este objeto esta encapsulado del entorno.
 * @param param0
 * @returns
 */
const Row = ({ data }: Props) => {
  const time = new Time(data.duration);
  return (
    <tr className="bg-appBlue-light rounded-lg">
      <td className="p-3">
        <div className="flex align-items-center">
          <div className="ml-3">
            <div className="font-bold">{data.name}</div>
            <div className="text-gray-500">{data.detail}</div>
          </div>
        </div>
      </td>
      <td className="p-3">{data.createDate}</td>
      <td className="p-3">{data.endDate}</td>
      <td className="p-3">
        <span className="bg-appBlue text-gray-50 font-bold rounded-full px-4 py-0.5 uppercase text-xs block">
          <CheckIcon className="w-4 -mt-0.5 inline" /> Complete
        </span>
      </td>
      <td className="p-3 font-bold text-appBlue-dark">{time.format}</td>
      <td className="p-3 font-bold text-appBlue-dark">{data.durationTask}</td>
    </tr>
  );
};

export default Row;
