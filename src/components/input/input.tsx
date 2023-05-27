import { FC, InputHTMLAttributes, ReactNode } from "react";
import "./input.scss";

type InputProps = {
  width?: string;
  height?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ width, height, icon, ...otherProps }) => {
  return (
    <div className="input-container">
      <input
        className="input"
        style={{ width: width, height: height }}
        {...otherProps}
      />
      {icon}
    </div>
  );
};

export default Input;
