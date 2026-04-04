import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { hospitalsData } from '../data/hospitals_data';
import { Star, MapPin, Clock, ShieldCheck, Phone, Globe, Info, Activity, Heart, Award, ArrowLeft, IndianRupee } from 'lucide-react';
import MapEmbed from '../components/MapEmbed';
import { useUserLocation } from '../context/UserLocationContext';

const HospitalDetails = () => {
    const { id } = useParams();
    const { emergencyMode } = useUserLocation();
    const hospital = hospitalsData.find(h => String(h.id) === id) || hospitalsData[0];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
            {/* Header / Hero */}
            <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-500">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/search" className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                        <ArrowLeft size={20} />
                        Back to Search
                    </Link>
                </div>

            </div>

            <div className="container mx-auto px-4 mt-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Info & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="relative shrink-0">
                                    <img
                                        src={hospital.photos?.[0]?.url || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=400&h=300'}
                                        alt={hospital.name}
                                        className="w-32 h-32 md:w-48 md:h-48 rounded-2xl object-cover shadow-md"
                                    />
                                    {hospital.is_highlighted && (
                                        <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-900">
                                            <ShieldCheck size={20} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{hospital.type}</span>
                                        {hospital.open_24_7 && (
                                            <span className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Open 24/7</span>
                                        )}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-slate-50 mb-2">{hospital.name}</h1>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400 mb-6">
                                        <MapPin size={18} className="text-gray-400 dark:text-slate-500" />
                                        <span className="text-sm md:text-base">{hospital.full_address}</span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
                                            <div className="flex items-center justify-center text-yellow-500 mb-1">
                                                <Star size={16} fill="currentColor" />
                                                <span className="ml-1 text-sm font-bold text-gray-900 dark:text-slate-100">{hospital.rating_overall}</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500 dark:text-slate-400 uppercase font-bold">Overall Rating</div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
                                            <div className="flex items-center justify-center text-blue-500 dark:text-blue-400 mb-1">
                                                <Heart size={16} />
                                                <span className="ml-1 text-sm font-bold text-gray-900 dark:text-slate-100">{hospital.total_beds}</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500 dark:text-slate-400 uppercase font-bold">Total Beds</div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
                                            <div className="flex items-center justify-center text-purple-500 dark:text-purple-400 mb-1">
                                                <Award size={16} />
                                                <span className="ml-1 text-sm font-bold text-gray-900 dark:text-slate-100">{hospital.icu_beds}</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500 dark:text-slate-400 uppercase font-bold">ICU Beds</div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
                                            <div className="flex items-center justify-center text-orange-500 dark:text-orange-400 mb-1">
                                                <Clock size={16} />
                                                <span className="ml-1 text-sm font-bold text-gray-900 dark:text-slate-100">~{hospital.estimated_average_wait_time_mins}m</span>
                                            </div>
                                            <div className="text-[10px] text-gray-500 dark:text-slate-400 uppercase font-bold">Avg Wait</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Overview & Specialities */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                        <Info size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50">Overview</h3>
                                </div>
                                <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">
                                    {hospital.notes}
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-blue-500 dark:text-blue-400" size={18} />
                                        <span className="text-gray-700 dark:text-slate-300 font-medium">{hospital.contact_phone}</span>
                                    </div>
                                    {hospital.website && (
                                        <div className="flex items-center gap-3">
                                            <Globe className="text-blue-500 dark:text-blue-400" size={18} />
                                            <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium break-all">
                                                {hospital.website.replace('https://', '')}
                                            </a>
                                        </div>
                                    )}
                                    {hospital.source_verified_url && (
                                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                                            <ShieldCheck className="text-green-500 dark:text-green-400" size={18} />
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest">Verified Source</span>
                                                <a href={hospital.source_verified_url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 dark:text-slate-400 hover:text-blue-600 underline truncate max-w-[200px]">
                                                    {hospital.source_verified_url}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                        <Activity size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50">Core Specialities</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {hospital.specialities?.map((s, idx) => (
                                        <span key={idx} className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-3 py-1.5 rounded-xl text-sm font-medium">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {hospital.consultation_fee_range && (
                                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2 mb-3">
                                            <IndianRupee size={18} className="text-green-600" />
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-slate-100 uppercase tracking-tight">Consultation Fees</h4>
                                        </div>
                                        <div className="text-2xl font-black text-gray-900 dark:text-slate-100">
                                            {typeof hospital.consultation_fee_range === 'object'
                                                ? `₹${hospital.consultation_fee_range.min} - ₹${hospital.consultation_fee_range.max}`
                                                : hospital.consultation_fee_range}
                                        </div>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Estimated range based on recent data</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Specialists / Doctors */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                                        <Award size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50">Top Specialists</h3>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-slate-400 font-medium">{hospital.doctors?.length} Available</span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                {hospital.doctors?.map((doctor) => (
                                    <div key={doctor.id} className="p-4 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all flex items-center gap-4 group cursor-pointer">
                                        <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl group-hover:scale-110 transition-transform">
                                            {doctor.name.split(' ')[1]?.charAt(0) || 'D'}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-slate-50 leading-tight">{doctor.name}</h4>
                                            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">{doctor.title} • {doctor.years_experience} Yrs</p>
                                            <div className="flex items-center gap-1">
                                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-bold text-gray-700 dark:text-slate-300">{doctor.rating}</span>
                                                <span className="text-xs text-gray-400 dark:text-slate-500 font-medium ml-2">₹{doctor.consultation_fee} Fee</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Location & Insurance */}
                    <div className="space-y-8">
                        {/* Map Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-50 mb-6 flex items-center gap-2">
                                <MapPin size={20} className="text-blue-600 dark:text-blue-400" /> Location
                            </h3>
                            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 h-64 transition-all duration-500">
                                <MapEmbed address={hospital.full_address} height="100%" />
                            </div>

                        </div>

                        {/* Insurance Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-50 mb-6 flex items-center gap-2">
                                <ShieldCheck size={20} className="text-green-600 dark:text-green-400" /> Insurance Accepted
                            </h3>
                            {Array.isArray(hospital.insurance_accepted) ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {hospital.insurance_accepted.map((ins, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 hover:bg-green-50/50 dark:hover:bg-green-900/10 hover:border-green-100 dark:hover:border-green-900 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                            <span className="text-xs font-medium text-gray-700 dark:text-slate-300">{ins}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 text-sm font-medium text-gray-600 dark:text-slate-300">
                                    {hospital.insurance_accepted || 'Not specified'}
                                </div>
                            )}
                            <p className="mt-6 text-[11px] text-gray-400 dark:text-slate-500 text-center leading-relaxed font-medium">
                                * Insurance coverage depends on your specific policy. Please confirm with your provider.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalDetails;
