import { FC, useState, useRef, useEffect } from "react";
import "./icons.scss";

export type IconProps = { fill?: string; width?: string };

type Props = { name: string } & IconProps;

const Icon: FC<Props> = ({ name, fill, width }) => {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        ImportedIconRef.current = (
          await import(
            `!!@svgr/webpack?-svgo,+titleProp,+ref!../../assets/svg/${name}.svg`
          )
        ).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);
  if (!loading && ImportedIconRef.current) {
    const ImportedIcon = ImportedIconRef.current;
    return (
      <ImportedIcon
        className="icon"
        style={{
          fill: fill ? fill : "var(--cat-wiki-zinnwaldite-brown)",
          width: width,
        }}
      />
    );
  }
  return null;
};

export default Icon;
