import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import ResultDetail from "./pages/ResultDetail";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/result" element={Result} />
      <Route path="/result/:detail" element={ResultDetail} />
    </Routes>
  );
}
export default AppRoutes;
