import Table from "../components/Table";
import Layout from "../Layout/Layout";

/**
 * En esta página podemos ver el llamado de un componente llamado Table, como se puede observar
 * este pagina es stateless ya que no hacemos uso del ciclo de vida de React, solo es utilizada para capa
 * de presentación
 * @returns Component
 */
const HistoryPage = () => (
  <Layout title="Task App - History">
    <div className="grid grid-cols-12 mt-4 w-full gap-4">
      <div className="col-span-12">
        <Table />
      </div>
    </div>
  </Layout>
);

export default HistoryPage;
