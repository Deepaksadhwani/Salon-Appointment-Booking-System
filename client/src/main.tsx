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
import ServiceListPage from "./pages/ServiceList.tsx";
import Service from "./pages/Service.tsx";
import AddSalonService from "./pages/AddSalonService.tsx";
import SalonStaff from "./pages/StaffMembers.tsx";
import AdminDashboard from "./pages/adminDashboard.tsx";
import AddSalonStaff from "./pages/AddSalonStaff.tsx";
import BookAppointment from "./pages/BookAppointment.tsx";
;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={appStore}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route index element={<ServiceListPage />} />
          <Route path="/services/:serviceId" element={<Service />} />
          <Route path="/add-services" element={<AddSalonService />} />
          <Route path="/staff-members" element={<SalonStaff />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-staff" element={<AddSalonStaff/>} />
          <Route path="/book-appointment" element={<BookAppointment/>} />
          
        </Route>
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
    ,
  </Provider>,
);
