import React, { useEffect, useState } from "react";
import moment from "moment";
import Time from "../util/Time";

/**
 * Esta lista contiene los estados de una tarea, esto es muy útil ya que nos permte controlar los estados reales de una aplicación
 * y poner una numeración, de esta manera sabemos que los estados solo pueden tener estos ID's en toda la aplicación, de esta manera
 * se controla los estados de cada tarea.
 */
export enum Estatus {
  start = 1,
  pause = 2,
  stop = 3,
  success = 4,
  reload = 5,
}

/**
 * En esta interfaz se definieron los siguientes parámetros
 * 1.- parenttime: el numero con el que iniciará el contador
 * 2.- parentstatus: el estado en el que se encuentra el contador, esta variable es de tipo Estatus y no puede recibir
 * otro numero que no este declarado en la numeración.
 * 3.- parentCallback: función para el retorno de valores al componente padre.
 * 4.- parentCallbackOnleave: función para el retorno de valores al componente padre cuando se deja cierra la aplicación.
 */
interface Props {
  parenttime: number;
  parentStatus: Estatus;
  parentCallback: Function;
  parentCallbackOnleave: Function;
}

/**
 * Componente CountDown, se encarga de mostrar el contador de manera regresiva hasta 0, la clase realiza acciones a partir
 * de parámetro status que recibe del componente padre.
 * @param param0 Tipo Props
 * @returns
 */
const CountDonw = ({
  parenttime,
  parentStatus,
  parentCallback,
  parentCallbackOnleave,
}: Props) => {
  const [time, setTime] = useState(parenttime);
  const [start, setStart] = useState(false);
  let formatTime: Time;

  /**
   * Este hook nos permite detectar cambios en la duración de la tarea que provengan del padre y setear la varíale local time.
   */
  useEffect(() => {
    setTime(parenttime);
  }, [parenttime]);

  /**
   * En este hook se definió un intervalo de tiempo de 1 segundo en donde el contador va restando un segundo al temporalizador
   * de esta manera podemos ver la animación en cuenta regresiva.
   */
  useEffect(() => {
    let interval: any = null;
    if (start) {
      interval = setInterval(() => {
        if (time > 0) {
          setTime((prev) => moment(prev).set("milliseconds", -1000).valueOf());
        } else {
          setTime(0);
          setStart(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start]);

  /**
   * Este hook nos permite modificar las variables locales dependiendo el estado de la tarea padre
   * puede iniciar el contador, pausar el contador, detener el contador, obtener el tiempo transcurrido para
   * marcar la tarea como finalizada en el componente padre, reiniciar el contador.
   */
  useEffect(() => {
    if (parentStatus == Estatus.start) {
      setStart(true);
    } else if (parentStatus == Estatus.pause) {
      setStart(false);
    } else if (parentStatus == Estatus.stop) {
      setTime(0);
      setStart(false);
    } else if (parentStatus == Estatus.success) {
      setStart(false);
      parentCallback(time);
    } else if (parentStatus == Estatus.reload) {
      setStart(false);
      setTime(parenttime);
    }
  }, [parentStatus]);

  useEffect(() => {
    window.addEventListener("unload", alertUser);
    //window.addEventListener("unload", parentCallbackOnleave(time));
  });

  const alertUser = (e: Event) => {
    console.log("leave page");
    e.preventDefault();
    return false;
  };

  /**
   * Funcion para validad cuando el tiempo es igual a 0 y marcar la tarea como finalizada.
   * @returns Component
   */
  const Display = () => {
    if (time > 0) {
      formatTime = new Time(time);
      return <span className="text-4xl">{formatTime.format}</span>;
    } else {
      setTime(0);
      setStart(false);
      setTimeout(function () {
        parentCallback(time);
      }, 1500);
      return <span className="text-red-600 text-4xl">Time over</span>;
    }
  };

  return (
    <div className="w-full p-3 text-appBlue-dark text-2xl text-center font-bold font-mono rounded-t ">
      <Display />
    </div>
  );
};

export default CountDonw;
