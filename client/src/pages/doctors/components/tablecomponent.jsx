const TableComponent = () => {
  return (
    <section className="container px-4 mx-auto">
      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden md:flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Sn', 'Name', 'Phone', 'Priority', 'Appointment Date', 'Medical Record'].map((heading, index) => (
                      <th
                        key={index}
                        className="px-3 py-3 text-xs font-medium text-left text-gray-500 sm:px-4 sm:text-sm"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3].map((sn) => (
                    <tr key={sn}>
                      <td className="px-3 py-3 text-sm font-medium text-gray-700 sm:px-4 sm:py-4">
                        {sn}
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        <div className="flex items-center gap-x-2">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80"
                            alt="Arthur Melo"
                          />
                          <div>
                            <h2 className="text-xs font-medium text-gray-800 sm:text-sm">Arthur Melo</h2>
                            <p className="text-xs text-gray-600">authurmelo@example.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        +977 9803692900
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-gray-700 sm:px-4 sm:py-4">
                        <span className="px-2 py-1 text-xs rounded-full text-emerald-500 bg-emerald-100/60 sm:text-sm">
                          Low
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-gray-500 sm:px-4 sm:py-4">
                        12th July 2025
                      </td>
                      <td className="px-3 py-3 text-sm sm:px-4 sm:py-4">
                        <div className="flex items-center gap-x-4">
                          <button className="text-gray-500 hover:text-indigo-500">View</button>
                          <button className="text-blue-500 hover:text-indigo-500">Download</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards (shown on mobile) */}
      <div className="md:hidden space-y-4">
        {[1, 2, 3].map((sn) => (
          <div key={sn} className="p-4 bg-white rounded-lg shadow border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-x-3">
                <span className="text-sm font-medium text-gray-700">{sn}</span>
                <span className="px-2 py-1 text-xs rounded-full text-emerald-500 bg-emerald-100/60">
                  Low
                </span>
              </div>
              <div className="text-sm text-gray-500">12th July 2025</div>
            </div>
            
            <div className="mt-3 flex items-center gap-x-3">
              <img
                className="w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80"
                alt="Arthur Melo"
              />
              <div>
                <h2 className="text-sm font-medium text-gray-800">Arthur Melo</h2>
                <p className="text-xs text-gray-600">authurmelo@example.com</p>
                <p className="text-xs text-gray-600 mt-1">+977 9803692900</p>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="text-sm text-gray-500">Medical Record:</div>
              <div className="flex gap-x-3">
                <button className="text-sm text-gray-500 hover:text-indigo-500">View</button>
                <button className="text-sm text-blue-500 hover:text-indigo-500">Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TableComponent;