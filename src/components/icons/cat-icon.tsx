import { FC } from "react";
import Icon from "./icon";

import { IconProps } from "./icon";

const CatIcon: FC<IconProps> = ({ ...IconProps }) => {
  return <Icon name="CatwikiLogo" {...IconProps} />;
};

export default CatIcon;
