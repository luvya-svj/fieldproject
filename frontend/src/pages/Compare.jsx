import React, { useMemo, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { verified as allHospitals } from '../data/hospitals_verified';
import { ArrowLeft, CheckCircle, XCircle, MapPin, IndianRupee, Clock, ShieldCheck, ArrowRight, Ambulance } from 'lucide-react';

const Compare = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedFocus, setSelectedFocus] = useState('General');

    // Extract ids from ?ids=id1,id2,id3
    const idsToCompare = useMemo(() => {
        const params = new URLSearchParams(location.search);
        const ids = params.get('ids');
        return ids ? ids.split(',').filter(Boolean) : [];
    }, [location.search]);

    const compareData = useMemo(() => {
        return idsToCompare.map(id => allHospitals.find(h => String(h.id) === id)).filter(Boolean);
    }, [idsToCompare]);

    if (compareData.length < 2) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100 dark:border-slate-800">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-slate-50 mb-2">Not enough data</h2>
                    <p className="text-gray-500 dark:text-slate-400 font-bold mb-6">Please select at least 2 hospitals to compare.</p>
                    <button 
                        onClick={() => navigate('/search')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-blue-700 transition"
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        );
    }

    const formatCurrency = (val) => {
        if (!val) return '₹0';
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
        if (val >= 1000) return `₹${Math.round(val / 1000)}k`;
        return `₹${val}`;
    };

    const hasEmergency = (h) => h.emergency || h.type?.toLowerCase().includes('hospital') || false;

    const medicalCategories = [
        'General',
        'Cardiology',
        'Orthopaedics',
        'Oncology',
        'Neurology',
        'Gynaecology & Obstetrics',
        'General Surgery'
    ];

    const isSpecialtySupported = (hospital, focus) => {
        if (focus === 'General') return true;
        const specs = Array.isArray(hospital.specialities) ? hospital.specialities : 
                      Array.isArray(hospital.specialties) ? hospital.specialties : 
                      (hospital.specialization ? hospital.specialization.split(',') : []);
        return specs.some(s => s.toLowerCase().includes(focus.toLowerCase()));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
            {/* Header */}
            <div className="bg-blue-600 dark:bg-blue-800 pt-8 pb-12 text-white shadow-lg">
                <div className="container mx-auto px-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold text-sm uppercase tracking-widest mb-6 transition-all"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-2">COMPARE PLATFORM</h1>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
                        <p className="text-blue-100 font-bold text-lg opacity-90">Side-by-side analysis of {compareData.length} facilities</p>
                        
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 flex items-center gap-3">
                            <span className="text-sm font-bold text-blue-100 uppercase tracking-wider">Focus Area:</span>
                            <select 
                                value={selectedFocus} 
                                onChange={(e) => setSelectedFocus(e.target.value)}
                                className="bg-white text-blue-900 font-black text-sm px-4 py-2 rounded-lg pr-8 outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                {medicalCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat} Care</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-6">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-6 border-b-2 border-r border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 w-1/4">
                                    <div className="text-sm font-black text-gray-400 uppercase tracking-widest">Compare Criteria</div>
                                </th>
                                {compareData.map(h => (
                                    <th key={h.id} className="p-6 border-b-2 border-r last:border-r-0 border-gray-100 dark:border-slate-800 align-top w-[25%] bg-white dark:bg-slate-900 relative">
                                        <div className="flex flex-col h-full">
                                            <div className="h-40 mb-4 rounded-xl overflow-hidden shadow-inner border border-gray-100 dark:border-slate-700">
                                                <img 
                                                    src={h.image || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800&h=400'} 
                                                    alt={h.name} 
                                                    className="w-full h-full object-cover" 
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800&h=400'; }}
                                                />
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 dark:text-slate-100 leading-tight mb-2 line-clamp-2">{h.name}</h3>
                                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{h.neighborhood}</div>
                                            
                                            <Link 
                                                to={`/hospital/${h.id}`}
                                                className="mt-auto block text-center py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400 rounded-lg text-xs font-black uppercase tracking-widest transition-colors"
                                            >
                                                Full Profile
                                            </Link>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-slate-800">
                            {/* OVERVIEW SECTION */}
                            <tr className="bg-gray-50 dark:bg-slate-900/50">
                                <td colSpan={compareData.length + 1} className="py-3 px-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">1. Overview & Location</td>
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 font-bold bg-gray-50 dark:bg-slate-900/30">Rating</td>
                                {compareData.map(h => (
                                    <td key={h.id} className="p-6 border-r last:border-r-0 border-gray-100 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 px-2.5 py-1 rounded-lg font-black text-base">
                                                {h.rating} ★
                                            </div>
                                            <div className="text-xs text-gray-400 font-bold">({h.reviews || 0})</div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 font-bold bg-gray-50 dark:bg-slate-900/30">Location</td>
                                {compareData.map(h => (
                                    <td key={h.id} className="p-6 border-r last:border-r-0 border-gray-100 dark:border-slate-800">
                                        <div className="flex items-start gap-2">
                                            <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-slate-300 line-clamp-3">{h.address}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* CLINICAL SUPPORT */}
                            <tr className="bg-gray-50 dark:bg-slate-900/50">
                                <td colSpan={compareData.length + 1} className="py-3 px-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">2. Clinical Support</td>
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-black bg-blue-50/50 dark:bg-blue-900/10">Availability:<br/>{selectedFocus}</td>
                                {compareData.map(h => {
                                    const supported = isSpecialtySupported(h, selectedFocus);
                                    return (
                                        <td key={`${h.id}-focus`} className={`p-6 border-r last:border-r-0 border-gray-100 dark:border-slate-800 transition-colors ${supported ? 'bg-green-50/30 dark:bg-green-900/10' : 'bg-red-50/30 dark:bg-red-900/10'}`}>
                                            {supported ? (
                                                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-extrabold">
                                                    <CheckCircle size={24} /> <span>Available</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-red-500 dark:text-red-400 font-bold">
                                                    <XCircle size={20} /> <span>Not Specialized</span>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 font-bold bg-gray-50 dark:bg-slate-900/30">Emergency & Trauma</td>
                                {compareData.map(h => {
                                    const isEmergency = hasEmergency(h);
                                    return (
                                        <td key={h.id} className="p-6 border-r last:border-r-0 border-gray-100 dark:border-slate-800">
                                            {isEmergency ? (
                                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-black">
                                                    <CheckCircle size={20} /> <span className="uppercase text-xs tracking-wider">Yes / 24x7</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-red-500 dark:text-red-400 font-bold">
                                                    <XCircle size={18} /> <span className="uppercase text-xs tracking-wider">Limited / No</span>
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 font-bold bg-gray-50 dark:bg-slate-900/30">Top Specialities</td>
                                {compareData.map(h => {
                                    const specs = Array.isArray(h.specialities) ? h.specialities : 
                                                  Array.isArray(h.specialties) ? h.specialties : 
                                                  (h.specialization ? h.specialization.split(',') : []);
                                    return (
                                        <td key={h.id} className="p-6 border-r last:border-r-0 border-gray-100 dark:border-slate-800">
                                            <div className="flex flex-wrap gap-1.5">
                                                {specs.slice(0, 4).map((spec, i) => (
                                                    <span key={i} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider rounded-md border border-indigo-100 dark:border-indigo-800/50">
                                                        {spec.trim()}
                                                    </span>
                                                ))}
                                                {specs.length > 4 && <span className="text-[10px] text-gray-400 font-bold px-1 py-1">+{specs.length - 4} more</span>}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>

                            {/* FINANCIALS */}
                            <tr className="bg-gray-50 dark:bg-slate-900/50">
                                <td colSpan={compareData.length + 1} className="py-3 px-6 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">3. Financials & Insurance</td>
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 font-bold bg-gray-50 dark:bg-slate-900/30">Consultation Fee</td>
                                {compareData.map(h => (
                                    <td key={h.id} className="p-6 border-r last:border-r-0 border-gray-100 dark:border-slate-800">
                                        <div className="flex items-center gap-1.5 text-lg font-black text-gray-900 dark:text-slate-100">
                                            <IndianRupee size={20} className="text-gray-400" />
                                            {h.consultation_fee_range ? (
                                                typeof h.consultation_fee_range === 'object'
                                                    ? `${h.consultation_fee_range.min} - ${h.consultation_fee_range.max}`
                                                    : h.consultation_fee_range
                                            ) : (h.consultationFee || 'Not Disclosed')}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 font-bold bg-gray-50 dark:bg-slate-900/30">Est. Procedure Budget</td>
                                {compareData.map(h => (
                                    <td key={h.id} className="p-6 border-r last:border-r-0 border-gray-100 dark:border-slate-800">
                                        {h.budget_range ? (
                                            <div className="inline-flex items-center gap-2 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 px-3 py-1.5 rounded-xl text-orange-700 dark:text-orange-400 font-black">
                                                {formatCurrency(h.budget_range.min)} - {formatCurrency(h.budget_range.max)}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic text-sm">Varies by procedure</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-6 border-r border-gray-100 dark:border-slate-800 text-gray-600 dark:text-slate-400 font-bold bg-gray-50 dark:bg-slate-900/30">Insurance Cashless</td>
                                {compareData.map(h => {
                                    const ins = h.insurance_accepted || h.insurance || [];
                                    const insArray = Array.isArray(ins) ? ins : [ins];
                                    return (
                                        <td key={h.id} className="p-6 border-r last:border-r-0 border-gray-100 dark:border-slate-800">
                                            {insArray.length > 0 ? (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {insArray.slice(0, 3).map((provider, i) => (
                                                        <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider rounded-md border border-blue-100 dark:border-blue-800/50">
                                                            {provider}
                                                        </span>
                                                    ))}
                                                    {insArray.length > 3 && <span className="text-[10px] text-gray-400 font-bold px-1 py-1">+{insArray.length - 3} more</span>}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic text-sm">Not Listed</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Compare;
