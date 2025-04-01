// import { useState } from "react";
// import { ChevronDown, Clock, MapPin, Users, MoreVertical } from "lucide-react";
// import Avatar from "@mui/material/Avatar";
// import AvatarGroup from "@mui/material/AvatarGroup";

// export default function Bookings() {
//   const [menuOpen, setMenuOpen] = useState(null);

//   const bookings = [
//     { 
//       day: "Wed", 
//       date: 28, 
//       time: "09:00 - 09:30", 
//       title: "30min call meeting Peer <> Leslie", 
//       avatars: [
//         "https://media.istockphoto.com/id/1338021659/video/4k-video-footage-of-a-young-female-doctor-using-a-digital-tablet-at-work.jpg?s=640x640&k=20&c=kyKmvRHGncoghKP6_aHzFLJHR4Ju2HcHInlcs2jBR3Y=", 
//         "/static/images/avatar/2.jpg"
//       ],
//       location: "Conference Room A",
//       participants: 4
//     },
//     { 
//       day: "Fri", 
//       date: 30, 
//       time: "15:20 - 16:20", 
//       title: "Livn Product Demo", 
//       avatars: [
//         "/static/images/avatar/3.jpg", 
//         "/static/images/avatar/4.jpg"
//       ],
//       location: "Virtual Meeting",
//       participants: 6
//     },
//     { 
//       day: "Thu", 
//       date: 29, 
//       time: "11:15 - 11:45", 
//       title: "30min call meeting Olivia, Liam <> Alban", 
//       avatars: [
//         "/static/images/avatar/5.jpg", 
//         "/static/images/avatar/6.jpg"
//       ],
//       location: "Zoom Meeting",
//       participants: 3
//     },
//     { 
//       day: "Mon", 
//       date: 2, 
//       time: "11:15 - 11:45", 
//       title: "30min call meeting Yulia, Alvin <> Irina, Mae", 
//       avatars: [
//         "/static/images/avatar/7.jpg", 
//         "/static/images/avatar/8.jpg"
//       ],
//       location: "Board Room 2",
//       participants: 5
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
//       <div className="w-full max-w-7xl mx-auto"> {/* Increased max-width */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
//           <div>
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Bookings</h1>
//             <p className="text-sm sm:text-base text-gray-600">
//               See your scheduled events from your calendar events links.
//             </p>
//           </div>
//           <div className="mt-4 lg:mt-0 flex space-x-3">
//             <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
//               Filter
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
//               New Booking
//             </button>
//           </div>
//         </div>
        
//         {/* Table-like headers for large screens */}
//         <div className="hidden lg:grid grid-cols-12 gap-4 mb-3 px-6">
//           <div className="col-span-2 text-sm font-medium text-gray-500">DATE & TIME</div>
//           <div className="col-span-4 text-sm font-medium text-gray-500">MEETING DETAILS</div>
//           <div className="col-span-3 text-sm font-medium text-gray-500">LOCATION</div>
//           <div className="col-span-2 text-sm font-medium text-gray-500">PARTICIPANTS</div>
//           <div className="col-span-1 text-sm font-medium text-gray-500">ACTIONS</div>
//         </div>
        
//         <div className="space-y-4 lg:space-y-2">
//           {bookings.map((booking, index) => (
//             <div 
//               key={index} 
//               className="p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 justify-between border border-gray-200 rounded-xl lg:rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300 w-full"
//             >
//               {/* Mobile: Date/Time */}
//               <div className="lg:hidden flex items-start justify-between w-full mb-3">
//                 <div className="flex items-center">
//                   <div className="text-center text-red-500 font-bold mr-4">
//                     <p className="text-xs sm:text-sm uppercase">{booking.day}</p>
//                     <p className="text-2xl sm:text-3xl">{booking.date}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm sm:text-base text-gray-700 flex items-center gap-2">
//                       <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> 
//                       {booking.time}
//                     </p>
//                   </div>
//                 </div>
//                 <button 
//                   className="lg:hidden p-1 rounded-full hover:bg-gray-100"
//                   onClick={() => setMenuOpen(menuOpen === index ? null : index)}
//                 >
//                   <MoreVertical className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
              
//               {/* Desktop: Date/Time */}
//               <div className="hidden lg:flex lg:col-span-2 items-center">
//                 <div className="text-center text-red-500 font-bold mr-4 min-w-[60px]">
//                   <p className="text-sm uppercase">{booking.day}</p>
//                   <p className="text-2xl">{booking.date}</p>
//                 </div>
//                 <div className="text-gray-700 flex items-center gap-2">
//                   <Clock className="w-4 h-4 text-gray-500" /> 
//                   <span className="text-sm">{booking.time}</span>
//                 </div>
//               </div>
              
//               {/* Meeting Details */}
//               <div className="lg:col-span-4">
//                 <p className="font-semibold text-lg sm:text-xl lg:text-base text-gray-900 mb-1 lg:mb-0">
//                   {booking.title}
//                 </p>
//                 <p className="lg:hidden text-sm text-gray-600 mt-1 flex items-center">
//                   <MapPin className="w-4 h-4 mr-1" /> {booking.location}
//                 </p>
//               </div>
              
