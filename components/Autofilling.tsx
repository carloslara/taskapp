import { useState } from "react";
import { DownloadIcon } from "@heroicons/react/outline";
import Post from "../Services/Post";
import { Task, TaskType } from "../interfaces/ITask";
import { useDispatch, useSelector } from "react-redux";
import { actions, getTaskSize } from "../store/reducers/Task";
import Durations from "../util/Durations";
import Time from "../util/Time";
import Dates from "../util/Dates";
import IPost from "../interfaces/IPost";

/**
 * Este componente hace uso del ciclo de vida de React por medio de Redux, esta página hace uso
 * de un servicio llamado Post, el cual descagar 100 registros de un api público para el llenado automático
 * de tareas.
 * @returns Component
 */

const Autofilling = (): any => {
  const dispatch = useDispatch();
  const reduxTaskSize: number = useSelector(getTaskSize);
  const [isDownload, setDownload] = useState(false);
  const [barProgress, setBarProgress] = useState(0);

  /**
   * Esta función  es asíncrona y espera la respuesta del api, es un servicio tipo GET el cual
   * regresa 100 registros y hace el prellenado del estado de Redux, itera el resultado del servicio y agrega
   * al state nuevas tareas, marcadas como finalizadas para simular que la aplicación ha sido utilizada a lo largo del mes.
   */
  const getData = async () => {
    setDownload(true);
    Post()
      .then((response) => {
        response.data.map((e: IPost, i: number) => {
          const duration = new Durations(30, 120); //Clase para manejo de duración de una tarea a partir de rangos y mantener el control de la app.
          const tiempoTarea: number = duration.milliseconds; // Valor en milisegundos.
          const tiempoRestante: number = duration.restante(); // Calculo de tiempo restante apartir de la duración aleatoria seleccionada.
          const time = new Time(tiempoTarea - tiempoRestante); // Calculo de duracion de realización de tarea.
          const dates = new Dates(); //Clase para manejo de fechas de acuerdo a como las usa el sistema.
          let task: Task = {
            id: reduxTaskSize == 0 ? 1 : reduxTaskSize + i,
            name: e.title.substring(0, 15),
            detail: e.body.substring(0, 45),
            duration: tiempoTarea,
            active: false,
            time: tiempoRestante,
            durationTask: time.format,
            estatus: TaskType.complete,
            createDate: dates.date,
            endDate: dates.date,
            min: 0,
            seg: 0,
          };
          dispatch(actions.setTask(task));
          setTimeout(function () {
            setBarProgress(++i);
          }, 2500);
        });
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setTimeout(function () {
          setDownload(false);
        }, 3000);
      });
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="relative flex items-center justify-center mb-5">
        <button
          className="bg-blue-500 p-2 px-4 rounded-lg text-white font-bold hover:bg-blue-600 cursor-pointer"
          onClick={(e) => getData()}
        >
          <DownloadIcon className="w-5 stroke-blue-100 stroke-2 inline" />{" "}
          {isDownload ? "Downloading" : "Download Data"}
        </button>
      </div>
      <div className="h-3 relative max-full rounded-full overflow-hidden">
        <div className="w-full h-full bg-gray-200 absolute"></div>
        <div
          className={"h-full bg-green-500 absolute "}
          style={{ width: `${barProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Autofilling;
