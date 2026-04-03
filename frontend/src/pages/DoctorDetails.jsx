import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { Star, MapPin, Clock, ShieldCheck, Award, ArrowLeft, Heart, Phone, Calendar, IndianRupee } from 'lucide-react';
import MapEmbed from '../components/MapEmbed';
import { useUserLocation } from '../context/UserLocationContext';

const DoctorDetails = () => {
    const { id } = useParams();
    const { emergencyMode } = useUserLocation();
    const doctor = doctors.find(d => String(d.id) === id) || doctors[0];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
            {/* Header / Dynamic Top Section */}
            <div className={`pt-8 pb-32 transition-colors duration-500 ${emergencyMode ? 'bg-red-600' : 'bg-blue-600'} text-white relative overflow-hidden`}>
                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/search" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm uppercase tracking-widest mb-10 transition-all">
                        <ArrowLeft size={18} /> Back to Search
                    </Link>

                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-white/20 rounded-[3rem] blur-2xl group-hover:bg-white/30 transition-all"></div>
                            <img src={doctor.image} alt={doctor.name} className="relative w-48 h-48 md:w-64 md:h-64 object-cover rounded-[2.5rem] border-8 border-white/10 shadow-2xl" />
                            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800">
                                <div className="text-blue-600 font-black text-xl italic leading-none">{doctor.experience}</div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Experience</div>
                            </div>
                        </div>

                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/20 flex items-center gap-1.5">
                                    <ShieldCheck size={14} className="text-white" /> Verified Board Certified
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-none">{doctor.name}</h1>
                            <p className="text-xl md:text-2xl font-bold opacity-90 mb-8 max-w-2xl">{doctor.specialization} • {doctor.qualification}</p>

                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                                        <Star size={24} className="fill-white" />
                                    </div>
                                    <div>
                                        <div className="text-xl font-black leading-none">{doctor.rating}</div>
                                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{doctor.reviews} Reviews</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xl font-black leading-none">{doctor.experience}</div>
                                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Exp Period</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Primary Info */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-slate-50 mb-6 flex items-center gap-3">
                                <Heart className="text-red-500" /> Professional Overview
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-slate-400 leading-relaxed font-medium mb-10">
                                Dr. {doctor.name.split(' ')[1]} is a distinguished {doctor.specialization} with a decade-long career in advanced clinical practices.
                                Known for a patient-centric approach and precision in diagnosis, currently leading the department at {doctor.hospital}.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-50 dark:border-slate-800">
                                <div>
                                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Core Procedures</h3>
                                    <div className="space-y-4">
                                        {doctor.procedures.map((p, idx) => (
                                            <div key={idx} className="flex justify-between items-center group">
                                                <span className="font-bold text-gray-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{p.name}</span>
                                                <span className="text-xs font-black bg-gray-50 dark:bg-slate-800 px-3 py-1 rounded-full text-gray-500">₹{p.cost}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Expertise Area</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {[doctor.specialization, 'Critical Care', 'Consultation', 'Emergency Med'].map(tag => (
                                            <span key={tag} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-black uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location / Mapping Section */}
                        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-slate-50 mb-6 flex items-center gap-3">
                                <MapPin size={24} className="text-blue-600" /> Practice Location
                            </h2>
                            <div className="rounded-[2.5rem] overflow-hidden border-4 border-gray-50 dark:border-slate-800 h-80 relative shadow-inner">
                                <MapEmbed address={`${doctor.hospital}, Mumbai`} height="100%" />
                                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-xl max-w-xs">
                                    <h4 className="font-black text-gray-900 dark:text-slate-100 text-sm">{doctor.hospital}</h4>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Main OPD Center, South Wing</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking / Action Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 sticky top-28">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Consultation</span>
                                    <span className="text-3xl font-black text-gray-900 dark:text-slate-50 flex items-center">
                                        <IndianRupee size={24} strokeWidth={3} /> {doctor.consultationFee}
                                    </span>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center">
                                    <Clock size={24} className="animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-3xl group hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all cursor-pointer">
                                    <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-blue-600">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-gray-400">Next Available</div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-slate-100">Today, 4:30 PM</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-3xl">
                                    <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-green-600">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest text-gray-400">Tele-Consult</div>
                                        <div className="text-sm font-bold text-gray-900 dark:text-slate-100">Ready in 10m</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => alert(`Redirecting to secure booking portal for Dr. ${doctor.name.split(' ')[1]}. Slot: Today, 4:30 PM.`)}
                                className="w-full py-5 rounded-[1.5rem] bg-blue-600 text-white font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all mb-4"
                            >
                                Book Full Session
                            </button>
                            <button
                                onClick={() => alert(`Starting secure chat with Dr. ${doctor.name.split(' ')[1]}. Please wait...`)}
                                className="w-full py-4 rounded-[1.5rem] bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-gray-100 dark:hover:bg-slate-700 transition-all"
                            >
                                Ask a Question
                            </button>

                            <div className="mt-8 pt-8 border-t border-gray-50 dark:border-slate-800 text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1 italic px-4">
                                    12 others are looking at this doctor right now
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