//               {/* Location - Desktop */}
//               <div className="hidden lg:flex lg:col-span-3 items-center">
//                 <p className="text-sm text-gray-600 flex items-center">
//                   <MapPin className="w-4 h-4 mr-2" /> {booking.location}
//                 </p>
//               </div>
              
//               {/* Participants */}
//               <div className="hidden lg:flex lg:col-span-2 items-center">
//                 <div className="flex items-center">
//                   <AvatarGroup spacing={24} max={4}>
//                     {booking.avatars.map((avatar, i) => (
//                       <Avatar 
//                         key={i} 
//                         alt={`Avatar ${i + 1}`} 
//                         src={avatar} 
//                         sx={{ width: 32, height: 32 }}
//                       />
//                     ))}
//                   </AvatarGroup>
//                   <span className="text-sm text-gray-600 ml-2">
//                     {booking.participants} people
//                   </span>
//                 </div>
//               </div>
              
//               {/* Mobile Avatars */}
//               <div className="lg:hidden flex items-center justify-between mt-3">
//                 <AvatarGroup spacing={24} max={2}>
//                   {booking.avatars.map((avatar, i) => (
//                     <Avatar 
//                       key={i} 
//                       alt={`Avatar ${i + 1}`} 
//                       src={avatar} 
//                       sx={{ 
//                         width: 32, 
//                         height: 32,
//                         '@media (min-width: 640px)': {
//                           width: 40,
//                           height: 40
//                         }
//                       }}
//                     />
//                   ))}
//                 </AvatarGroup>
//               </div>
              
//               {/* Desktop Actions */}
//               <div className="hidden lg:flex lg:col-span-1 items-center justify-end">
//                 <div className="relative">
//                   <button
//                     className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
//                     onClick={() => setMenuOpen(menuOpen === index ? null : index)}
//                   >
//                     <MoreVertical className="w-5 h-5" />
//                   </button>
                  
//                   {menuOpen === index && (
//                     <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 z-50">
//                       <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
//                         <Clock className="w-4 h-4 mr-2" /> Reschedule booking
//                       </button>
//                       <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
//                         <ChevronDown className="w-4 h-4 mr-2" /> Request reschedule
//                       </button>
//                       <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
//                         <MapPin className="w-4 h-4 mr-2" /> Edit location
//                       </button>
//                       <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
//                         <Users className="w-4 h-4 mr-2" /> Invite people
//                       </button>
//                       <button className="w-full flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors duration-200">
//                         Cancel event
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               {/* Mobile menu dropdown */}
//               {menuOpen === index && (
//                 <div className="lg:hidden mt-3 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
//                   <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
//                     <Clock className="w-4 h-4 mr-2" /> Reschedule
//                   </button>
//                   <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
//                     <ChevronDown className="w-4 h-4 mr-2" /> Request reschedule
//                   </button>
//                   <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
//                     <MapPin className="w-4 h-4 mr-2" /> Edit location
//                   </button>
//                   <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
//                     <Users className="w-4 h-4 mr-2" /> Invite people
//                   </button>
//                   <button className="w-full flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-100 transition-colors duration-200">
//                     Cancel event
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



















