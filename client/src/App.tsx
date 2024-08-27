import { Button } from "./components/ui/button";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import { RootState } from "./store/appStore";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./layouts/Navbar";

const App = () => {
  const token = useSelector((store: RootState) => store.user.token);

  return !token ? (
    <Navigate to="/Authentication" />
  ) : (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default App;
