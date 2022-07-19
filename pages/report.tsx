import Layout from "../Layout/Layout";
// import Graph from "../components/Graph";
import dynamic from "next/dynamic";

/**
 * En esta página podemos ver el llamado de un componente llamado Graph, como se puede observar
 * este pagina es stateless ya que no hacemos uso del ciclo de vida de React, solo es utilizada para capa
 * de presentación
 * @returns Component
 */

const GraphNoSSR = dynamic(() => import("../components/Graph"), { ssr: false });

const ReportPage = () => (
  <Layout title="Task App - Reports">
    <div className="grid grid-cols-12 mt-4 w-full gap-4">
      <div className="col-span-12">
        <GraphNoSSR />
      </div>
    </div>
  </Layout>
);
export default ReportPage;
