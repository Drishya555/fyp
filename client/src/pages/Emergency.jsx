import { useState, useEffect } from 'react';
import { Phone, Ambulance, Heart, Shield, AlertTriangle, Clock, MapPin, Zap, Activity, Plus } from 'lucide-react';

const EmergencyPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const emergencyNumbers = [
    { name: 'Emergency Ambulance', number: '102', type: 'ambulance', priority: 'critical', description: 'Life-threatening emergencies' },
    { name: 'Fire Department', number: '101', type: 'fire', priority: 'critical', description: 'Fire & rescue services' },
    { name: 'Police Emergency', number: '100', type: 'police', priority: 'critical', description: 'Crime & safety emergencies' },
    { name: 'Poison Control', number: '000', type: 'poison', priority: 'urgent', description: '24/7 poison assistance' },
    { name: 'Mental Health Crisis', number: '988', type: 'mental', priority: 'urgent', description: 'Crisis support & counseling' },
    { name: 'Hospital Direct', number: '(977) 123-4567', type: 'hospital', priority: 'standard', description: 'Non-emergency medical' }
  ];

  const ambulanceServices = [
    { 
      name: 'Hams Emergency Services', 
      number: '911', 
      location: 'Dhumbarahi', 
      eta: '4-6 min', 
      available: true,
      distance: '2.1 km',
      crew: 'Paramedic Level'
    },
    { 
      name: 'Mediciti Ambulance', 
      number: '(555) 999-0001', 
      location: 'Mediciti Hospital', 
      eta: '8-12 min', 
      available: true,
      distance: '5.7 km',
      crew: 'EMT Advanced'
    },
    { 
      name: 'Regional Medical Transport', 
      number: '(555) 999-0002', 
      location: 'South Side Clinic', 
      eta: '6-9 min', 
      available: false,
      distance: '3.8 km',
      crew: 'Paramedic Level'
    },
    { 
      name: 'Private Medical Services', 
      number: '(555) 999-0003', 
      location: 'West End Center', 
      eta: '10-15 min', 
      available: true,
      distance: '8.2 km',
      crew: 'EMT Basic'
    }
  ];

  const firstAidBlogs = [
    {
      id: 1,
      title: 'CPR & AED: Complete Life-Saving Guide',
      excerpt: 'Master chest compressions, rescue breathing, and automated defibrillator use with step-by-step instructions and video demonstrations.',
      readTime: '8 min read',
      category: 'Cardiac Emergency',
      urgent: true,
      difficulty: 'Essential',
      updated: '2 days ago'
    },
    {
      id: 2,
      title: 'Choking Emergency: All Age Groups',
      excerpt: 'From infants to adults - comprehensive choking response including back blows, abdominal thrusts, and when to call for help.',
      readTime: '5 min read',
      category: 'Airway Emergency',
      urgent: true,
      difficulty: 'Essential',
      updated: '1 week ago'
    },
    {
      id: 3,
      title: 'Severe Bleeding & Trauma Control',
      excerpt: 'Advanced wound care, pressure point techniques, and shock prevention while waiting for emergency responders.',
      readTime: '7 min read',
      category: 'Trauma Care',
      urgent: true,
      difficulty: 'Intermediate',
      updated: '3 days ago'
    },
    {
      id: 4,
      title: 'Stroke Recognition: F.A.S.T. Protocol',
      excerpt: 'Critical time-sensitive identification of stroke symptoms using the Face, Arms, Speech, Time assessment method.',
      readTime: '6 min read',
      category: 'Neurological',
      urgent: false,
      difficulty: 'Essential',
      updated: '5 days ago'
    },
    {
      id: 5,
      title: 'Burns: Classification & Treatment',
      excerpt: 'Immediate care for thermal, chemical, and electrical burns with proper cooling techniques and when to seek emergency care.',
      readTime: '6 min read',
      category: 'Injury Care',
      urgent: false,
      difficulty: 'Intermediate',
      updated: '1 week ago'
    },
    {
      id: 6,
      title: 'Anaphylaxis & EpiPen Administration',
      excerpt: 'Life-threatening allergic reaction management including proper epinephrine injection technique and follow-up care.',
      readTime: '5 min read',
      category: 'Allergic Emergency',
      urgent: false,
      difficulty: 'Essential',
      updated: '4 days ago'
    }
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'critical': return {
        bg: 'bg-gradient-to-br from-red-500 via-red-600 to-red-700',
        hover: 'hover:from-red-600 hover:via-red-700 hover:to-red-800',
        glow: 'shadow-red-500/25',
        pulse: 'animate-pulse'
      };
      case 'urgent': return {
        bg: 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700',
        hover: 'hover:from-orange-600 hover:via-orange-700 hover:to-orange-800',
        glow: 'shadow-orange-500/25',
        pulse: ''
      };
      default: return {
        bg: 'bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700',
        hover: 'hover:from-blue-600 hover:via-blue-700 hover:to-blue-800',
        glow: 'shadow-blue-500/25',
        pulse: ''
      };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'ambulance': return <Ambulance className="w-6 h-6" />;
      case 'fire': return <Zap className="w-6 h-6" />;
      case 'police': return <Shield className="w-6 h-6" />;
      case 'poison': return <AlertTriangle className="w-6 h-6" />;
      case 'mental': return <Heart className="w-6 h-6" />;
      case 'hospital': return <Plus className="w-6 h-6" />;
      default: return <Phone className="w-6 h-6" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Essential': return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-4 rounded-full shadow-2xl">
                  <Activity className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Emergency Center
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Immediate access to life-saving services and critical medical information
            </p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <Clock className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Critical Emergency Numbers */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Phone className="w-8 h-8 mr-3 text-red-500" />
                Emergency Hotlines
              </h2>
              <div className="hidden md:flex items-center text-sm text-gray-500">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                Tap to call instantly
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyNumbers.map((emergency, index) => {
                const styles = getPriorityStyles(emergency.priority);
                return (
                  <button
                    key={index}
                    onClick={() => handleCall(emergency.number)}
                    className={`group relative ${styles.bg} ${styles.hover} ${styles.pulse} text-white p-6 rounded-2xl shadow-2xl ${styles.glow} transition-all duration-300 transform hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-sm`}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                          {getTypeIcon(emergency.type)}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                          {emergency.priority}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl mb-2">{emergency.name}</h3>
                      <p className="text-white/80 text-sm mb-3">{emergency.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black tracking-wider">{emergency.number}</span>
                        <Phone className="w-5 h-5 group-hover:animate-bounce" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enhanced Ambulance Services */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Ambulance className="w-8 h-8 mr-3 text-red-500" />
              Ambulance Services
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ambulanceServices.map((service, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:bg-white/90">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-1">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.crew}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                          service.available 
                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                        }`}>
                          {service.available ? '● Available' : '● Busy'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center text-gray-600 mb-1">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-xs font-medium">Location</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{service.location}</p>
                        <p className="text-xs text-gray-500">{service.distance} away</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center text-gray-600 mb-1">
                          <Clock className="w-4 h-4 mr-2 text-orange-500" />
                          <span className="text-xs font-medium">ETA</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{service.eta}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleCall(service.number)}
                      disabled={!service.available}
                      className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                        service.available
                          ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Phone className="w-5 h-5 inline mr-2" />
                      {service.available ? `Call ${service.number}` : 'Currently Unavailable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced First Aid Resources */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-red-500" />
              First Aid Knowledge Base
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {firstAidBlogs.map((blog) => (
                <div key={blog.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:bg-white/90 hover:scale-105">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        blog.urgent 
                          ? 'bg-red-50 text-red-700 border-red-200' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {blog.category}
                      </span>
                      {blog.urgent && (
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(blog.difficulty)}`}>
                        {blog.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{blog.updated}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {blog.readTime}
                      </span>
                      <button className="text-red-500 hover:text-red-600 font-bold text-sm transition-colors group-hover:translate-x-1 transform duration-300">
                        Read Guide →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Quick Tips */}
          <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border border-red-100 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
            <h3 className="font-bold text-2xl text-red-800 mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3" />
              Critical Emergency Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Stay Calm', desc: 'Deep breaths, clear thinking, assess before acting', icon: Heart },
                { title: 'Call First', desc: 'Dial emergency services before attempting first aid', icon: Phone },
                { title: 'Don\'t Move', desc: 'Never move victims with potential spinal injuries', icon: Shield },
                { title: 'Apply Pressure', desc: 'Control bleeding with direct pressure using clean materials', icon: Plus }
              ].map((tip, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/90">
                  <tip.icon className="w-8 h-8 text-red-600 mb-3" />
                  <h4 className="font-bold text-red-800 mb-2">{tip.title}</h4>
                  <p className="text-sm text-red-700">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;