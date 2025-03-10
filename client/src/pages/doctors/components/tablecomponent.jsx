
const tablecomponent = () => {
  return (
    <>
      <section className="container px-4 mx-auto">
  <div className="flex flex-col">
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50 ">
              <tr>
              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                  Sn
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                  Name
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                  Phone
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                  Priority
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                  Appointment Date
                </th>
                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                  Medical Record
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200  ">
              <tr>
              <td className="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap">
                  <div className="inline-flex items-center gap-x-3">
                    <span>1</span>
                  </div>
                </td>
              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                  <div className="flex items-center gap-x-2">
                    <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt />
                    <div>
                      <h2 className="text-sm font-medium text-gray-800  ">Arthur Melo</h2>
                      <p className="text-xs font-normal text-gray-600 ">authurmelo@example.com</p>
                    </div>
                  </div>
                </td>
                
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">+977 9803692900</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                    <h2 className="text-sm font-normal">Low</h2>
                  </div>
                </td>
                
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">12th July 2025</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    <button className="text-gray-500 transition-colors duration-200   hover:text-indigo-500 focus:outline-none">
                      View
                    </button>
                    <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                      Download
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
              <td className="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap">
                  <div className="inline-flex items-center gap-x-3">
                    <span>2</span>
                  </div>
                </td>
              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                  <div className="flex items-center gap-x-2">
                    <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt />
                    <div>
                      <h2 className="text-sm font-medium text-gray-800  ">Arthur Melo</h2>
                      <p className="text-xs font-normal text-gray-600 ">authurmelo@example.com</p>
                    </div>
                  </div>
                </td>
                
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">+977 9803692900</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                    <h2 className="text-sm font-normal">Low</h2>
                  </div>
                </td>
                
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">12th July 2025</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    <button className="text-gray-500 transition-colors duration-200   hover:text-indigo-500 focus:outline-none">
                      View
                    </button>
                    <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                      Download
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
              <td className="px-4 py-4 text-sm font-medium text-gray-700  whitespace-nowrap">
                  <div className="inline-flex items-center gap-x-3">
                    <span>3</span>
                  </div>
                </td>
              <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                  <div className="flex items-center gap-x-2">
                    <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt />
                    <div>
                      <h2 className="text-sm font-medium text-gray-800  ">Arthur Melo</h2>
                      <p className="text-xs font-normal text-gray-600 ">authurmelo@example.com</p>
                    </div>
                  </div>
                </td>
                
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">+977 9803692900</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                    <h2 className="text-sm font-normal">Low</h2>
                  </div>
                </td>
                
                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">12th July 2025</td>
                <td className="px-4 py-4 text-sm whitespace-nowrap">
                  <div className="flex items-center gap-x-6">
                    <button className="text-gray-500 transition-colors duration-200   hover:text-indigo-500 focus:outline-none">
                      View
                    </button>
                    <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
 
</section>

    </>
  )
}

export default tablecomponent
