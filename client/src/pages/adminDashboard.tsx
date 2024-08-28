import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Salon Admin Dashboard</h1>
       
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6">
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => navigate('/add-service')}
                  className="w-full text-left text-purple-600 font-semibold hover:text-purple-800"
                >
                  Add Service
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => navigate('/add-staff')}
                  className="w-full text-left text-purple-600 font-semibold hover:text-purple-800"
                >
                  Add Staff
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => navigate('/appointment-history')}
                  className="w-full text-left text-purple-600 font-semibold hover:text-purple-800"
                >
                  Appointment History
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => navigate('/transaction-history')}
                  className="w-full text-left text-purple-600 font-semibold hover:text-purple-800"
                >
                  Transaction History
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => navigate('/dashboard-reports')}
                  className="w-full text-left text-purple-600 font-semibold hover:text-purple-800"
                >
                  Reports
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-bold text-gray-700">Total Services</h2>
              <p className="text-2xl text-purple-600">10</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-bold text-gray-700">Total Staff</h2>
              <p className="text-2xl text-purple-600">5</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-bold text-gray-700">Upcoming Appointments</h2>
              <p className="text-2xl text-purple-600">8</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-bold text-gray-700">Completed Appointments</h2>
              <p className="text-2xl text-purple-600">25</p>
            </div>
          </div>

          {/* Total Transactions */}
          <div className="bg-white p-4 rounded-lg shadow-lg text-center mb-6">
            <h2 className="text-lg font-bold text-gray-700">Total Transactions</h2>
            <p className="text-2xl text-purple-600">$12,345.67</p>
            <button
              onClick={() => navigate('/transaction-history')}
              className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
            >
              View Transaction History
            </button>
          </div>

          {/* Recent Appointments */}
          <section>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Appointments</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-left">
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Service</th>
                    <th className="py-2 px-4">Staff</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">John Doe</td>
                    <td className="py-2 px-4">Haircut</td>
                    <td className="py-2 px-4">Jane Smith</td>
                    <td className="py-2 px-4">Aug 30, 2024</td>
                    <td className="py-2 px-4 text-green-500 font-semibold">Confirmed</td>
                  </tr>
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
