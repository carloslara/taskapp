/**
 * Esta interfaz se creo para el manejo mas efectivo de datos que devuelve el servicio para prellenado de tareas.
 */
export default interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}
