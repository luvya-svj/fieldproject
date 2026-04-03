import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Loader2, PlayCircle, ShieldCheck, Activity } from 'lucide-react';
import MapEmbed from './MapEmbed';
import { useUserLocation } from '../context/UserLocationContext';

const Hero = () => {
    const navigate = useNavigate();
    const { location, loading: locationLoading, emergencyMode } = useUserLocation();
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Any',
        symptoms: '',
        distance: '5'
    });

    useEffect(() => {
        // Add progress animation
        const styleId = 'hero-animations-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
                .animate-progress {
                    animation: progress 2s infinite ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/search', { state: { searchParams: formData } });
    };

    return (
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden transition-colors duration-500 bg-white dark:bg-slate-950">
            {/* Dynamic Background */}
            <div className={`absolute inset-0 -z-10 transition-opacity duration-700 ${emergencyMode
                ? 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-50 dark:from-red-950/20 via-white dark:via-slate-950 to-white dark:to-slate-950'
                : 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 dark:from-blue-900/10 via-white dark:via-slate-950 to-white dark:to-slate-950'
                }`}></div>

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-8 animate-in slide-in-from-left-8 duration-700">
                    <div className="flex items-center gap-2">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${emergencyMode ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                            }`}>
                            Trusted by 10k+ Patients
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 dark:text-slate-50 leading-[0.95]">
                        The Smart Way <br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${emergencyMode ? 'from-red-600 to-orange-600' : 'from-blue-600 to-indigo-600'
                            }`}>to Find Care.</span>
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                        Real-time GPS matching for hospitals and specialists. Get instant wait-times, transparent pricing, and direct routing.
                    </p>

                    <form className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-slate-800 mt-2 relative overflow-hidden group" onSubmit={handleSubmit}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-focus-within:bg-blue-500/10 transition-all"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Patient Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="e.g. 28"
                                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-gray-900 dark:text-slate-100"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Radius (KM)</label>
                                <select
                                    name="distance"
                                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-gray-900 dark:text-slate-100 appearance-none cursor-pointer"
                                    value={formData.distance}
                                    onChange={handleChange}
                                >
                                    <option value="2">Within 2 km</option>
                                    <option value="5">Within 5 km</option>
                                    <option value="10">Within 10 km</option>
                                    <option value="25">City Wide (25km)</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest ml-1">Symptoms or Speciality</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="symptoms"
                                        placeholder="Heart pain, Fever, Dentist..."
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-gray-900 dark:text-slate-100"
                                        value={formData.symptoms}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="absolute right-4 top-4 text-blue-500">
                                        <Activity size={20} className="animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`w-full flex items-center justify-center gap-3 py-5 rounded-[1.25rem] text-lg font-black uppercase tracking-widest text-white transition-all shadow-xl active:scale-[0.97] ${emergencyMode ? 'bg-red-600 shadow-red-600/30' : 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-700'
                                }`}
                        >
                            <Search size={22} strokeWidth={3} /> Search Network
                        </button>
                    </form>

                    <div className="flex items-center gap-6 mt-2">
                        <div className="flex -space-x-3">
                            {[
                                "https://images.unsplash.com/photo-1622253692010-33162a63273e", // Male Doctor/User
                                "https://images.unsplash.com/photo-1594824476967-48c8b964273f", // Female Doctor/User
                                "https://images.unsplash.com/photo-1544005313-94ddf0286df2", // Professional Person 1
                                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"  // Professional Person 2
                            ].map((url, i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-gray-200 overflow-hidden">
                                    <img src={`${url}?auto=format&fit=crop&q=80&w=100&h=100`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-gray-500 dark:text-slate-400">
                            Join <span className="text-gray-900 dark:text-slate-100">1,200+</span> people searching today
                        </p>
                    </div>
                </div>

                <div className="relative hidden lg:block">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-[3rem] blur-2xl"></div>
                    <div className="relative w-full h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900 transition-all duration-700 hover:scale-[1.02] bg-gray-100 dark:bg-slate-800">
                        {locationLoading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-blue-600">
                                <div className="relative">
                                    <Loader2 className="animate-spin" size={64} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <MapPin size={24} />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <span className="block font-black text-2xl tracking-tighter text-gray-900 dark:text-slate-100 mb-1">Locating You</span>
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Syncing GPS...</span>
                                </div>
                            </div>
                        ) : (
                            <MapEmbed
                                address="Mumbai, Maharashtra, India"
                                coordinates={location ? { lat: location.lat, lon: location.lon } : null}
                                height="100%"
                            />
                        )}

                        {/* Interactive UI Overlays */}
                        <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-slate-800 shadow-2xl animate-in slide-in-from-bottom-8 duration-1000 delay-500">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-500/20">
                                        <PlayCircle size={28} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-gray-900 dark:text-slate-100 uppercase tracking-tight">Interactive Map</h4>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real-time hospital geofencing</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-xs font-black text-blue-600 uppercase tracking-widest">Active</div>
                                    <div className="w-16 h-1 bg-blue-600/20 rounded-full mt-1 overflow-hidden">
                                        <div className="w-1/2 h-full bg-blue-600 animate-progress"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
