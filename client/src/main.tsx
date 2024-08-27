import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication.tsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import appStore from "./store/appStore.ts";
import Home from "./pages/Home.tsx";
import UserProfile from "./pages/UserProfile.tsx";
;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          
        </Route>
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
    ,
  </Provider>,
);
