import { FC } from "react";
import "./loading-spinner.scss";

type SpinnerProps = {
  text: string;
};

const Spinner: FC<SpinnerProps> = ({ text }) => {
  return (
    <div className="loader-container">
      <span className="loader" />
      <span>{text}</span>
    </div>
  );
};

export default Spinner;
