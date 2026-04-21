import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Activity, Thermometer, Brain, HeartPulse, Bone, Eye, Info, AlertTriangle, ArrowRight } from 'lucide-react';
import { useUserLocation } from '../context/UserLocationContext';

const SYMPTOMS = [
    { id: 'chest', label: 'Chest Pain / Heart', icon: HeartPulse, query: 'chest pain' },
    { id: 'bones', label: 'Joint / Bone Pain', icon: Bone, query: 'bone' },
    { id: 'fever', label: 'Persistent Fever', icon: Thermometer, query: 'fever' },
    { id: 'stomach', label: 'Stomach / Digestion', icon: Activity, query: 'stomach' },
    { id: 'mental', label: 'Mental Health', icon: Brain, query: 'mental' },
    { id: 'eye', label: 'Vision / Eye Issue', icon: Eye, query: 'vision' },
];

const TriageAssistant = ({ onComplete }) => {
    const { emergencyMode, toggleEmergencyMode } = useUserLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0); 
    const [selectedSymptom, setSelectedSymptom] = useState(null);
    const [severity, setSeverity] = useState(null);

    const handleOpen = () => {
        setIsOpen(true);
        setStep(1);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setStep(0);
            setSelectedSymptom(null);
            setSeverity(null);
        }, 300);
    };

    const handleSymptomSelect = (symptom) => {
        setSelectedSymptom(symptom);
        setStep(2);
    };

    const handleSeveritySelect = (level) => {
        setSeverity(level);
        if (level >= 4) {
            setStep(3); // Emergency recommendation
        } else {
            finishTriage(level);
        }
    };

    const finishTriage = (sevLevel, overrideEmergency = false) => {
        const isEmergency = overrideEmergency || sevLevel >= 4;
        
        if (isEmergency && !emergencyMode) {
            toggleEmergencyMode(true);
        }

        onComplete({ 
            query: selectedSymptom.query, 
            isEmergency: isEmergency 
        });
        
        handleClose();
    };

    return (
        <>
            {/* Floating Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={handleOpen}
                        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-2xl shadow-blue-600/30 border-4 border-white dark:border-slate-800 transition-colors group"
                    >
                        <Bot size={32} className="group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-10 right-0 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-xl text-xs font-black shadow-lg uppercase tracking-widest border border-gray-100 dark:border-slate-700 w-max origin-bottom-right scale-0 group-hover:scale-100 transition-transform">
                            MediQ Triage
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 w-[calc(100vw-3rem)] sm:w-[400px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-blue-600 dark:bg-blue-800 p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-white">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-lg leading-none mb-1 text-white">MediQ AI</h3>
                                    <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Symptom Triage</p>
                                </div>
                            </div>
                            <button 
                                onClick={handleClose}
                                className="text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h4 className="text-xl font-black text-gray-900 dark:text-slate-100 mb-2">What brings you here?</h4>
                                        <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-6">Select the primary issue to quickly find the right specialist.</p>
                                        
                                        <div className="grid grid-cols-2 gap-3">
                                            {SYMPTOMS.map(sym => (
                                                <button
                                                    key={sym.id}
                                                    onClick={() => handleSymptomSelect(sym)}
                                                    className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-slate-300 transition-all border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                                                >
                                                    <sym.icon size={28} className="mb-1 opacity-80" />
                                                    <span className="text-xs font-bold text-center leading-tight">{sym.label}</span>
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => finishTriage(1)} // Skip severity if 'Other'
                                                className="col-span-2 mt-2 p-3 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                            >
                                                Other / Type manually <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <button 
                                            onClick={() => setStep(1)}
                                            className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-1 hover:underline"
                                        >
                                            ← Back
                                        </button>
                                        <h4 className="text-xl font-black text-gray-900 dark:text-slate-100 mb-2">How severe is it?</h4>
                                        <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mb-8">On a scale of 1 to 5, how much is this affecting you right now?</p>
                                        
                                        <div className="flex justify-between items-end px-2 mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Mild</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Severe</span>
                                        </div>
                                        <div className="flex justify-between gap-2">
                                            {[1, 2, 3, 4, 5].map(level => (
                                                <button
                                                    key={level}
                                                    onClick={() => handleSeveritySelect(level)}
                                                    className={`w-12 h-14 rounded-xl flex items-center justify-center text-lg font-black transition-all ${
                                                        level >= 4 
                                                            ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200' 
                                                            : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white border border-transparent'
                                                    }`}
                                                >
                                                    {level}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="text-center py-4"
                                    >
                                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <AlertTriangle size={32} />
                                        </div>
                                        <h4 className="text-xl font-black text-red-600 dark:text-red-400 mb-3">High Severity Detected</h4>
                                        <p className="text-sm text-gray-600 dark:text-slate-300 font-medium mb-8 leading-relaxed">
                                            Based on your rating, we recommend enabling <strong className="text-gray-900 dark:text-white">Emergency Mode</strong> to immediately locate the nearest 24/7 trauma centers.
                                        </p>
                                        
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => finishTriage(severity, true)}
                                                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-red-600/30 transition-all active:scale-95"
                                            >
                                                Activate Emergency Mode
                                            </button>
                                            <button
                                                onClick={() => finishTriage(severity, false)}
                                                className="w-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all"
                                            >
                                                Proceed Normally
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TriageAssistant;
