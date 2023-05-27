import { FC } from "react";
import Icon from "./icon";

import { IconProps } from "./icon";

const MagnifyingGlassIcon: FC<IconProps> = ({ ...IconProps }) => {
  return <Icon name="magnifying-glass" {...IconProps} />;
};

export default MagnifyingGlassIcon;
