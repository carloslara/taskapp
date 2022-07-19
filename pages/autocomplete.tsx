import Layout from "../Layout/Layout";
import Autofilling from "../components/Autofilling";

/**
 * En esta página podemos ver el llamado de un componente llamado Autofilling, como se puede observar
 * este pagina es stateless ya que no hacemos uso del ciclo de vida de React, solo es utilizada para capa
 * de presentación
 * @returns Component
 */
const Autocomplete = () => (
  <Layout title="Task App - Reports">
    <div className="grid grid-cols-12 mt-4 w-full gap-4">
      <div className="col-span-12">
        <Autofilling />
      </div>
    </div>
  </Layout>
);

export default Autocomplete;