import { useState } from "react";
import { ChevronDown, Clock, MapPin, Users, MoreVertical } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function Bookings() {
  const [menuOpen, setMenuOpen] = useState(null);

  const bookings = [
    { 
      day: "Wed", 
      date: 28, 
      time: "09:00 - 09:30", 
      title: "30min call meeting Peer <> Leslie", 
      avatars: [
        "https://media.istockphoto.com/id/1338021659/video/4k-video-footage-of-a-young-female-doctor-using-a-digital-tablet-at-work.jpg?s=640x640&k=20&c=kyKmvRHGncoghKP6_aHzFLJHR4Ju2HcHInlcs2jBR3Y=", 
        "/static/images/avatar/2.jpg"
      ],
      location: "Conference Room A",
      participants: 4
    },
    { 
      day: "Fri", 
      date: 30, 
      time: "15:20 - 16:20", 
      title: "Livn Product Demo", 
      avatars: [
        "/static/images/avatar/3.jpg", 
        "/static/images/avatar/4.jpg"
      ],
      location: "Virtual Meeting",
      participants: 6
    },
    { 
      day: "Thu", 
      date: 29, 
      time: "11:15 - 11:45", 
      title: "30min call meeting Olivia, Liam <> Alban", 
      avatars: [
        "/static/images/avatar/5.jpg", 
        "/static/images/avatar/6.jpg"
      ],
      location: "Zoom Meeting",
      participants: 3
    },
    { 
      day: "Mon", 
      date: 2, 
      time: "11:15 - 11:45", 
      title: "30min call meeting Yulia, Alvin <> Irina, Mae", 
      avatars: [
        "/static/images/avatar/7.jpg", 
        "/static/images/avatar/8.jpg"
      ],
      location: "Board Room 2",
      participants: 5
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="w-full max-w-7xl mx-auto"> {/* Increased max-width */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Bookings</h1>
            <p className="text-sm sm:text-base text-gray-600">
              See your scheduled events from your calendar events links.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex space-x-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              New Booking
            </button>
          </div>
        </div>
        
        {/* Table-like headers for large screens */}
        <div className="hidden lg:grid grid-cols-12 gap-4 mb-3 px-6">
          <div className="col-span-2 text-sm font-medium text-gray-500">DATE & TIME</div>
          <div className="col-span-4 text-sm font-medium text-gray-500">MEETING DETAILS</div>
          <div className="col-span-3 text-sm font-medium text-gray-500">LOCATION</div>
          <div className="col-span-2 text-sm font-medium text-gray-500">PARTICIPANTS</div>
          <div className="col-span-1 text-sm font-medium text-gray-500">ACTIONS</div>
        </div>
        
        <div className="space-y-4 lg:space-y-2">
          {bookings.map((booking, index) => (
            <div 
              key={index} 
              className="p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 justify-between border border-gray-200 rounded-xl lg:rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300 w-full"
            >
              {/* Mobile: Date/Time */}
              <div className="lg:hidden flex items-start justify-between w-full mb-3">
                <div className="flex items-center">
                  <div className="text-center text-red-500 font-bold mr-4">
                    <p className="text-xs sm:text-sm uppercase">{booking.day}</p>
                    <p className="text-2xl sm:text-3xl">{booking.date}</p>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" /> 
                      {booking.time}
                    </p>
                  </div>
                </div>
                <button 
                  className="lg:hidden p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Desktop: Date/Time */}
              <div className="hidden lg:flex lg:col-span-2 items-center">
                <div className="text-center text-red-500 font-bold mr-4 min-w-[60px]">
                  <p className="text-sm uppercase">{booking.day}</p>
                  <p className="text-2xl">{booking.date}</p>
                </div>
                <div className="text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" /> 
                  <span className="text-sm">{booking.time}</span>
                </div>
              </div>
              
              {/* Meeting Details */}
              <div className="lg:col-span-4">
                <p className="font-semibold text-lg sm:text-xl lg:text-base text-gray-900 mb-1 lg:mb-0">
                  {booking.title}
                </p>
                <p className="lg:hidden text-sm text-gray-600 mt-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" /> {booking.location}
                </p>
              </div>
              
              {/* Location - Desktop */}
              <div className="hidden lg:flex lg:col-span-3 items-center">
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> {booking.location}
                </p>
              </div>
              
              {/* Participants */}
              <div className="hidden lg:flex lg:col-span-2 items-center">
                <div className="flex items-center">
                  <AvatarGroup spacing={24} max={4}>
                    {booking.avatars.map((avatar, i) => (
                      <Avatar 
                        key={i} 
                        alt={`Avatar ${i + 1}`} 
                        src={avatar} 
                        sx={{ width: 32, height: 32 }}
                      />
                    ))}
                  </AvatarGroup>
                  <span className="text-sm text-gray-600 ml-2">
                    {booking.participants} people
                  </span>
                </div>
              </div>
              
              {/* Mobile Avatars */}
              <div className="lg:hidden flex items-center justify-between mt-3">
                <AvatarGroup spacing={24} max={2}>
                  {booking.avatars.map((avatar, i) => (
                    <Avatar 
                      key={i} 
                      alt={`Avatar ${i + 1}`} 
                      src={avatar} 
                      sx={{ 
                        width: 32, 
                        height: 32,
                        '@media (min-width: 640px)': {
                          width: 40,
                          height: 40
                        }
                      }}
                    />
                  ))}
                </AvatarGroup>
              </div>
              
              {/* Desktop Actions */}
              <div className="hidden lg:flex lg:col-span-1 items-center justify-end">
                <div className="relative">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                    onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  {menuOpen === index && (
                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 z-50">
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <Clock className="w-4 h-4 mr-2" /> Reschedule booking
                      </button>
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <ChevronDown className="w-4 h-4 mr-2" /> Request reschedule
                      </button>
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <MapPin className="w-4 h-4 mr-2" /> Edit location
                      </button>
                      <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        <Users className="w-4 h-4 mr-2" /> Invite people
                      </button>
                      <button className="w-full flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors duration-200">
                        Cancel event
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Mobile menu dropdown */}
              {menuOpen === index && (
                <div className="lg:hidden mt-3 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <Clock className="w-4 h-4 mr-2" /> Reschedule
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <ChevronDown className="w-4 h-4 mr-2" /> Request reschedule
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <MapPin className="w-4 h-4 mr-2" /> Edit location
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                    <Users className="w-4 h-4 mr-2" /> Invite people
                  </button>
                  <button className="w-full flex items-center px-4 py-3 text-sm text-red-500 hover:bg-red-100 transition-colors duration-200">
                    Cancel event
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}