import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home";
import Header from "./routes/header/header";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
