import React, { useState } from 'react';
import ListingCard from '../components/ListingCard';
import { pharmacies } from '../data/pharmacies';
import { Search, Pill, Store, Clock, ChevronRight, Activity } from 'lucide-react';
import { useUserLocation } from '../context/UserLocationContext';

const Pharmacies = () => {
    const [medicine, setMedicine] = useState('');
    const [searchStatus, setSearchStatus] = useState(null); // null, 'searching', 'found'
    const { emergencyMode } = useUserLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!medicine) return;
        setSearchStatus('searching');
        setTimeout(() => {
            setSearchStatus('found');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20">
            {/* Premium Hero Section */}
            <div className={`pt-16 pb-20 transition-colors duration-500 ${emergencyMode ? 'bg-red-600' : 'bg-blue-600'} text-white relative overflow-hidden shadow-2xl`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-20 -mb-20"></div>

                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6 animate-in slide-in-from-bottom-2 duration-700">
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                                <Pill size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-1">Medicine Finder</h1>
                                <p className="text-lg font-bold opacity-80 uppercase tracking-widest text-[10px]">Real-time Inventory Network</p>
                            </div>
                        </div>

                        <p className="text-xl font-bold mb-10 opacity-90 max-w-xl leading-relaxed">
                            Search for specific medications across our network of 24/7 pharmacies and verify live stock availability.
                        </p>

                        <form className="relative group max-w-2xl" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search medicine name (e.g. Augmentin 625, Insulin)..."
                                className="w-full h-18 pl-16 pr-44 rounded-2xl bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-bold text-lg shadow-2xl focus:ring-8 focus:ring-white/20 outline-none transition-all border-none"
                                value={medicine}
                                onChange={(e) => setMedicine(e.target.value)}
                            />
                            <Search className="absolute left-6 top-6 text-gray-400 dark:text-slate-500 group-focus-within:text-white dark:group-focus-within:text-blue-400 transition-colors" size={24} />
                            <button
                                type="submit"
                                className={`absolute right-3 top-3 bottom-3 px-8 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 ${emergencyMode ? 'bg-red-600' : 'bg-blue-600'
                                    } text-white hover:brightness-110`}
                            >
                                Check Stock
                            </button>
                        </form>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/60">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                Live Sync Active
                            </div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/60">
                                <Clock size={14} />
                                24/7 Support Available
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                {/* Search Results Mockup */}
                {searchStatus === 'searching' && (
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 border-4 border-blue-100 dark:border-slate-800 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-slate-100 mb-2">Scanning Network Inventory...</h3>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Connecting to 14 regional pharmaceutical nodes</p>
                    </div>
                )}

                {searchStatus === 'found' && (
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-green-500 dark:border-green-600 shadow-2xl animate-in slide-in-from-top-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl">
                                    <Activity size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 dark:text-slate-100 tracking-tight">Stock Confirmed!</h3>
                                    <p className="text-gray-500 dark:text-slate-400 font-bold">"{medicine}" found in 3 pharmacies within 5km.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 py-3 bg-green-600 text-white font-black rounded-xl shadow-lg shadow-green-600/20 text-sm uppercase tracking-widest hover:bg-green-700 transition-all active:scale-95">
                                    Reserve Now
                                </button>
                                <button onClick={() => setSearchStatus(null)} className="p-3 text-gray-400 hover:text-gray-600">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-20">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-slate-50 tracking-tighter mb-2">Verified Pharmacies</h2>
                            <p className="text-gray-500 dark:text-slate-400 font-bold">Accredited medical suppliers with real-time stock sync</p>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-sm font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-all">
                            Filter by 24/7 < ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pharmacies.map(item => (
                            <ListingCard key={item.id} data={item} type="pharmacy" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pharmacies;
