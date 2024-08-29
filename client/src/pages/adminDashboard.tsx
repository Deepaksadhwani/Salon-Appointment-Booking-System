import { HEADERDATA, SERVER_URL } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [totalservice, setTotalService] = useState<number>(0);

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${SERVER_URL}/appointment/appointmentdata`,
          HEADERDATA,
        );
        setAppointments(data.data);
        setTotalService(data.totalServices);
        setTotalStaff(data.totalStaffs);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };
    getAllAppointments();
  }, []);
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-purple-600 p-4 text-white">
        <h1 className="text-2xl font-bold">Salon Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-6 shadow-md">
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => navigate("/add-services")}
                  className="w-full text-left font-semibold text-purple-600 hover:text-purple-800"
                >
                  Add Service
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => navigate("/add-staff")}
                  className="w-full text-left font-semibold text-purple-600 hover:text-purple-800"
                >
                  Add Staff
                </button>
              </li>
             
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Overview Stats */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-4 text-center shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">
                Total Services
              </h2>
              <p className="text-2xl text-purple-600">{totalservice}</p>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">Total Staff</h2>
              <p className="text-2xl text-purple-600">{totalStaff}</p>
            </div>
           
            <div className="rounded-lg bg-white p-4 text-center shadow-lg">
              <h2 className="text-lg font-bold text-gray-700">
                total Appointments
              </h2>
              <p className="text-2xl text-purple-600">{appointments.length}</p>
            </div>
          </div>

          {/* Total Transactions */}
          <div className="mb-6 rounded-lg bg-white p-4 text-center shadow-lg">
            <h2 className="text-lg font-bold text-gray-700">
              Total Transactions
            </h2>
            <p className="text-2xl text-purple-600">${appointments.length * 500}</p>
          
          </div>

          {/* Recent Appointments */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-700">
              Recent Appointments
            </h2>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600">
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2">Service</th>
                    <th className="px-4 py-2">Staff</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments &&
                    appointments.map((appointment: any) => (
                      <tr key={appointment.id}>
                        <td className="px-4 py-2">
                          {appointment.user.fullName}
                        </td>
                        <td className="px-4 py-2">
                          {appointment.service.name}
                        </td>
                        <td className="px-4 py-2">
                          {appointment.staff.fullName}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(appointment.dateTime).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 font-semibold text-green-500">
                          {appointment.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
