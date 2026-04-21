import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, MapPin, Truck, Pill, Loader2, AlertCircle } from 'lucide-react';
import PharmacyCard from '../components/PharmacyCard';

const Pharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
    const [deliveryOnly, setDeliveryOnly] = useState(false);

    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                // Change to actual backend URL in production
                const response = await fetch('http://localhost:5000/api/pharmacies');
                if (!response.ok) throw new Error('Failed to fetch pharmacies');
                const result = await response.json();
                setPharmacies(result.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Unable to load pharmacy locations right now.');
                setLoading(false);
            }
        };

        fetchPharmacies();
    }, []);

    // Derive neighborhoods from data
    const neighborhoods = useMemo(() => {
        const nbrs = new Set(pharmacies.map(p => p.neighborhood).filter(Boolean));
        return ['All', ...Array.from(nbrs).sort()];
    }, [pharmacies]);

    const filteredPharmacies = useMemo(() => {
        let result = pharmacies;

        if (searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(query) || 
                (p.neighborhood && p.neighborhood.toLowerCase().includes(query)) ||
                (p.full_address && p.full_address.toLowerCase().includes(query))
            );
        }

        if (selectedNeighborhood !== 'All') {
            result = result.filter(p => p.neighborhood === selectedNeighborhood);
        }

        if (deliveryOnly) {
            result = result.filter(p => p.home_delivery);
        }

        return result;
    }, [pharmacies, searchQuery, selectedNeighborhood, deliveryOnly]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
            {/* Header */}
            <div className="bg-emerald-600 dark:bg-emerald-800 pt-12 pb-12 text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3 tracking-tighter">
                                <Pill size={40} />
                                24/7 PHARMACIES
                            </h1>
                            <p className="text-lg font-bold opacity-90 text-emerald-100">
                                Verified all-night medical stores in Mumbai
                            </p>
                        </div>
                        
                        <div className="relative w-full max-w-xl group">
                            <input
                                type="text"
                                placeholder="Search by area, store name..."
                                className="w-full h-16 pl-14 pr-12 rounded-2xl bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-bold text-lg shadow-2xl focus:ring-4 focus:ring-emerald-500/30 outline-none transition-all border-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <SearchIcon className="absolute left-5 top-5 text-gray-400 dark:text-slate-500 group-focus-within:text-emerald-500 transition-colors" size={24} />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-5 top-5 text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 mt-8 grid lg:grid-cols-4 gap-8">
                
                {/* Filtration Sidebar */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm sticky top-28 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-black text-gray-900 dark:text-gray-100">Filters</h2>
                            <button 
                                onClick={() => { setSearchQuery(''); setSelectedNeighborhood('All'); setDeliveryOnly(false); }}
                                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Delivery Toggle */}
                        <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                            <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
                                <Truck size={20} />
                                <span className="text-sm font-black uppercase tracking-widest">Home Delivery</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={deliveryOnly} onChange={(e) => setDeliveryOnly(e.target.checked)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                            </label>
                        </div>

                        {/* Neighborhood Dropdown */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                    <MapPin size={18} />
                                </div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Neighborhood</h3>
                            </div>
                            <select
                                value={selectedNeighborhood}
                                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                            >
                                {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-3">
                    <div className="flex items-center gap-2 pl-4 mb-6">
                        <span className="text-sm font-bold text-gray-700 dark:text-slate-300 uppercase tracking-tight">
                            {filteredPharmacies.length} Pharmacies Found
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 text-emerald-600">
                            <Loader2 size={48} className="animate-spin mb-4" />
                            <p className="font-black uppercase tracking-widest text-sm">Loading Pharmacies...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-32 text-red-500">
                            <AlertCircle size={48} className="mb-4" />
                            <p className="font-black uppercase tracking-widest text-sm">{error}</p>
                        </div>
                    ) : filteredPharmacies.length > 0 ? (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredPharmacies.map(pharmacy => (
                                    <motion.div
                                        key={pharmacy.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <PharmacyCard data={pharmacy} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800"
                        >
                            <Pill className="mx-auto text-gray-300 dark:text-slate-700 mb-4" size={48} />
                            <h3 className="text-xl font-black text-gray-900 dark:text-slate-50 mb-1">No pharmacies found</h3>
                            <p className="text-gray-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Try adjusting your filters or area</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pharmacies;
