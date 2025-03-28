import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Placeholder data for the heart rate chart
const heartRateData = [
  { month: 'Jul', bpm: 60 },
  { month: 'Aug', bpm: 55 },
  { month: 'Sep', bpm: 80 },
  { month: 'Oct', bpm: 50 },
  { month: 'Nov', bpm: 75 },
  { month: 'Dec', bpm: 65 },
];

// Placeholder data for the blood pressure chart
const bloodPressureData = [
  { month: 'Jul', systolic: 120, diastolic: 80 },
  { month: 'Aug', systolic: 118, diastolic: 78 },
  { month: 'Sep', systolic: 130, diastolic: 85 },
  { month: 'Oct', systolic: 115, diastolic: 75 },
  { month: 'Nov', systolic: 125, diastolic: 82 },
  { month: 'Dec', systolic: 122, diastolic: 79 },
];

// Placeholder data for recent appointments
const recentAppointments = [
  { date: 'Mar 15, 2025', type: 'Cardiology Checkup', doctor: 'Dr. Emily Smith' },
  { date: 'Feb 10, 2025', type: 'General Consultation', doctor: 'Dr. John Doe' },
  { date: 'Jan 20, 2025', type: 'Pulmonary Follow-up', doctor: 'Dr. Sarah Lee' },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen text-gray-900 font-sans">
      {/* Header */}
     
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        

        {/* Main Content */}
        <main className="flex-1 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Patient Info */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center space-x-4">
              <img
                  src="https://www.racefans.net/wp-content/uploads/2024/07/racefansdotnet-7448390_HiRes.jpg"
                  alt="Ethan Miller"
                  className="rounded-full w-16 h-16 object-cover sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-16 lg:h-16"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Ethan Miller</h2>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600">Schedule visit</button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">General info</h3>
                <p className="text-gray-700">#9834A-43</p>
                <p className="text-gray-700">DOB: 15.05.1969</p>
                <p className="text-gray-700">Age: 55 y.o.</p>
                <p className="text-gray-700">Gender: Male</p>
                <p className="text-gray-700">32 Clark St, Brooklyn, NY 11201, USA</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact information</h3>
                <p className="text-gray-700">Email: ethan.miller@gmail.com</p>
                <p className="text-gray-700">Phone: 555-723-4567</p>
                <p className="text-gray-700">Teleg: @ethan_miller</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Metformin</span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Aspirin</span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Strawberry</span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Grapes</span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Latex</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Active conditions</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Allergic asthma</span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Heart failure</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Previous surgeries</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Coronary artery bypass graft</span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg">Knee replacement</span>
                </div>
                <button className="text-blue-500 mt-2 hover:text-blue-600">View all</button>
              </div>
            </div>

            {/* Heart Rate, Diagnoses, and New Appointments Tab */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">Heart rate</h3>
                <div className="flex space-x-4 mt-2">
                  <div>
                    <p className="text-gray-900">54-123 BPM</p>
                    <p className="text-gray-500">Heart range</p>
                  </div>
                  <div>
                    <p className="text-gray-900">55-51 BPM</p>
                    <p className="text-gray-500">Resting rate</p>
                  </div>
                  <div>
                    <p className="text-gray-900">79-110 BPM</p>
                    <p className="text-gray-500">Walking average</p>
                  </div>
                </div>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={heartRateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Line type="monotone" dataKey="bpm" stroke="#ef4444" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">Recent diagnosis</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-900">Heart failure</span>
                    <span className="text-gray-500">1 month ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-900">Pneumonia</span>
                    <span className="text-gray-500">6 months ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-900">GERD</span>
                    <span className="text-gray-500">1 year ago</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-900">Pulmonary fibrosis</span>
                    <span className="text-gray-500">1.5 years ago</span>
                  </li>
                </ul>
                <button className="text-blue-500 mt-2 hover:text-blue-600">View all</button>
              </div>

              {/* Folders */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-gray-900">Medical prescriptions</p>
                  <button className="text-blue-500 mt-2 hover:text-blue-600">View all</button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-gray-900">Electronic records</p>
                  <button className="text-blue-500 mt-2 hover:text-blue-600">View all</button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-gray-900">Diagnosis</p>
                  <button className="text-blue-500 mt-2 hover:text-blue-600">View all</button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-gray-900">Insurance</p>
                  <button className="text-blue-500 mt-2 hover:text-blue-600">View all</button>
                </div>
              </div>

              {/* Blood Pressure Chart */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">Blood Pressure</h3>
                <div className="flex space-x-4 mt-2">
                  <div>
                    <p className="text-gray-900">115-130 mmHg</p>
                    <p className="text-gray-500">Systolic range</p>
                  </div>
                  <div>
                    <p className="text-gray-900">75-85 mmHg</p>
                    <p className="text-gray-500">Diastolic range</p>
                  </div>
                </div>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={bloodPressureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Line type="monotone" dataKey="systolic" stroke="#3b82f6" name="Systolic" />
                      <Line type="monotone" dataKey="diastolic" stroke="#10b981" name="Diastolic" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Appointments Tab */}
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
                <ul className="mt-2 space-y-2">
                  {recentAppointments.map((appointment, index) => (
                    <li key={index} className="flex justify-between">
                      <div>
                        <p className="text-gray-900">{appointment.type}</p>
                        <p className="text-gray-500 text-sm">{appointment.doctor}</p>
                      </div>
                      <span className="text-gray-500">{appointment.date}</span>
                    </li>
                  ))}
                </ul>
                <button className="text-blue-500 mt-2 hover:text-blue-600">View more</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;