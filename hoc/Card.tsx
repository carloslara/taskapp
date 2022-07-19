/**
 * @param Component: Componente
 * @param style: string
 * @returns Componente personalizado
 *
 * Se utiliza un patron basico de diseño avanzado llamdo Componentes de orden
 * superior o (HOC higher-order component) para la creacion de el componente
 * card, recibe un componente y devuelve un nuevo componente.
 */
export type PropsHOC = {
  styleGrid: string;
  styleCard: string;
};

const CustomCard =
  (Component: any, { styleGrid, styleCard }: PropsHOC) =>
  ({ ...props }) => {
    return (
      <div className={styleGrid}>
        <div className={styleCard}>
          <Component {...props} />
        </div>
      </div>
    );
  };

export default CustomCard;
