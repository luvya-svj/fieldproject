import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoctorById } from '../utils/doctorUtils';
import {
    Star, MapPin, Clock, IndianRupee, ArrowLeft, Award,
    Phone, Mail, Building2, Stethoscope, GraduationCap,
    CalendarCheck, ShieldCheck, User
} from 'lucide-react';
import MapEmbed from '../components/MapEmbed';
import { useUserLocation } from '../context/UserLocationContext';

const DoctorProfile = () => {
    const { id } = useParams();
    const { emergencyMode } = useUserLocation();
    const doctor = getDoctorById(id);

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
                <div className="text-center">
                    <User size={64} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-2xl font-black text-gray-900 dark:text-slate-50 mb-2">Doctor Not Found</h2>
                    <Link to="/search" className="text-blue-600 font-bold hover:underline">← Back to Search</Link>
                </div>
            </div>
        );
    }

    const accentColor = emergencyMode ? 'bg-red-600' : 'bg-blue-600';
    const initials = doctor.name.replace('Dr. ', '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
            {/* Hero Banner */}
            <div className={`${accentColor} pt-8 pb-32 text-white relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/5 rounded-full" />

                <div className="container mx-auto px-4 relative z-10">
                    <Link to="/search?tab=doctors" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-sm uppercase tracking-widest mb-10 transition-all">
                        <ArrowLeft size={16} /> Back to Doctors
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white/10 backdrop-blur-md border-4 border-white/20 flex items-center justify-center text-5xl font-black text-white shadow-2xl">
                                {initials}
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl shadow-xl border border-gray-100 dark:border-slate-800">
                                <div className="flex items-center gap-1">
                                    <Star size={13} className="fill-yellow-400 text-yellow-400" />
                                    <span className="font-black text-gray-900 dark:text-slate-100 text-sm">{doctor.rating?.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Core Info */}
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 flex items-center gap-1.5">
                                    <ShieldCheck size={12} /> Verified Specialist
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2 leading-tight">{doctor.name}</h1>
                            <p className="text-lg font-bold opacity-80 mb-1">{doctor.title || doctor.specialization}</p>
                            <p className="text-sm opacity-60 font-semibold mb-6">{doctor.qualifications}</p>

                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <div className="font-black text-lg leading-none">{doctor.years_experience} yrs</div>
                                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Experience</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        <IndianRupee size={20} />
                                    </div>
                                    <div>
                                        <div className="font-black text-lg leading-none">₹{doctor.consultation_fee}</div>
                                        <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Consultation Fee</div>
                                    </div>
                                </div>
                                {doctor.votes && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                            <Star size={20} />
                                        </div>
                                        <div>
                                            <div className="font-black text-lg leading-none">{doctor.votes}+</div>
                                            <div className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Patient Reviews</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column — Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Professional Overview */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
                            <h2 className="text-xl font-black text-gray-900 dark:text-slate-50 mb-4 flex items-center gap-2">
                                <Stethoscope size={20} className="text-blue-500" /> Professional Overview
                            </h2>
                            <p className="text-gray-600 dark:text-slate-400 leading-relaxed font-medium">
                                {doctor.name} is an experienced {doctor.specialization} with {doctor.years_experience}+ years
                                of clinical practice. Currently associated with <span className="font-bold text-gray-800 dark:text-slate-200">{doctor.hospitalName}</span>, Mumbai.
                                Specializing in {doctor.specialization}, they bring a patient-centric approach to diagnosis and treatment.
                            </p>

                            <div className="mt-6 grid sm:grid-cols-2 gap-4 pt-6 border-t border-gray-50 dark:border-slate-800">
                                {/* Specializations */}
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Specializations</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.specialization?.split(',').map((s, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-xl">
                                                {s.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Qualifications */}
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Qualifications</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {doctor.qualifications?.split(',').map((q, i) => (
                                            <span key={i} className="px-2 py-1 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 text-[11px] font-bold rounded-lg border border-gray-100 dark:border-slate-700">
                                                {q.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Schedule */}
                        {doctor.schedule && (
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
                                <h2 className="text-xl font-black text-gray-900 dark:text-slate-50 mb-5 flex items-center gap-2">
                                    <CalendarCheck size={20} className="text-green-500" /> OPD Schedule
                                </h2>
                                <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/30">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Available</div>
                                        <div className="font-black text-gray-800 dark:text-slate-100">{doctor.schedule}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hospital Location */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
                            <h2 className="text-xl font-black text-gray-900 dark:text-slate-50 mb-5 flex items-center gap-2">
                                <MapPin size={20} className="text-blue-500" /> Practice Location
                            </h2>
                            <div className="rounded-2xl overflow-hidden h-56 border border-gray-100 dark:border-slate-800 mb-4">
                                <MapEmbed address={doctor.hospitalAddress || `${doctor.hospitalName}, Mumbai`} height="100%" />
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                <Building2 size={18} className="text-blue-500 mt-0.5 shrink-0" />
                                <div>
                                    <div className="font-black text-gray-900 dark:text-slate-100 text-sm">{doctor.hospitalName}</div>
                                    {doctor.hospitalAddress && (
                                        <div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{doctor.hospitalAddress}</div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-3">
                                <Link
                                    to={`/hospital/${doctor.hospitalId}`}
                                    className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                >
                                    View Hospital Profile →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Contact & Quick Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 sticky top-28">

                            {/* Fee */}
                            <div className="text-center mb-6 pb-6 border-b border-gray-50 dark:border-slate-800">
                                <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Consultation Fee</div>
                                <div className="text-4xl font-black text-gray-900 dark:text-slate-50">₹{doctor.consultation_fee}</div>
                            </div>

                            {/* Contact */}
                            <div className="space-y-3 mb-6">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Contact</h3>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                    <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600">
                                        <Phone size={16} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</div>
                                        <div className="text-sm font-bold text-gray-800 dark:text-slate-200">{doctor.phone}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                    <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center text-indigo-600">
                                        <Mail size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</div>
                                        <div className="text-sm font-bold text-gray-800 dark:text-slate-200 truncate">{doctor.email}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Hospital Info */}
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 mb-6">
                                <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Associated Hospital</div>
                                <div className="font-bold text-gray-800 dark:text-slate-200 text-sm">{doctor.hospitalName}</div>
                                {doctor.hospitalNeighborhood && (
                                    <div className="text-xs text-gray-400 mt-0.5">{doctor.hospitalNeighborhood}, Mumbai</div>
                                )}
                            </div>

                            <Link
                                to={`/hospital/${doctor.hospitalId}`}
                                className="block w-full text-center py-3.5 rounded-xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
                            >
                                Visit Hospital Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
