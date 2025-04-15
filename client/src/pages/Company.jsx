
import { useEffect, useRef, useMemo } from 'react';
import { FaUsers, FaRocket, FaAward, FaGlobe, FaChevronRight, FaArrowRight, FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { motion, useInView, useAnimation } from 'framer-motion';

// Refactored AnimateOnScroll component with better memoization
// eslint-disable-next-line react/prop-types
const AnimateOnScroll = ({ children, delay = 0, duration = 0.5, once = true, threshold = 0.1 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, threshold, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const variants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: "easeOut" } }
  }), [delay, duration]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default function AboutUs() {
  // Using Memoization for static data
  const team = useMemo(() => [
    { 
      name: "Harvey Specter", 
      role: "CEO & Founder", 
      image: "https://i.pinimg.com/736x/bf/82/a9/bf82a9e7b2bdf246d4e8770244b8b26d.jpg",
      alt: "Harvey Specter CEO"
    },
    { 
      name: "Donna Roberta Paulsen", 
      role: "CTO", 
      image: "https://i.pinimg.com/736x/4b/01/fd/4b01fd635a8c1000b88d630973590932.jpg",
      alt: "Donna Paulsen CTO"
    },
    { 
      name: "Louis Litt", 
      role: "Design Lead", 
      image: "https://i.pinimg.com/736x/76/0f/9c/760f9c7dc4aec1696cb023dbc66cd8f3.jpg",
      alt: "Louis Litt Design Lead"
    },
    { 
      name: "Jessica Pearson", 
      role: "Marketing Director", 
      image: "https://i.pinimg.com/736x/14/81/1d/14811dc3d31ea39f6dbd5556803b5ead.jpg",
      alt: "Jessica Pearson Marketing Director"
    }
  ], []);

  const values = useMemo(() => [
    { 
      icon: <FaRocket size={24} aria-hidden="true" />, 
      title: "Innovation", 
      description: "We constantly push boundaries and embrace new technologies." 
    },
    { 
      icon: <FaUsers size={24} aria-hidden="true" />, 
      title: "Collaboration", 
      description: "We believe in the power of teamwork and shared success." 
    },
    { 
      icon: <FaAward size={24} aria-hidden="true" />, 
      title: "Excellence", 
      description: "We strive for the highest standards in everything we do." 
    },
    { 
      icon: <FaGlobe size={24} aria-hidden="true" />, 
      title: "Global Impact", 
      description: "We're committed to creating solutions that matter worldwide." 
    }
  ], []);

  const stats = useMemo(() => [
    { value: "5+", label: "Years in Business" },
    { value: "30+", label: "Team Members" },
    { value: "200+", label: "Clients Worldwide" },
    { value: "15+", label: "Countries Reached" }
  ], []);

  // eslint-disable-next-line react/prop-types
  const SectionHeading = ({ title, centered = false }) => (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <div className={`w-20 h-1 bg-blue-600 ${centered ? 'mx-auto' : ''} mb-6`}></div>
    </div>
  );

  // Improved accessibility and performance with semantic HTML
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                We&apos;re Building <span className="text-blue-600">The Future</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Our team of passionate innovators is dedicated to creating technology that makes a difference in people&apos;s lives.
              </p>
              <motion.button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More <FaChevronRight size={16} aria-hidden="true" />
              </motion.button>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full opacity-10"></div>
                <img 
                  src="https://media.istockphoto.com/id/1404179486/photo/anesthetist-working-in-operating-theatre-wearing-protecive-gear-checking-monitors-while.jpg?s=612x612&w=0&k=20&c=gecZ0b-nDIuMOvRIt8Qyam-eSx6RBdUzn5yDh0nNEvM=" 
                  alt="Medical professional in operating room" 
                  className="rounded-full object-cover shadow-xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 md:px-12 bg-white" id="mission">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <AnimateOnScroll delay={0.2} className="md:w-1/2">
              <div className="relative w-full h-64 md:h-96">
                <img 
                  src="https://www.gvh.org/wp-content/uploads/2025/03/hospital_daytime_ext_1708x750_2025.jpg" 
                  alt="Modern hospital building exterior" 
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </AnimateOnScroll>
            <div className="md:w-1/2">
              <AnimateOnScroll>
                <SectionHeading title="Our Mission" />
                <p className="text-lg text-gray-600 mb-6">
                  We believe technology should enhance human potential, not replace it. Our mission is to develop intuitive solutions that empower people and organizations to achieve more.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Since our founding in 2018, we&apos;ve been dedicated to creating innovative products that combine cutting-edge technology with thoughtful design focused on healthcare improvement.
                </p>
                <motion.button 
                  className="text-blue-600 font-medium flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
                  whileHover={{ gap: "12px" }}
                >
                  Read our story <FaArrowRight size={16} aria-hidden="true" />
                </motion.button>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-12 bg-blue-600 text-white" id="impact">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
              <div className="w-20 h-1 bg-white mx-auto"></div>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <motion.div 
                  className="bg-blue-700 p-8 rounded-lg text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-blue-100">{stat.label}</p>
                </motion.div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-12 bg-white" id="team">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our diverse team brings together expertise from technology, healthcare, design, and business to create exceptional experiences.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <motion.div 
                  className="bg-gray-50 rounded-lg p-6 text-center"
                  whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                >
                  <motion.div 
                    className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-blue-100"
                  >
                    <img 
                      src={member.image} 
                      alt={member.alt} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <div className="flex justify-center gap-3 text-gray-500">
                    <motion.a 
                      href="#" 
                      className="hover:text-blue-600 transition-colors p-2" 
                      whileHover={{ scale: 1.2 }}
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <FaTwitter size={18} aria-hidden="true" />
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="hover:text-blue-600 transition-colors p-2" 
                      whileHover={{ scale: 1.2 }}
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <FaLinkedinIn size={18} aria-hidden="true" />
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="hover:text-blue-600 transition-colors p-2" 
                      whileHover={{ scale: 1.2 }}
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <FaGithub size={18} aria-hidden="true" />
                    </motion.a>
                  </div>
                </motion.div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll delay={0.4}>
            <div className="text-center mt-12">
              <motion.button 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Team Members
              </motion.button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-50" id="values">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do and help us deliver exceptional results for our clients and patients.
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <motion.div 
                  className="flex gap-5 items-start p-6 bg-white rounded-lg shadow-sm"
                  whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
                >
                  <motion.div 
                    className="text-blue-600 bg-blue-50 p-3 rounded-full flex-shrink-0"
                    whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {value.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New Addition */}
      <section className="py-20 px-6 md:px-12 bg-white" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Hear what our clients have to say about working with us.
              </p>
            </div>
          </AnimateOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimateOnScroll delay={0.1}>
              <motion.div 
                className="bg-gray-50 p-8 rounded-lg relative"
                whileHover={{ y: -5 }}
              >
                <div className="text-blue-600 text-6xl font-serif absolute top-4 left-4 opacity-20">&quot;</div>
                <p className="text-gray-600 mb-6 relative z-10">
                  Their team delivered beyond our expectations. The healthcare technology solutions they implemented have streamlined our operations and improved patient care significantly.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden mr-4">
                    <div className="w-full h-full bg-blue-200"></div>
                  </div>
                  <div>
                    <h4 className="font-bold">Dr. Sarah Johnson</h4>
                    <p className="text-blue-600 text-sm">General Hospital</p>
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>
            
            <AnimateOnScroll delay={0.2}>
              <motion.div 
                className="bg-gray-50 p-8 rounded-lg relative"
                whileHover={{ y: -5 }}
              >
                <div className="text-blue-600 text-6xl font-serif absolute top-4 left-4 opacity-20">&quot;</div>
                <p className="text-gray-600 mb-6 relative z-10">
                  Working with this team has been transformative for our clinic. Their innovative approach and attention to detail resulted in solutions that truly make a difference.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden mr-4">
                    <div className="w-full h-full bg-blue-200"></div>
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-blue-600 text-sm">Regional Medical Center</p>
                  </div>
                </div>
              </motion.div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-blue-900 text-white overflow-hidden" id="contact">
        <AnimateOnScroll>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Let&apos;s discuss how we can help your healthcare business grow and innovate.
            </p>
            <motion.button 
              className="bg-white text-blue-900 hover:bg-blue-100 font-medium py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </AnimateOnScroll>
      </section>

    
    </div>
  );
}