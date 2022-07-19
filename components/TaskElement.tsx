import React, { useEffect, useState } from "react";
import { Task as ITask, TaskType } from "../interfaces/ITask";
import {
  PlayIcon,
  PencilAltIcon,
  TrashIcon,
  PauseIcon,
  StopIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/reducers/Item";
import { actions as taskActons, getTask } from "../store/reducers/Task";
import CountDown, { Estatus } from "./CountDown";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/solid";
import Time from "../util/Time";
import moment from "moment";
import CustomCard, { PropsHOC } from "../hoc/Card";

/**
 * Se definen los parámetros y el tipo de dato que se recibirá del componente padre.
 */
type Props = {
  data: ITask;
};

/**
 * Este componente despliegue la tarea con sus particularidades, de esta manera se puede controlar mejor el comportamiento
 * de cada tarea de manera individual.
 * @param param0
 * @returns
 */
const TaskElement = ({ data }: Props) => {
  const dispatch = useDispatch();
  const [statusCountDown, setStatusCountDown] = useState(Estatus.pause);
  const [durationChild, setDurationChild] = useState(data.duration);

  /**
   * Se actualiza el tiempo en caso de que la tarea haya sido actualizada.
   */
  useEffect(() => {
    setDurationChild(data.duration);
  }, [data]);

  /**
   * Funcion para editar una tarea por medio del estado del Redux.
   * @param selecteItem
   */
  const editTask = (selecteItem: ITask) => {
    console.log(selecteItem);
    dispatch(actions.setItem(selecteItem));
  };

  /**
   * Eliminar una tarea del estado del Redux, se pasa el parámetro el id de la tarea.
   * @param idTask
   */
  const deleteTask = (idTask: number) => {
    dispatch(taskActons.deleteTask(idTask));
  };

  /**
   * Esta función se pasa como parámetro dentro del componente CountDown, sirve para obtener la duración de la tarea y
   * almacenar el estado en el almacenamiento del Redux.
   * @param value
   */
  const getTime = (value: number) => {
    const durationTime = moment
      .duration(data.duration, "millisecond")
      .add(-value, "milliseconds");
    const time = new Time(durationTime.asMilliseconds());
    const date = new Date();
    let task: ITask = {
      id: data.id,
      name: data.name,
      detail: data.detail,
      duration: data.duration,
      active: data.active,
      time: value,
      durationTask: time.format,
      estatus: TaskType.complete,
      createDate: data.createDate,
      endDate: date.toLocaleDateString(),
      min: data.min,
      seg: data.seg,
    };
    dispatch(taskActons.updateTask(task));
  };

  /**
   * Esta función se pasa como parámetro dentro del componente CountDown, sirve para obtener la duración de la tarea y
   * almacenar el estado en el almacenamiento del Redux solo cuando se detecta que el usuario dejo la tarea y de esta manera
   * se pueda pausar el tiempo.
   * @param value
   */
  const getTimeOnLeave = (value: number) => {
    const durationTime = moment
      .duration(data.duration, "millisecond")
      .add(-value, "milliseconds");
    const time = new Time(durationTime.asMilliseconds());
    const date = new Date();
    let task: ITask = {
      id: data.id,
      name: data.name,
      detail: data.detail,
      duration: data.duration,
      active: data.active,
      time: value,
      durationTask: time.format,
      estatus: TaskType.pause,
      createDate: data.createDate,
      endDate: date.toLocaleDateString(),
      min: data.min,
      seg: data.seg,
    };
    dispatch(taskActons.updateTask(task));
  };

  return (
    <div className="h-full">
      <div className="relative flex items-center">
        <CountDown
          key={data.id + "-" + data.duration}
          {...props}
          parenttime={durationChild}
          parentStatus={statusCountDown}
          parentCallback={getTime}
          parentCallbackOnleave={getTimeOnLeave}
        />
      </div>
      <div className="relative flex items-center justify-between mt-2 p-4">
        <button
          className="bg-appBlue-dark rounded-full cursor-pointer hover:bg-appBlue-soft"
          onClick={() => setStatusCountDown(Estatus.start)}
        >
          <PlayIcon className="w-6 text-appBlue-light m-2" />
        </button>
        <button
          className="bg-appBlue-dark rounded-full cursor-pointer hover:bg-appBlue-soft"
          onClick={() => setStatusCountDown(Estatus.pause)}
        >
          <PauseIcon className="w-6 text-appBlue-light m-2" />
        </button>
        <button
          className="bg-appBlue-dark rounded-full cursor-pointer hover:bg-appBlue-soft"
          onClick={() => setStatusCountDown(Estatus.reload)}
        >
          <RefreshIcon className="w-6 text-appBlue-light m-2" />
        </button>
        <button
          className="bg-appBlue-dark rounded-full cursor-pointer hover:bg-appBlue-soft"
          onClick={() => setStatusCountDown(Estatus.stop)}
        >
          <StopIcon className="w-6 text-appBlue-light m-2" />
        </button>
        <button
          className="bg-green-500 rounded-full cursor-pointer hover:bg-green-400"
          onClick={() => setStatusCountDown(Estatus.success)}
        >
          <CheckCircleIcon className="w-6 text-appBlue-light m-2" />
        </button>
      </div>
      <div className="relative flex justify-between p-4">
        <h3 className="font-bold mb-2 uppercase text-appBlue align-middle">
          #{data.id}
        </h3>
        <div className="float-right">
          <span className="bg-appBlue text-appBlue-light text-sm font-bold rounded py-0.5 px-2">
            {data.createDate}
          </span>
        </div>
      </div>
      <div className="flex-1 px-4">
        <label className="text-appBlue block font-bold">{data.name}</label>
        <label className="text-appBlue-dark block italic">{data.detail}</label>
      </div>
      <div className="relative flex justify-between px-4 py-3 gap-2">
        <button
          className=" rounded-full w-full cursor-pointer bg-appBlue-light text-appBlue-dark border-appBlue border-2"
          onClick={(e) => editTask(data)}
        >
          <PencilAltIcon className="w-4 m-2 inline" />
        </button>
        <button
          className=" rounded-full w-full cursor-pointer bg-red-500"
          onClick={(e) => deleteTask(data.id)}
        >
          <TrashIcon className="w-4 text-white m-2 inline" />
        </button>
      </div>
    </div>
  );
};

/**
 * PropsHoc proporciona los parámetros para personalizar el nuevo componente que devolverá por orden de prioridad.
 */
const props: PropsHOC = {
  styleGrid: "col-span-12 md:col-span-6 lg:col-span-3",
  styleCard: "shadow-lg md:rounded-lg px-3 pt-4 pb-4 mb-0 md:mb-4 bg-white",
};

/**
 * Se manda llamar el componente CustomCard para que devuelva el nuevo componente personalizado y muestra la tarea activa.
 */
export default CustomCard(TaskElement, props);
