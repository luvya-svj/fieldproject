import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ListingCard from '../components/ListingCard';
import DoctorCard from '../components/DoctorCard';
import { ListingCardSkeleton } from '../components/Skeleton';
import { useHospitals } from '../hooks/useHospitals';
import { getAllDoctors } from '../utils/doctorUtils';
import { Filter, Siren, Search as SearchIcon, X, Map as MapIcon, IndianRupee, Hospital, Stethoscope, Scale } from 'lucide-react';
import { useUserLocation } from '../context/UserLocationContext';

const TABS = [
    { id: 'hospitals', label: 'Hospitals', icon: Hospital },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
];

const Search = () => {
    const { emergencyMode } = useUserLocation();
    const locationState = useLocation();
    const searchParams = locationState.state?.searchParams;

    const [activeTab, setActiveTab] = useState(
        locationState.search?.includes('tab=doctors') ? 'doctors' : 'hospitals'
    );
    const [sortBy, setSortBy] = useState('rating');
    const [selectedInsurance, setSelectedInsurance] = useState('All');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
    const [priceRange, setPriceRange] = useState('All');
    const [budgetRange, setBudgetRange] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [compareList, setCompareList] = useState([]);

    const { hospitals, loading } = useHospitals();
    const allDoctors = useMemo(() => getAllDoctors(), []);

    React.useEffect(() => {
        if (searchParams?.symptoms) {
            setSearchQuery(searchParams.symptoms);
        }
    }, [searchParams]);

    // Data lists for filters
    const insuranceProviders = ["All", "Apollo Munich", "ICICI Lombard", "HDFC ERGO", "Star Health", "Max Bupa", "Niva Bupa"];
    const neighborhoods = ["All", "Bandra West", "Colaba", "Andheri West", "Parel", "Worli", "Powai", "Juhu", "Chembur", "Mulund West", "Mahim", "Andheri East"];
    const priceRanges = [
        { label: "All", value: "All" },
        { label: "< ₹1k", value: "budget" },
        { label: "₹1k - ₹2k", value: "standard" },
        { label: "> ₹2k", value: "premium" }
    ];

    const procedureBudgetRanges = [
        { label: "All", value: "All" },
        { label: "< ₹50k", value: "budget" },
        { label: "₹50k - ₹1L", value: "standard" },
        { label: "> ₹1L", value: "premium" }
    ];

    // Medical keyword mapping
    const medicalDictionary = {
        'cataract': 'Ophthalmology', 'glaucoma': 'Ophthalmology', 'vision': 'Ophthalmology', 'eye': 'Ophthalmology', 'retina': 'Ophthalmology',
        'heart': 'Cardiology', 'chest pain': 'Cardiology', 'cardiac': 'Cardiology', 'bp': 'Cardiology', 'hypertension': 'Cardiology', 'angioplasty': 'Cardiology',
        'bone': 'Orthopaedics', 'fracture': 'Orthopaedics', 'back pain': 'Orthopaedics', 'knee': 'Orthopaedics', 'ortho': 'Orthopaedics', 'spine': 'Orthopaedics', 'joint': 'Orthopaedics', 'arthritis': 'Orthopaedics',
        'stomach': 'Gastroenterology', 'gastro': 'Gastroenterology', 'digestion': 'Gastroenterology', 'liver': 'Gastroenterology', 'jaundice': 'Gastroenterology', 'hernia': 'General Surgery',
        'brain': 'Neurology', 'nerve': 'Neurology', 'stroke': 'Neurology', 'paralysis': 'Neurology', 'migraine': 'Neurology', 'headache': 'Neurology',
        'diabetes': 'Diabetologist', 'sugar': 'Diabetologist', 'thyroid': 'Endocrinology', 'hormone': 'Endocrinology',
        'kidney': 'Nephrology', 'dialysis': 'Nephrology', 'urine': 'Urology', 'prostate': 'Urology', 'stone': 'Urology',
        'cancer': 'Oncology', 'tumor': 'Oncology', 'chemo': 'Oncology', 'radiation': 'Oncology',
        'asthma': 'Pulmonology', 'lungs': 'Pulmonology', 'breathing': 'Pulmonology', 'tb': 'Pulmonology', 'cough': 'General Medicine',
        'pregnant': 'Gynaecology', 'pregnancy': 'Gynaecology', 'women': 'Gynaecology', 'period': 'Gynaecology', 'maternity': 'Gynaecology',
        'child': 'Pediatrics', 'baby': 'Pediatrics', 'kid': 'Pediatrics', 'vaccination': 'Pediatrics',
        'skin': 'Dermatology', 'rash': 'Dermatology', 'acne': 'Dermatology', 'hair': 'Dermatology',
        'ear': 'ENT', 'nose': 'ENT', 'throat': 'ENT', 'sinus': 'ENT',
        'tooth': 'Dentist', 'dental': 'Dentist', 'cavity': 'Dentist',
        'fever': 'General Medicine', 'cold': 'General Medicine', 'infection': 'General Medicine', 'flu': 'General Medicine',
        'surgery': 'General Surgery', 'operation': 'General Surgery',
        'mental': 'Psychiatry', 'depression': 'Psychiatry', 'anxiety': 'Psychiatry',
    };

    const findMatch = Object.keys(medicalDictionary).find(key => searchQuery.toLowerCase().includes(key));
    const suggestedSpecialty = findMatch ? medicalDictionary[findMatch] : null;

    const handleCompareToggle = (id) => {
        setCompareList(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            }
            if (prev.length >= 3) {
                alert('You can only compare up to 3 hospitals at a time.');
                return prev;
            }
            return [...prev, id];
        });
    };

    const handleResetFilters = () => {
        setSelectedInsurance('All');
        setSelectedNeighborhood('All');
        setPriceRange('All');
        setBudgetRange('All');
        setSearchQuery('');
        setSortBy('rating');
    };

    // ── Hospital filter logic ──────────────────────────────────
    const filteredHospitals = useMemo(() => {
        let data = hospitals;

        if (searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase().trim();
            data = data.filter(item => {
                const profileText = [
                    item.name, item.type, item.neighborhood, item.address, item.specialization,
                    ...(item.specialities || item.specialties || []),
                    ...(item.departments || []),
                    ...(item.doctors || []).map(doc => `${doc.name} ${doc.specialization} ${doc.title}`)
                ].join(' ').toLowerCase();

                if (profileText.includes(query)) return true;
                if (suggestedSpecialty && profileText.includes(suggestedSpecialty.toLowerCase())) return true;

                const queryTokens = query.split(/\s+/).filter(Boolean);
                return queryTokens.every(token => {
                    if (profileText.includes(token)) return true;
                    const mapped = Object.entries(medicalDictionary)
                        .filter(([kw]) => kw === token || (token.length > 3 && (token.includes(kw) || kw.includes(token))))
                        .map(([, spec]) => spec.toLowerCase());
                    return mapped.some(spec => profileText.includes(spec));
                });
            });
        }

        if (selectedInsurance !== 'All') {
            data = data.filter(item => {
                const ins = item.insurance || item.insurance_accepted;
                return Array.isArray(ins) && ins.includes(selectedInsurance);
            });
        }

        if (selectedNeighborhood !== 'All') {
            data = data.filter(item =>
                item.neighborhood === selectedNeighborhood ||
                (item.address && item.address.toLowerCase().includes(selectedNeighborhood.toLowerCase()))
            );
        }

        if (priceRange !== 'All') {
            data = data.filter(item => {
                let feeMin, feeMax;
                if (item.consultation_fee_range && typeof item.consultation_fee_range === 'object') {
                    feeMin = item.consultation_fee_range.min;
                    feeMax = item.consultation_fee_range.max;
                } else {
                    const fee = item.consultationFee;
                    if (fee == null) return false;
                    feeMin = feeMax = fee;
                }
                if (priceRange === 'budget') return feeMin <= 1000;
                if (priceRange === 'standard') return (feeMin > 1000 && feeMin <= 2000) || (feeMax > 1000 && feeMax <= 2000);
                if (priceRange === 'premium') return feeMax > 2000;
                return true;
            });
        }

        if (budgetRange !== 'All') {
            data = data.filter(item => {
                if (!item.budget_range) return true;
                const mn = item.budget_range.min || 0;
                const mx = item.budget_range.max || 9999999;
                if (budgetRange === 'budget') return mn < 50000;
                if (budgetRange === 'standard') return (mn >= 50000 && mn <= 100000) || (mx >= 50000 && mx <= 100000);
                if (budgetRange === 'premium') return mx > 100000;
                return true;
            });
        }

        if (emergencyMode) {
            data = data.filter(item => item.emergency || item.type?.toLowerCase().includes('hospital'));
        }

        return [...data].sort((a, b) => {
            if (emergencyMode) {
                if (a.emergency && !b.emergency) return -1;
                if (!a.emergency && b.emergency) return 1;
            }
            return (b.rating || 0) - (a.rating || 0);
        });
    }, [hospitals, selectedInsurance, selectedNeighborhood, priceRange, budgetRange, searchQuery, emergencyMode, suggestedSpecialty]);

    // ── Doctor filter logic ────────────────────────────────────
    const filteredDoctors = useMemo(() => {
        let data = allDoctors;

        if (searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase().trim();
            data = data.filter(doc => {
                const text = [
                    doc.name, doc.title, doc.specialization, doc.qualifications,
                    doc.hospitalName, doc.hospitalNeighborhood
                ].join(' ').toLowerCase();
                if (text.includes(query)) return true;
                if (suggestedSpecialty && text.includes(suggestedSpecialty.toLowerCase())) return true;
                return false;
            });
        }

        if (selectedNeighborhood !== 'All') {
            data = data.filter(doc =>
                doc.hospitalNeighborhood?.toLowerCase() === selectedNeighborhood.toLowerCase()
            );
        }

        if (priceRange !== 'All') {
            data = data.filter(doc => {
                const fee = doc.consultation_fee;
                if (priceRange === 'budget') return fee <= 1000;
                if (priceRange === 'standard') return fee > 1000 && fee <= 2000;
                if (priceRange === 'premium') return fee > 2000;
                return true;
            });
        }

        return [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }, [allDoctors, searchQuery, selectedNeighborhood, priceRange, suggestedSpecialty]);

    const resultsCount = activeTab === 'hospitals' ? filteredHospitals.length : filteredDoctors.length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500"
        >
            {/* Header */}
            <div className={`pt-12 pb-12 transition-colors duration-500 ${emergencyMode ? 'bg-red-600 text-white shadow-xl' : 'bg-blue-600 text-white shadow-lg'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-2 flex items-center gap-3 tracking-tighter">
                                {emergencyMode && <Siren className="animate-pulse" size={40} />}
                                {emergencyMode ? 'EMERGENCY LOCATOR' : 'FIND CARE'}
                            </h1>
                            <p className={`text-lg font-bold opacity-90 ${emergencyMode ? 'text-red-100' : 'text-blue-100'}`}>
                                {emergencyMode ? 'Trauma centers and emergency response hubs' : 'Hospitals, Specialists & Doctors in Mumbai'}
                            </p>
                        </div>

                        <div className="relative w-full max-w-xl group">
                            <input
                                type="text"
                                placeholder={activeTab === 'doctors' ? "Search by doctor name, specialization..." : "Search symptoms, hospitals, specialized care..."}
                                className="w-full h-16 pl-14 pr-12 rounded-2xl bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-bold text-lg shadow-2xl focus:ring-4 focus:ring-white/30 outline-none transition-all border-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <SearchIcon className="absolute left-5 top-5 text-gray-400 dark:text-slate-500 group-focus-within:text-white dark:group-focus-within:text-blue-400 transition-colors" size={24} />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-5 top-5 text-gray-400 hover:text-gray-600">
                                    <X size={24} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* AI Suggestion */}
                    <AnimatePresence>
                        {suggestedSpecialty && searchQuery.length > 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                                    MediQ AI
                                </div>
                                <span className="text-base font-bold text-white">
                                    You might need a: <span className="underline decoration-4 underline-offset-8 decoration-white/40">{suggestedSpecialty}</span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tabs */}
                    {!emergencyMode && (
                        <div className="flex gap-2">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${
                                        activeTab === tab.id
                                            ? 'bg-white text-blue-600 shadow-lg'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                    }`}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 grid lg:grid-cols-4 gap-8">
                {/* Filter Sidebar */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm sticky top-28 space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-black text-gray-900 dark:text-gray-100">Filters</h2>
                            <button onClick={handleResetFilters} className="text-xs font-bold text-blue-600 hover:text-blue-700 underline">
                                Reset All
                            </button>
                        </div>

                        {/* Neighborhood */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                    <MapIcon size={18} />
                                </div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Neighborhood</h3>
                            </div>
                            <select
                                value={selectedNeighborhood}
                                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>

                        {/* Consultation Fee */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center">
                                    <IndianRupee size={18} />
                                </div>
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Consultation Fee</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {priceRanges.map(range => (
                                    <button
                                        key={range.value}
                                        onClick={() => setPriceRange(range.value)}
                                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${priceRange === range.value
                                            ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                                            : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200'}`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Procedure Budget — only shown for hospitals */}
                        {activeTab === 'hospitals' && (
                            <>
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                            <IndianRupee size={18} />
                                        </div>
                                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Procedure Budget</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {procedureBudgetRanges.map(range => (
                                            <button
                                                key={range.value}
                                                onClick={() => setBudgetRange(range.value)}
                                                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${budgetRange === range.value
                                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'
                                                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200'}`}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                            <Filter size={18} />
                                        </div>
                                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Insurance</h3>
                                    </div>
                                    <div className="space-y-1">
                                        {insuranceProviders.map(provider => (
                                            <button
                                                key={provider}
                                                onClick={() => setSelectedInsurance(provider)}
                                                className={`w-full text-left px-4 py-2 text-sm font-bold rounded-xl transition-all ${selectedInsurance === provider
                                                    ? 'bg-blue-600 text-white'
                                                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                                            >
                                                {provider}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-3">
                    {/* Controls Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-2 pl-4">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <Filter size={18} />
                            </div>
                            <span className="text-sm font-bold text-gray-700 dark:text-slate-300 uppercase tracking-tight">
                                {resultsCount} {activeTab === 'doctors' ? 'Doctors' : 'Hospitals'} Found
                            </span>
                        </div>

                        <div className="flex items-center gap-4 px-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort by</span>
                            <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
                                {['rating'].map(sort => (
                                    <button
                                        key={sort}
                                        onClick={() => setSortBy(sort)}
                                        className={`px-5 py-2 rounded-lg text-xs font-black capitalize transition-all ${sortBy === sort ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-md' : 'text-gray-500 dark:text-slate-400'}`}
                                    >
                                        {sort}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hospital Results */}
                    {activeTab === 'hospitals' && (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <AnimatePresence mode="popLayout">
                                {loading ? (
                                    [1, 2, 4, 5, 6, 7].map(i => <ListingCardSkeleton key={i} />)
                                ) : filteredHospitals.length > 0 ? (
                                    filteredHospitals.map(item => (
                                        <motion.div
                                            key={`${item.name}-${item.id}`}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ListingCard 
                                                data={item} 
                                                type="hospital" 
                                                isCompared={compareList.includes(item.id)}
                                                onCompareToggle={handleCompareToggle}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-32 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800"
                                    >
                                        <SearchIcon className="mx-auto text-gray-300 dark:text-slate-700 mb-4" size={48} />
                                        <h3 className="text-xl font-black text-gray-900 dark:text-slate-50 mb-1">No matching hospitals</h3>
                                        <p className="text-gray-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Try adjusting your filters</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Doctor Results */}
                    {activeTab === 'doctors' && (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredDoctors.length > 0 ? (
                                    filteredDoctors.map(doc => (
                                        <motion.div
                                            key={doc.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <DoctorCard doctor={doc} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full py-32 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-800"
                                    >
                                        <SearchIcon className="mx-auto text-gray-300 dark:text-slate-700 mb-4" size={48} />
                                        <h3 className="text-xl font-black text-gray-900 dark:text-slate-50 mb-1">No matching doctors</h3>
                                        <p className="text-gray-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Try a different name or specialization</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Floating Compare Action Bar */}
            <AnimatePresence>
                {compareList.length > 0 && activeTab === 'hospitals' && !emergencyMode && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
                    >
                        <div className="container mx-auto max-w-3xl pointer-events-auto">
                            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.4)] border border-gray-200 dark:border-slate-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                        <Scale size={24} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Compare Feature</div>
                                        <div className="font-extrabold text-gray-900 dark:text-slate-100 text-lg leading-tight">{compareList.length} / 3 Selected</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <button 
                                        onClick={() => setCompareList([])}
                                        className="px-4 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 uppercase tracking-wider transition-colors"
                                    >
                                        Clear
                                    </button>
                                    <Link
                                        to={`/compare?ids=${compareList.join(',')}`}
                                        className={`px-8 py-3.5 rounded-xl text-white font-black text-sm uppercase tracking-widest transition-all shadow-lg flex-grow sm:flex-grow-0 text-center ${
                                            compareList.length > 1 
                                                ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30' 
                                                : 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                        }`}
                                        onClick={(e) => compareList.length <= 1 && e.preventDefault()}
                                    >
                                        {compareList.length > 1 ? 'Compare Now' : 'Select 1 More'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Search;
