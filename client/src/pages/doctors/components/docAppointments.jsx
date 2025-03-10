import { useState } from "react";
import { ChevronDown, Clock, MapPin, Edit, Users } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function Bookings() {
  const [menuOpen, setMenuOpen] = useState(null);

  const bookings = [
    { day: "Wed", date: 28, time: "09:00 - 09:30", title: "30min call meeting Peer <> Leslie", avatars: ["https://media.istockphoto.com/id/1338021659/video/4k-video-footage-of-a-young-female-doctor-using-a-digital-tablet-at-work.jpg?s=640x640&k=20&c=kyKmvRHGncoghKP6_aHzFLJHR4Ju2HcHInlcs2jBR3Y=", "/static/images/avatar/2.jpg"] },
    { day: "Fri", date: 30, time: "15:20 - 16:20", title: "Livn Product Demo", avatars: ["/static/images/avatar/3.jpg", "/static/images/avatar/4.jpg"] },
    { day: "Thu", date: 29, time: "11:15 - 11:45", title: "30min call meeting Olivia, Liam <> Alban", avatars: ["/static/images/avatar/5.jpg", "/static/images/avatar/6.jpg"] },
    { day: "Mon", date: 2, time: "11:15 - 11:45", title: "30min call meeting Yulia, Alvin <> Irina, Mae", avatars: ["/static/images/avatar/7.jpg", "/static/images/avatar/8.jpg"] },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Bookings</h1>
        <p className="text-gray-600 mb-8">See your scheduled events from your calendar events links.</p>
        
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div key={index} className="p-6 flex flex-col md:flex-row justify-between items-center border border-gray-200 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300 w-full hover:cursor-pointer">
              <div className="flex items-center space-x-6 w-full">
                <div className="text-center text-red-500 font-bold text-lg">
                  <p className="text-sm uppercase">{booking.day}</p>
                  <p className="text-3xl">{booking.date}</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" /> {booking.time}
                  </p>
                  <p className="font-semibold text-xl text-gray-900 mt-1">{booking.title}</p>
                  
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mt-6 md:mt-0">
                <AvatarGroup spacing={24} max={2}>
                  {booking.avatars.map((avatar, i) => (
                    <Avatar key={i} alt={`Avatar ${i + 1}`} src={avatar} />
                  ))}
                </AvatarGroup>
                
                <div className="relative">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 flex items-center space-x-2 text-gray-700 transition-colors duration-200"
                    onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                  >
                    <Edit className="w-5 h-5" />
                    <span className="font-medium">Edit</span>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}