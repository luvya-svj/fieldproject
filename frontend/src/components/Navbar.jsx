import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, HeartPulse, Menu, X, Siren, Phone, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserLocation } from '../context/UserLocationContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { emergencyMode, darkMode, toggleDarkMode } = useUserLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Search', path: '/search' },
        { name: 'Pharmacies', path: '/pharmacies' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-500 ${emergencyMode
            ? 'bg-red-600 border-b border-red-700 shadow-2xl'
            : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-gray-100 dark:border-slate-900 shadow-sm'
            }`}>
            <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${emergencyMode ? 'bg-white text-red-600 shadow-lg' : 'bg-blue-600 text-white shadow-md'
                        }`}>
                        <HeartPulse size={24} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <span className={`text-xl font-bold tracking-tight transition-colors ${emergencyMode ? 'text-white' : 'text-gray-900 dark:text-slate-50'
                        }`}>MediMap</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${emergencyMode
                                ? (isActive(link.path) ? 'bg-red-700 text-white' : 'text-red-100 hover:text-white hover:bg-red-700/50')
                                : (isActive(link.path) ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-slate-900')
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">


                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleDarkMode}
                        className={`p-2.5 rounded-xl transition-all duration-300 ${emergencyMode
                            ? 'bg-red-700 text-white hover:bg-red-800'
                            : 'bg-gray-100 text-gray-600 dark:bg-slate-900 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800'
                            }`}
                        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={darkMode ? 'sun' : 'moon'}
                                initial={{ y: -20, opacity: 0, rotate: -90 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: 20, opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>

                    <button
                        onClick={() => navigate('/search')}
                        className={`p-2.5 rounded-xl transition-colors ${emergencyMode ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-600 dark:bg-slate-900 dark:text-slate-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800'
                            }`}>
                        <Search size={20} />
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-xl transition-all ${emergencyMode ? 'bg-white text-red-600' : 'bg-gray-100 text-gray-600 dark:bg-slate-900 dark:text-slate-400'
                            }`}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`p-2 rounded-xl transition-colors ${emergencyMode ? 'text-white hover:bg-red-700' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-900'
                            }`}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className={`md:hidden p-4 space-y-4 border-t animate-in slide-in-from-top-2 duration-200 ${emergencyMode ? 'bg-red-600 border-red-500' : 'bg-white dark:bg-slate-950 border-gray-100 dark:border-slate-900 shadow-2xl'
                    }`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${emergencyMode
                                ? (isActive(link.path) ? 'bg-red-700 text-white' : 'text-white hover:bg-red-700')
                                : (isActive(link.path) ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900')
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 pt-2">
                        <a href="tel:112" className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold shadow-lg transition-all ${emergencyMode ? 'bg-white text-red-600' : 'bg-red-600 text-white shadow-red-600/20'
                            }`}>
                            <Phone size={20} /> Call Emergency (112)
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
