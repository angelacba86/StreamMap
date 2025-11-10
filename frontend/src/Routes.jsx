import { Routes, Route } from "react-router-dom";
import { Home, Result, MoviesTV, ResultDetail } from "./pages";
import App from "./App";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result/:type/:id" element={<ResultDetail />} />
        <Route path="/:type/:category" element={<MoviesTV />} />
      </Route>
    </Routes>
  );
}
export default AppRoutes;
