import Layout from "../Layout/Layout";
import CustomCard from "../components/Form";
import List from "../components/List";

/**
 * En esta página podemos ver el llamado de un componente llamado CustomCard, como se puede observar
 * este pagina es stateless ya que no hacemos uso del ciclo de vida de React, solo es utilizada para capa
 * de presentación
 * @returns Component
 */
const IndexPage = () => (
  <Layout title="Task App">
    <div className="grid grid-cols-12 gap-1 md:gap-4">
      <List />
      <CustomCard />
    </div>
  </Layout>
);

export default IndexPage;
