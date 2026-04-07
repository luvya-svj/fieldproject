import React from 'react';
import { Star, MapPin, Clock, IndianRupee, ArrowRight, Siren, Navigation, CheckCircle, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserLocation } from '../context/UserLocationContext';

const ListingCard = ({ data, type, isCompared, onCompareToggle }) => {
    const isDoctor = type === 'doctor';
    const isPharmacy = type === 'pharmacy';
    const { emergencyMode } = useUserLocation();

    // Format currency smartly (k for thousands, L for lakhs)
    const formatCurrency = (val) => {
        if (!val) return '₹0';
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        if (val >= 1000) return `₹${Math.round(val / 1000)}k`;
        return `₹${val}`;
    };

    // Helper to handle profile links
    const profileLink = isDoctor
        ? `/doctor/${data.id}`
        : isPharmacy ? '#' : `/hospital/${data.id}`;

    // Emergency high-visibility styles
    const emergencyStyles = emergencyMode
        ? (data.emergency ? 'bg-red-50 border-red-300 ring-4 ring-red-100 shadow-2xl scale-[1.02] z-10 dark:bg-red-950/30 dark:border-red-800 dark:ring-red-900/20' : 'opacity-40 grayscale-[0.8] scale-[0.95] blur-[0.5px]')
        : (data.isHighlighted
            ? 'bg-green-50 border-green-200 shadow-lg ring-1 ring-green-100 dark:bg-green-950/20 dark:border-green-900'
            : 'bg-white border-gray-100 shadow-sm hover:shadow-xl dark:bg-slate-900 dark:border-slate-800');

    return (
        <div className={`group rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col h-full ${emergencyStyles}`}>
            {!isPharmacy && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={data.image || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800&h=400'}
                        alt={data.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800&h=400'; }}
                    />
                    {onCompareToggle && !emergencyMode && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onCompareToggle(data.id);
                            }}
                            className={`absolute top-3 left-3 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg transition-all flex items-center gap-1.5 ${
                                isCompared
                                    ? 'bg-blue-600 text-white border border-blue-500 shadow-blue-600/30 ring-2 ring-blue-600/20'
                                    : 'bg-white/90 text-gray-600 hover:bg-white hover:text-blue-600 border border-white/50'
                            }`}
                        >
                            <Scale size={12} className={isCompared ? 'text-white' : 'text-gray-400'} />
                            {isCompared ? 'Added' : 'Compare'}
                        </button>
                    )}
                    {( (emergencyMode && data.emergency) || (isDoctor && data.specialization) ) && (
                        <div className={`absolute top-3 right-3 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black shadow-lg transition-all transform ${emergencyMode && data.emergency
                            ? 'bg-red-600 text-white scale-110'
                            : 'bg-white/90 text-gray-800 dark:bg-slate-800/90 dark:text-slate-200'
                            }`}>
                            {emergencyMode && data.emergency ? (
                                <span className="flex items-center gap-1"><Siren size={14} className="animate-pulse" /> EMERGENCY HUB</span>
                            ) : (data.specialization)}
                        </div>
                    )}
                </div>
            )}

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {data.isVerified && (
                                <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 shadow-sm">
                                    <CheckCircle size={10} strokeWidth={3} />
                                    <span className="text-[9px] font-black uppercase tracking-wider">Verified</span>
                                </div>
                            )}
                        </div>
                        <h3 className={`text-xl font-extrabold transition-colors line-clamp-1 ${emergencyMode && data.emergency ? 'text-red-700 dark:text-red-400 uppercase tracking-tight' : 'text-gray-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                            }`}>{data.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-black text-gray-700 dark:text-yellow-500">{data.rating}</span>
                    </div>
                </div>

                {isDoctor && <p className="text-sm text-gray-500 dark:text-slate-400 mb-1 font-medium">{data.qualification} • {data.experience}</p>}
                {isDoctor && <p className="text-sm text-gray-500 dark:text-slate-500 mb-4 font-semibold italic">at {data.hospital}</p>}

                <div className="space-y-3 mt-auto">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-slate-400 text-sm font-medium">
                        <MapPin size={18} className={emergencyMode && data.emergency ? 'text-red-500 animate-bounce' : 'text-gray-400 dark:text-slate-500 shrink-0'} />
                        <span className="truncate">{data.address}</span>
                    </div>

                    {!isPharmacy && (
                        <>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-slate-400 text-sm font-medium">
                                <Clock size={18} className={emergencyMode && data.emergency ? 'text-red-500' : 'text-gray-400 dark:text-slate-500 shrink-0'} />
                                <div className="flex items-center gap-2">
                                    <span>Approx. Wait: <span className={`font-black text-base ${emergencyMode && data.emergency ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-slate-100'}`}>{data.waitingTime || 'N/A'}</span></span>
                                </div>
                            </div>
                            {!emergencyMode && (
                                <div className="flex flex-col gap-1.5 mt-1 mb-1">
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-slate-400 text-sm font-medium">
                                        <IndianRupee size={18} className="text-gray-400 dark:text-slate-500 shrink-0" />
                                        <span>Consult: <span className="font-black text-gray-900 dark:text-slate-100">
                                            {data.consultation_fee_range ? (
                                                typeof data.consultation_fee_range === 'object'
                                                    ? `₹${data.consultation_fee_range.min} - ₹${data.consultation_fee_range.max}`
                                                    : data.consultation_fee_range
                                            ) : (data.consultationFee ? `₹${data.consultationFee}` : 'Not available')}
                                        </span></span>
                                    </div>
                                    {data.budget_range && (
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-slate-400 text-sm font-medium">
                                            <div className="w-[18px] shrink-0" />
                                            <span>Procedures: <span className="font-black text-orange-600 dark:text-orange-400">
                                                {formatCurrency(data.budget_range.min)} - {formatCurrency(data.budget_range.max)}
                                            </span></span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Insurance Section */}
                            {!emergencyMode && (data.insurance || data.insurance_accepted) && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {Array.isArray(data.insurance || data.insurance_accepted) ? (
                                        <>
                                            {(data.insurance || data.insurance_accepted).slice(0, 2).map((ins, idx) => (
                                                <span key={idx} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-800">
                                                    {ins}
                                                </span>
                                            ))}
                                            {(data.insurance || data.insurance_accepted).length > 2 && (
                                                <span className="text-[9px] font-bold text-gray-400 px-1">+{(data.insurance || data.insurance_accepted).length - 2} more</span>
                                            )}
                                        </>
                                    ) : (
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight italic">
                                            {data.insurance || data.insurance_accepted}
                                        </span>
                                    )}
                                </div>
                            )}
                            {!emergencyMode && !(data.insurance || data.insurance_accepted) && (
                                <div className="text-[9px] font-bold text-gray-400 mt-2 uppercase tracking-tight italic">Insurance info not available</div>
                            )}

                            {data.source_verified_url && (
                                <div className="flex items-center gap-1.5 mt-2 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-lg border border-green-100 dark:border-green-900/50 w-fit">
                                    <CheckCircle size={10} className="text-green-600 dark:text-green-400" />
                                    <span className="text-[9px] font-black text-green-700 dark:text-green-400 uppercase tracking-tighter">Verified Source Data</span>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="grid gap-3 mt-6">
                    {(!isPharmacy && !emergencyMode) && (
                        <Link to={profileLink} className="w-full py-3 px-4 rounded-xl border-2 border-gray-100 dark:border-slate-800 text-gray-700 dark:text-slate-300 font-bold text-center hover:bg-gray-50 dark:hover:bg-slate-800 hover:border-gray-200 transition-all">
                            View Profile
                        </Link>
                    )}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            const action = isPharmacy ? 'order' : 'appointment';
                            alert(`Initializing ${action} for ${data.name}. You are being connected to the secure ${data.isVerified ? 'verified' : ''} portal.`);
                        }}
                        className={`w-full py-3.5 px-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 ${emergencyMode && data.emergency
                            ? 'bg-red-600 text-white shadow-red-600/40 hover:bg-red-700 h-16 text-xl tracking-tighter'
                            : (isPharmacy ? 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700' : 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700')
                            }`}>
                        {emergencyMode && data.emergency ? (
                            <><Navigation size={24} className="animate-pulse" /> GET DIRECTIONS</>
                        ) : (isPharmacy ? 'Find Medicine' : 'Book Appointment')}
                        {!emergencyMode && <ArrowRight size={18} />}
                    </button>

                    {emergencyMode && data.emergency && (
                        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-red-500 animate-pulse mt-1">
                            <Siren size={10} /> PRIORITY TRAUMA CENTER AVAILABLE
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
