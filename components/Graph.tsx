import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Data from "../util/Data";
import { Task as ITask } from "../interfaces/ITask";
import { useSelector } from "react-redux";
import { getTask } from "../store/reducers/Task";
import { Serie } from "../interfaces/IData";

/**
 * Este componente regresa una grafica a partir de las tareas almacenadas en el state del Redux, la librería empleada se llama
 * apexcharts, permite un manejo dinámico en el renderizado de gráficos, ya que muestra un SVG que puede ser fácilmente personalizado.
 * @returns
 */
const Graph = (): any => {
  const reduxTask: ITask[] = useSelector(getTask);
  const data = new Data(reduxTask);
  /**
   * Se crean objetos vacíos para inicializar el componente gráfico.
   */
  const [options, setOptions] = useState<ApexOptions>({
    chart: { id: "report-graph" },
    xaxis: {
      categories: [],
    },
    title: {
      text: "Productivity of the month (Hours)",
    },
    yaxis: {
      title: {
        text: "Duration of tasks per day",
      },
    },
  });
  const [series, setSeries] = useState<ApexAxisChartSeries | null>([
    {
      name: "Number of hours:",
      data: [0],
    },
  ]);

  /**
   * Este hook se utiliza para actualizar los datos de la grafica a partir de la clase Data.
   */
  useEffect(() => {
    setOptions({
      ...options,
      xaxis: {
        categories: data._dates,
      },
    });
    setSeries([{ ...options, data: data._series }]);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg">
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default Graph;
