import React from 'react';
import { Shield, FileText, CheckCircle, ArrowRight, HelpCircle, BriefcaseMedical } from 'lucide-react';
import { useUserLocation } from '../context/UserLocationContext';

const Insurance = () => {
    const { emergencyMode } = useUserLocation();

    const insuranceProcess = [
        {
            id: 1,
            title: "Check Eligibility",
            desc: "Verify if your treatment is covered under \"Cashless\" or \"Reimbursement\" by your provider.",
            icon: <Shield className="text-blue-600 dark:text-blue-400" />
        },
        {
            id: 2,
            title: "Document Collection",
            desc: "Gather initial reports, ID proof, and policy card. For reimbursement, collect all original bills.",
            icon: <FileText className="text-blue-600 dark:text-blue-400" />
        },
        {
            id: 3,
            title: "File Claim",
            desc: "Submit documents at the hospital TPA desk (Cashless) or upload via our premium portal.",
            icon: <CheckCircle className="text-blue-600 dark:text-blue-400" />
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-20 transition-colors duration-500">
            {/* Premium Header */}
            <div className={`pt-16 pb-24 transition-all duration-500 ${emergencyMode ? 'bg-red-600' : 'bg-blue-600'} text-white relative overflow-hidden shadow-2xl`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                                <BriefcaseMedical size={40} />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 italic">Cashless Support</h1>
                                <p className="text-lg font-bold opacity-80 uppercase tracking-widest text-xs">Claims & Insurance Network</p>
                            </div>
                        </div>
                        <p className="text-xl md:text-2xl font-bold max-w-2xl leading-relaxed opacity-90">
                            Navigate your medical coverage with transparency. We partner with top providers to ensure a seamless claim experience.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-12 relative z-10">
                {/* Process Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {insuranceProcess.map((step) => (
                        <div key={step.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                                    {step.icon}
                                </div>
                                <span className="text-4xl font-black text-gray-100 dark:text-slate-800">0{step.id}</span>
                            </div>
                            <h3 className="text-xl font-extrabold text-gray-900 dark:text-slate-50 mb-3">{step.title}</h3>
                            <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Detailed Info Sections */}
                <div className="grid lg:grid-cols-2 gap-12 mt-20">
                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600">
                                <CheckCircle size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-slate-50 tracking-tight">Cashless Benefits</h2>
                        </div>
                        <ul className="space-y-6">
                            {[
                                "Pre-authorization handled by our TPA desk directly.",
                                "Approval typically received within 4-6 business hours.",
                                "No upfront hospital payment for covered procedures.",
                                "Dedicated assistance for non-medical expense clearance."
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 group">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 group-hover:scale-150 transition-transform"></div>
                                    <p className="text-gray-600 dark:text-slate-400 font-bold">{item}</p>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-10 w-full py-4 bg-gray-50 dark:bg-slate-800 rounded-2xl text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all flex items-center justify-center gap-2">
                            Download Checklist <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600">
                                <FileText size={28} />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 dark:text-slate-50 tracking-tight">Reimbursement</h2>
                        </div>
                        <ul className="space-y-6">
                            {[
                                "Collect Discharge Summary and Final Bill at exit.",
                                "Ensure all Payment Receipts are original and stamped.",
                                "Submit digital copies via MediQ portal within 15 days.",
                                "Direct bank credit within 15-30 days after verification."
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 group">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 group-hover:scale-150 transition-transform"></div>
                                    <p className="text-gray-600 dark:text-slate-400 font-bold">{item}</p>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-10 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-600/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                            Initiate Claim <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-950">
                        <HelpCircle size={14} /> Support Center
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 dark:text-slate-50 tracking-tighter mb-4">Need immediate help?</h2>
                    <p className="text-gray-500 dark:text-slate-400 font-bold mb-10 max-w-xl mx-auto italic">
                        Our insurance experts are available 24/7 at hospital helpdesks to assist with your documentation and TPA approvals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] text-gray-900 dark:text-slate-100 font-black uppercase tracking-widest text-xs shadow-xl hover:shadow-2xl transition-all">
                            Call Expert
                        </button>
                        <button className={`px-10 py-5 ${emergencyMode ? 'bg-red-600' : 'bg-blue-600'} text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl hover:brightness-110 transition-all`}>
                            Live Chat Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insurance;
