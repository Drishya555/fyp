'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  PopoverGroup,
} from '@headlessui/react'
import { HiOutlineUserCircle } from "react-icons/hi2";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from '../assets/mediaid.png'
import { motion, AnimatePresence } from 'framer-motion'
import AuthStore from '../hooks/authStore.js'

import {DocumentTextIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';

const callsToAction = []

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isServicesHovered, setIsServicesHovered] = useState(false)
  const [user, setUser] = useState(AuthStore.getUser());

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(AuthStore.getUser());
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    AuthStore.removeUser();
    setUser(null);

    window.dispatchEvent(new Event('authChange'));
  };

  const userId = user?.userid;

  const products = [
    { 
      name: 'Medical Record', 
      description: 'Access and manage your medical records securely', 
      href: `/medical-record/${userId}`, 
      icon: DocumentTextIcon
    },
    { 
      name: 'Pharmacy', 
      description: 'Order and manage your prescriptions online', 
      href: '/pharmacy', 
      icon: ShoppingCartIcon
    },
    { 
      name: 'Reviews', 
      description: 'Add reviews for hospitals and doctors', 
      href: '/reviews', 
      icon: StarIcon
    }
  ];

  const doctorDashboardOptions = [
    {
      name: 'Dashboard',
      href: '/doctor-dashboard'
    },
    {
      name: 'Appointments',
      href: '/docAppointments'
    },
    {
      name: 'Add Medical Record',
      href: '/addMedicalRecord'
    },
    {
      name: 'AI Disease Detection',
      href: '/imageDetection'
    },
    {
      name: 'Prescription',
      href: '/addPrescription'
    },
    {
      name: 'Change Schedule',
      href: '/addSchedule'
    }
  ];

  const hospitalDashboardOptions = [
    {
      name: 'Dashboard',
      href: '/hospital-dashboard'
    },
    {
      name: 'Appointments',
      href: '/hospital-appointments'
    },
    {
      name: 'Doctors',
      href: '/doctors-list'
    }
  ];


  const pharmacistDashboardItems = [
    {
      name: 'Dashboard',
      href: '/pharmacist-dashboard'
    },
    {
      name: 'Products',
      href: '/pharmacist-products'
    },
    {
      name: 'Orders',
      href: '/pharmacist-orders'
    },
    {
      name: 'Prescriptions',
      href: '/prescriptions'
    }
  ];

  

  const userRole = user?.role;
  const username = user?.name;

  return (
    <header className="bg-white z-50">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <motion.img
              alt=""
              src={logo}
              className="h-9 w-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <div
            className="relative"
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
          >
            <button
              className="flex items-center gap-x-1 text-lg/6 font-regular text-gray-900"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Services
              </motion.span>
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </button>

            <AnimatePresence>
              {isServicesHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5"
                  onMouseEnter={() => setIsServicesHovered(true)}
                  onMouseLeave={() => setIsServicesHovered(false)}
                >
                  <div className="p-4">
                    {products.map((item) => (
                      <motion.div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                        </div>
                        <div className="flex-auto">
                          <a href={item.href} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="/hospitals" className="text-lg/6 font-regular text-gray-900">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Hospitals
            </motion.span>
          </a>
          <a href="/doctors" className="text-lg/6 font-regular text-gray-900">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Doctors
            </motion.span>
          </a>
          <a href="/pharmacy" className="text-lg/6 font-regular text-gray-900">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Pharmacy
            </motion.span>
          </a>
          <a href="/company" className="text-lg/6 font-regular text-gray-900">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Company
            </motion.span>
          </a>

          {userRole === 'doctor' && (
           <a href="/doctor-dashboard" className="text-lg/6 font-regular text-gray-900">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Dashboard
            </motion.span>
          </a>)}

          {userRole === 'admin' && (
           <a href="/admin" className="text-lg/6 font-regular text-gray-900">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Dashboard
            </motion.span>
          </a>)}

          {userRole === 'hospital' && (
           <a href="/hospital-dashboard" className="text-lg/6 font-regular text-gray-900">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Dashboard
            </motion.span>
          </a>)}

          {userRole === 'pharmacist' && (
           <a href="/pharmacist-dashboard" className="text-lg/6 font-regular text-gray-900">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Dashboard
            </motion.span>
          </a>)}
        </PopoverGroup>

        <div className="hidden lg:flex items-center ml-8 gap-8">
          <a href="/cart" className="relative flex items-center justify-center group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-gray-700 group-hover:text-[#5770ff]"
            >
              <ShoppingBagIcon className="h-6 w-6" />
            </motion.div>
          </a>

          {user && (
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-gray-700 group-hover:text-[#5770ff]"
              >
                {userRole === 'doctor' && (
                  <a href="/doctorprofile" className="flex items-center">
                    <HiOutlineUserCircle className="h-6 w-6" />
                  </a>
                )}

                {userRole === 'user' && (
                  <a href="/profile" className="flex items-center">
                    <HiOutlineUserCircle className="h-6 w-6" />
                  </a>
                )}

                {userRole === 'hospital' && (
                  <a href="/hospitalprofile" className="flex items-center">
                    <HiOutlineUserCircle className="h-6 w-6" />
                  </a>
                )}

                {userRole === 'pharmacist' && (
                  <a href="/pharmacist-profile" className="flex items-center">
                    <HiOutlineUserCircle className="h-6 w-6" />
                  </a>
                )}
              </motion.div>
            </div>
          )}

          <a href="/login" className="ml-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={user ? handleLogout : undefined}
              className="flex items-center py-2 px-4 rounded-md hover:text-[#5770ff] font-medium transition-colors"
            >
              {user ? 'Log out' : 'Log In'} <span aria-hidden="true" className="ml-1">&rarr;</span>
            </motion.button>
          </a>
        </div>

      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10 bg-black/50"
            />
            <DialogPanel
              as={motion.div}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
            >
              <div className="flex items-center justify-between">
                <a href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src={logo}
                    className="h-8 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  {user && (
                    <div className="py-6">
                      <div className="flex items-center gap-3 px-3 mb-4">
                        <HiOutlineUserCircle className="h-8 w-8 text-gray-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Welcome</p>
                          <p className="text-sm text-gray-600">{username}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 py-6">
                    <Disclosure as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        Services
                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                    <a
                      href="/hospitals"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Hospitals
                    </a>
                    <a
                      href="/doctors"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Doctors
                    </a>
                    <a
                      href="/pharmacy"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Pharmacy
                    </a>
                    <a
                      href="/company"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Company
                    </a>
                    
                    {userRole === 'doctor' && (
                      <Disclosure as="div" className="-mx-3">
                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          Dashboard
                          <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {doctorDashboardOptions.map((item) => (
                            <DisclosureButton
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    )}
                    


                    {userRole === 'hospital' && (
                      <Disclosure as="div" className="-mx-3">
                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          Dashboard
                          <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {hospitalDashboardOptions.map((item) => (
                            <DisclosureButton
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    )}


                      {userRole === 'pharmacist' && (
                      <Disclosure as="div" className="-mx-3">
                        <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                          Dashboard
                          <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                        </DisclosureButton>
                        <DisclosurePanel className="mt-2 space-y-2">
                          {pharmacistDashboardItems.map((item) => (
                            <DisclosureButton
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    )}

                    <a
                      href="/cart"
                      className="-mx-3 flex items-center justify-between rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      <span>Cart</span>
                      <ShoppingBagIcon className="h-5 w-5" />
                    </a>
                    
                    {userRole === 'admin' && (
                      <a
                        href="/admin"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Dashboard
                      </a>
                    )}
                    
                    
                    
                   
                  </div>
                  
                  <div className="py-6">
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={user ? handleLogout : undefined}
                    >
                      {user ? 'Log out' : 'Log in'}
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        )}
      </AnimatePresence>
    </header>
  )
}