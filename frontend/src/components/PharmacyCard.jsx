import React from 'react';
import { MapPin, PhoneCall, Star, Clock, HeartPulse, Building2, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const PharmacyCard = ({ data }) => {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-900/10 dark:shadow-none dark:hover:shadow-blue-900/40 border border-gray-100 dark:border-slate-800 transition-all duration-300"
        >
            <div className="flex flex-col gap-6">
                
                {/* Brand & Identity Section */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500 ${
                            data.name.toLowerCase().includes('wellness') ? 'bg-emerald-600 text-white shadow-emerald-600/20' :
                            data.name.toLowerCase().includes('apollo') ? 'bg-orange-600 text-white shadow-orange-600/20' :
                            data.name.toLowerCase().includes('noble') ? 'bg-blue-700 text-white shadow-blue-700/20' :
                            'bg-indigo-600 text-white shadow-indigo-600/20'
                        }`}>
                            <Building2 size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border border-gray-200 dark:border-slate-700/50">
                                    {data.neighborhood}
                                </span>
                                {data.open_24_7 && (
                                    <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-1">
                                        <Clock size={12} /> 24x7
                                    </span>
                                )}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-slate-50 tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {data.name}
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        {data.rating >= 4.0 && (
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1 border border-yellow-100 dark:border-yellow-900/50">
                                <Star size={14} fill="currentColor" /> {data.rating}
                            </div>
                        )}
                        <div className="flex items-center gap-1.5">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-1.5 rounded-lg text-blue-600 dark:text-blue-400">
                                <ShieldCheck size={14} />
                            </div>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Verified</span>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="grid sm:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-blue-500 shrink-0">
                                <MapPin size={16} />
                            </div>
                            <p className="text-sm font-bold text-gray-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {data.full_address}
                            </p>
                        </div>
                        
                        {data.home_delivery && (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                                    <Truck size={16} />
                                </div>
                                <span className="text-xs font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Free Home Delivery</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-end gap-4 sm:border-l sm:border-gray-100 sm:dark:border-slate-800 sm:pl-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform group-hover:rotate-12">
                                <PhoneCall size={18} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Store Direct</div>
                                <div className="text-lg font-black text-gray-900 dark:text-slate-100 leading-none">{data.contact_phone}</div>
                            </div>
                        </div>

                        <a 
                            href={`tel:${data.contact_phone.replace(/\D/g,'')}`}
                            className="w-full bg-gray-900 hover:bg-black dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-xl active:scale-95 text-center flex items-center justify-center gap-2 group-hover:shadow-blue-600/30"
                        >
                            Connect Now <HeartPulse size={14} className="animate-pulse" />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PharmacyCard;
