import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ListingCard from '../components/ListingCard';
import { ListingCardSkeleton } from '../components/Skeleton';
import { useHospitals } from '../hooks/useHospitals';
import { Filter, Siren, Search as SearchIcon, X, Map as MapIcon, IndianRupee } from 'lucide-react';
import { useUserLocation } from '../context/UserLocationContext';

const Search = () => {
    const { emergencyMode } = useUserLocation();
    const [sortBy, setSortBy] = useState('rating'); // 'rating' or 'distance'
    const [selectedInsurance, setSelectedInsurance] = useState('All');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
    const [priceRange, setPriceRange] = useState('All');
    const [budgetRange, setBudgetRange] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const { hospitals, loading } = useHospitals();
    const location = useLocation();
    const searchParams = location.state?.searchParams;

    React.useEffect(() => {
        if (searchParams?.symptoms) {
            setSearchQuery(searchParams.symptoms);
        }
    }, [searchParams]);

    // Data lists for filters
    const insuranceProviders = ["All", "Apollo Munich", "ICICI Lombard", "HDFC ERGO", "Star Health", "Max Bupa", "Niva Bupa"];
    const neighborhoods = ["All", "Bandra West", "Colaba", "Andheri West", "Parel", "Worli", "Powai", "Juhu", "Chembur"];
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

    // Extended Medical Dictionary Mapping
    const medicalDictionary = {
        // Eye
        'cataract': 'Ophthalmology', 'glaucoma': 'Ophthalmology', 'vision': 'Ophthalmology', 'eye': 'Ophthalmology', 'retina': 'Ophthalmology', 'lasik': 'Ophthalmology', 'squint': 'Ophthalmology',
        // Heart
        'heart': 'Cardiology', 'chest pain': 'Cardiology', 'cardiac': 'Cardiology', 'bp': 'Cardiology', 'hypertension': 'Cardiology', 'cholesterol': 'Cardiology', 'ecg': 'Cardiology', 'angioplasty': 'Cardiology',
        // Ortho
        'bone': 'Orthopaedics', 'fracture': 'Orthopaedics', 'back pain': 'Orthopaedics', 'knee': 'Orthopaedics', 'ortho': 'Orthopaedics', 'spine': 'Orthopaedics', 'joint': 'Orthopaedics', 'arthritis': 'Orthopaedics', 'physiotherapy': 'Physiotherapy',
        // Gastro
        'stomach': 'Gastroenterology', 'gastro': 'Gastroenterology', 'digestion': 'Gastroenterology', 'acidity': 'Gastroenterology', 'ulcer': 'Gastroenterology', 'liver': 'Gastroenterology', 'jaundice': 'Gastroenterology', 'hernia': 'General Surgery',
        // Neuro
        'brain': 'Neurology', 'nerve': 'Neurology', 'stroke': 'Neurology', 'paralysis': 'Neurology', 'migraine': 'Neurology', 'headache': 'Neurology', 'seizure': 'Neurology',
        // Endo / Diabetes
        'diabetes': 'Diabetologist', 'sugar': 'Diabetologist', 'thyroid': 'Endocrinology', 'hormone': 'Endocrinology', 'pcos': 'Endocrinology',
        // Renal / Uro
        'kidney': 'Nephrology', 'dialysis': 'Nephrology', 'urine': 'Urology', 'prostate': 'Urology', 'stone': 'Urology', 'stones': 'Urology',
        // Oncology
        'cancer': 'Oncology', 'tumor': 'Oncology', 'chemo': 'Oncology', 'radiation': 'Oncology',
        // Respiratory
        'asthma': 'Pulmonology', 'lungs': 'Pulmonology', 'breathing': 'Pulmonology', 'tb': 'Pulmonology', 'tuberculosis': 'Pulmonology', 'cough': 'General Medicine',
        // Gynecology & Obstetrics
        'pregnant': 'Gynaecology', 'pregnancy': 'Gynaecology', 'women': 'Gynaecology', 'period': 'Gynaecology', 'menstrual': 'Gynaecology', 'ivf': 'Gynaecology', 'maternity': 'Gynaecology',
        // Pediatrics
        'child': 'Pediatrics', 'baby': 'Pediatrics', 'kid': 'Pediatrics', 'vaccination': 'Pediatrics', 'neonatal': 'Pediatrics',
        // Dermatology
        'skin': 'Dermatology', 'rash': 'Dermatology', 'acne': 'Dermatology', 'hair': 'Dermatology', 'eczema': 'Dermatology', 'psoriasis': 'Dermatology',
        // ENT
        'ear': 'ENT', 'nose': 'ENT', 'throat': 'ENT', 'sinus': 'ENT', 'hearing': 'ENT',
        // Dental
        'tooth': 'Dentist', 'dental': 'Dentist', 'cavity': 'Dentist', 'root canal': 'Dentist', 'braces': 'Dentist',
        // General
        'fever': 'General Medicine', 'cold': 'General Medicine', 'infection': 'General Medicine', 'flu': 'General Medicine', 'viral': 'General Medicine', 'malaria': 'General Medicine', 'dengue': 'General Medicine', 'typhoid': 'General Medicine',
        'surgery': 'General Surgery', 'operation': 'General Surgery', 'appendix': 'General Surgery', 'gallbladder': 'General Surgery',
        'mental': 'Psychiatry', 'depression': 'Psychiatry', 'anxiety': 'Psychiatry', 'stress': 'Psychiatry'
    };

    // Find specialty match for the search query to show in UI
    const findMatch = Object.keys(medicalDictionary).find(key => searchQuery.toLowerCase().includes(key));
    const suggestedSpecialtyFromSearch = findMatch ? medicalDictionary[findMatch] : null;

    const handleResetFilters = () => {
        setSelectedInsurance('All');
        setSelectedNeighborhood('All');
        setPriceRange('All');
        setBudgetRange('All');
        setSearchQuery('');
        setSortBy('rating');
    };

    // Filter Logic
    const filteredData = useMemo(() => {
        let data = hospitals;

        if (searchQuery.trim().length > 0) {
            const query = searchQuery.toLowerCase().trim();
            
            data = data.filter(item => {
                // Flatten all hospital info into a searchable text block
                const profileText = [
                    item.name,
                    item.type,
                    item.neighborhood,
                    item.address,
                    item.specialization,
                    ...(item.specialities || item.specialties || []),
                    ...(item.departments || []),
                    ...(item.doctors || []).map(doc => `${doc.name} ${doc.specialization} ${doc.title}`)
                ].join(" ").toLowerCase();

                // 1. Direct match for the whole query
                if (profileText.includes(query)) return true;

                // 2. Match based on inferred specialty and remaining tokens
                if (suggestedSpecialtyFromSearch) {
                    const specMatchString = suggestedSpecialtyFromSearch.toLowerCase();
                    if (profileText.includes(specMatchString)) {
                        let remainderQuery = query;
                        const sortedKeywords = Object.keys(medicalDictionary).sort((a, b) => b.length - a.length);
                        
                        sortedKeywords.forEach(keyword => {
                            if (remainderQuery.includes(keyword)) {
                                remainderQuery = remainderQuery.replace(keyword, ' ');
                            }
                        });
                        
                        const remainingTokens = remainderQuery.split(/\s+/).filter(Boolean);
                        const matchesRemaining = remainingTokens.every(token => profileText.includes(token));
                        if (matchesRemaining) return true;
                    }
                }

                // 3. Fallback: Match EVERY token individually (either directly or via specialty mapping)
                const queryTokens = query.split(/\s+/).filter(Boolean);
                const matchesAllTokens = queryTokens.every(token => {
                    if (profileText.includes(token)) return true;
                    
                    const mappedSpecialties = Object.entries(medicalDictionary)
                        .filter(([keyword, spec]) => keyword === token || (token.length > 3 && (token.includes(keyword) || keyword.includes(token))))
                        .map(([kw, spec]) => spec.toLowerCase());
                    
                    return mappedSpecialties.some(spec => profileText.includes(spec));
                });
                
                return matchesAllTokens;
            });
        }

        // Insurance
        if (selectedInsurance !== 'All') {
            data = data.filter(item => {
                const itemInsurance = item.insurance || item.insurance_accepted;
                return Array.isArray(itemInsurance) && itemInsurance.includes(selectedInsurance);
            });
        }

        // Neighborhood
        if (selectedNeighborhood !== 'All') {
            data = data.filter(item =>
                item.neighborhood === selectedNeighborhood ||
                (item.address && item.address.toLowerCase().includes(selectedNeighborhood.toLowerCase()))
            );
        }

        // Price Range (Functional filtering based on consultation fees)
        if (priceRange !== 'All') {
            data = data.filter(item => {
                // Use refined consultation_fee_range if available, else fallback to consultationFee
                let feeMin, feeMax;
                if (item.consultation_fee_range && typeof item.consultation_fee_range === 'object') {
                    feeMin = item.consultation_fee_range.min;
                    feeMax = item.consultation_fee_range.max;
                } else {
                    const fee = item.consultationFee;
                    if (fee === undefined || fee === null) return false;
                    feeMin = fee;
                    feeMax = fee;
                }

                if (priceRange === 'budget') return feeMin <= 1000;
                if (priceRange === 'standard') return (feeMin > 1000 && feeMin <= 2000) || (feeMax > 1000 && feeMax <= 2000);
                if (priceRange === 'premium') return feeMax > 2000;
                return true;
            });
        }

        // Procedure Budget Range
        if (budgetRange !== 'All') {
            data = data.filter(item => {
                if (!item.budget_range) return true; // If no data, loosely keep it
                const avgMin = item.budget_range.min || 0;
                const avgMax = item.budget_range.max || 9999999;
                
                if (budgetRange === 'budget') return avgMin < 50000;
                if (budgetRange === 'standard') return (avgMin >= 50000 && avgMin <= 100000) || (avgMax >= 50000 && avgMax <= 100000);
                if (budgetRange === 'premium') return avgMax > 100000;
                return true;
            });
        }

        // Emergency Mode
        if (emergencyMode) {
            data = data.filter(item => item.emergency || item.type?.toLowerCase().includes('hospital'));
        }

        // Sorting
        return [...data].sort((a, b) => {
            if (emergencyMode) {
                if (a.emergency && !b.emergency) return -1;
                if (!a.emergency && b.emergency) return 1;
            }

            if (sortBy === 'distance') {
                return (a.distanceValue || 9999) - (b.distanceValue || 9999);
            }
            return (b.rating || 0) - (a.rating || 0);
        });
    }, [hospitals, selectedInsurance, selectedNeighborhood, priceRange, budgetRange, searchQuery, emergencyMode, sortBy, suggestedSpecialtyFromSearch]);

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
                                {emergencyMode ? 'Trauma centers and emergency response hubs' : 'Hospitals, Specialists, and Clinics'}
                            </p>
                        </div>

                        <div className="relative w-full max-w-xl group">
                            <input
                                type="text"
                                placeholder="Search symptoms, hospitals, specialized care..."
                                className="w-full h-16 pl-14 pr-12 rounded-2xl bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-bold text-lg shadow-2xl focus:ring-4 focus:ring-white/30 outline-none transition-all border-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <SearchIcon className="absolute left-5 top-5 text-gray-400 dark:text-slate-500 group-focus-within:text-white dark:group-focus-within:text-blue-400 transition-colors" size={24} />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={24} />
                                </button>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {suggestedSpecialtyFromSearch && searchQuery.length > 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-3"
                            >
                                <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                                    MediQ AI ADVICE
                                </div>
                                <span className="text-base font-bold text-white dark:text-slate-100">
                                    Based on symptoms, you might need a: <span className="underline decoration-4 underline-offset-8 decoration-white/40">{suggestedSpecialtyFromSearch}</span>
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 grid lg:grid-cols-4 gap-8">
                {/* Filter Sidebar */}
                <div className="hidden lg:block space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm sticky top-28 space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-black text-gray-900 dark:text-gray-100">Filters</h2>
                            <button
                                onClick={handleResetFilters}
                                className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Neighborhoods */}
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

                        {/* Price Range */}
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

                        {/* Procedure Budget */}
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

                        {/* Insurance Providers */}
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
                                            : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {provider}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    {/* Controls Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
                        <div className="flex items-center gap-2 pl-4">
                            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                <Filter size={18} />
                            </div>
                            <span className="text-sm font-bold text-gray-700 dark:text-slate-300 uppercase tracking-tight">Active Results</span>
                        </div>

                        <div className="flex items-center gap-4 px-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort by</span>
                            <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
                                {['rating', 'distance'].map(sort => (
                                    <button
                                        key={sort}
                                        onClick={() => setSortBy(sort)}
                                        className={`px-5 py-2 rounded-lg text-xs font-black capitalize transition-all ${sortBy === sort ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-md' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'}`}
                                    >
                                        {sort}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="mb-6 ml-2">
                        <p className="text-gray-500 font-bold">
                            Showing <span className="text-gray-900 dark:text-slate-100 font-black">{filteredData.length}</span> results
                        </p>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                [1, 2, 4, 5, 6, 7].map(i => <ListingCardSkeleton key={i} />)
                            ) : filteredData.length > 0 ? (
                                filteredData.map(item => (
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
                                    <h3 className="text-xl font-black text-gray-900 dark:text-slate-50 mb-1">No matching results</h3>
                                    <p className="text-gray-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Try adjusting your filters or search query</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Search;
