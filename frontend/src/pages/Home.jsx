import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import { Hospital, Stethoscope, Clock, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserLocation } from '../context/UserLocationContext';

const features = [
    {
        icon: Hospital,
        title: 'Verified Hospitals',
        desc: 'Access a curated network of hospitals with real-time availability and transparent pricing.',
        color: 'blue'
    },
    {
        icon: Stethoscope,
        title: 'Top Specialists',
        desc: 'Find experienced doctors across 20+ specializations, matched to your symptoms.',
        color: 'indigo'
    },
    {
        icon: Clock,
        title: 'Instant Results',
        desc: 'GPS-powered search delivers the nearest care options in seconds, not minutes.',
        color: 'green'
    },
    {
        icon: Shield,
        title: 'Insurance Support',
        desc: 'Filter by your insurance provider to find cashless treatment options nearby.',
        color: 'purple'
    }
];

const colorMap = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
};

const Home = () => {
    const { emergencyMode } = useUserLocation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-slate-950 transition-colors duration-500"
        >
            <Hero />

            {/* Features Section */}
            <section className="py-24 bg-gray-50 dark:bg-slate-900/50 transition-colors duration-500">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                            Why MediMap
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-slate-50 mt-3">
                            Healthcare, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Reimagined.</span>
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-slate-400 font-medium mt-4 max-w-2xl mx-auto">
                            We connect patients with the best healthcare providers using real-time location data and intelligent matching.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colorMap[feature.color]} transition-transform group-hover:scale-110`}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-slate-50 mb-2 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-slate-50 mb-6">
                            Ready to find the right care?
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-slate-400 font-medium mb-10">
                            Search hospitals, specialists, and pharmacies near you — all in one place.
                        </p>
                        <Link
                            to="/search"
                            className={`inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest text-white transition-all shadow-xl active:scale-[0.97] ${emergencyMode
                                    ? 'bg-red-600 shadow-red-600/30 hover:bg-red-700'
                                    : 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-700'
                                }`}
                        >
                            Search Now <ArrowRight size={22} strokeWidth={3} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;