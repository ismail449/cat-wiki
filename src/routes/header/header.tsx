import { Outlet } from "react-router-dom";
import "./header.scss";
import CatIcon from "../../components/icons/cat-icon";

const Header = () => {
  return (
    <div className="header">
      <CatIcon />
      <Outlet />
    </div>
  );
};

export default Header;
