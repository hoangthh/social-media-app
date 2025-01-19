import { useDispatch } from "react-redux";
import * as actions from "./redux/actions";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Login/Login";
import PrivateRoutes from "./routes/privateRoutes/PrivateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
