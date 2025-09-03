import { Routes, Route } from "react-router-dom";
import { Home, Result, ResultDetail } from "./pages";
import App from "./App";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result/:detail" element={<ResultDetail />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
