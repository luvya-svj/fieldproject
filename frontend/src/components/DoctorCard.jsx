import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Building2, Clock, IndianRupee, ArrowRight, Stethoscope, Phone, Mail, Award } from 'lucide-react';

const DoctorCard = ({ doctor }) => {
    return (
        <Link
            to={`/doctor-profile/${doctor.id}`}
            className="group block bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 overflow-hidden"
        >
            {/* Coloured top bar based on specialization */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all" />

            <div className="p-5">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    {/* Avatar placeholder with initials */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-md">
                            {doctor.name.replace('Dr. ', '').charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-black text-gray-900 dark:text-slate-50 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                {doctor.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold line-clamp-1">
                                {doctor.title || doctor.specialization}
                            </p>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg shrink-0">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-black text-gray-700 dark:text-yellow-400">{doctor.rating?.toFixed(1) || '4.5'}</span>
                    </div>
                </div>

                {/* Qualifications */}
                {doctor.qualifications && (
                    <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium mb-3 line-clamp-1">
                        {doctor.qualifications}
                    </p>
                )}

                {/* Info Grid */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                        <Building2 size={14} className="text-blue-400 shrink-0" />
                        <span className="font-semibold truncate">{doctor.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                        <Award size={14} className="text-indigo-400 shrink-0" />
                        <span className="font-semibold">{doctor.years_experience} yrs experience</span>
                    </div>
                    {doctor.schedule && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                            <Clock size={14} className="text-green-400 shrink-0" />
                            <span className="font-semibold truncate">{doctor.schedule}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                        <IndianRupee size={14} className="text-emerald-400 shrink-0" />
                        <span className="font-black text-gray-800 dark:text-slate-200">₹{doctor.consultation_fee}</span>
                        <span className="text-xs text-gray-400">consultation</span>
                    </div>
                </div>

                {/* Contact row */}
                <div className="flex gap-2 text-[10px] font-bold text-gray-400 dark:text-slate-500 mb-4">
                    <div className="flex items-center gap-1 bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                        <Phone size={9} /> {doctor.phone}
                    </div>
                </div>

                {/* Specialization tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {doctor.specialization?.split(',').slice(0, 2).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-md uppercase tracking-wide">
                            {s.trim()}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-slate-800">
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest group-hover:underline">
                        View Full Profile
                    </span>
                    <ArrowRight size={16} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
};

export default DoctorCard;
