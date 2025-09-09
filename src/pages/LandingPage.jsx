import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptopCode, FaDatabase, FaBrain, FaCloud, FaShieldAlt } from 'react-icons/fa';
import { LuCamera } from "react-icons/lu";

const heroImage = "https://media.istockphoto.com/id/473326392/photo/video-security-camera-housing-mounted-high-on-college-campus.jpg?s=612x612&w=0&k=20&c=xbYdQkuvYWHZc1hc77j1EHz42GmfEKy6xuEhJnGVN-4=";

const LandingPage = () => {
    const features = [
        {
            icon: <FaShieldAlt />,
            title: "Real-time Video Analysis",
            description: "Analyze live video feeds for anomalies and trigger alerts instantly.",
            link: "/videoanalysis"
        },
        {
            icon: <FaLaptopCode />,
            title: "Review Existing Videos",
            description: "Upload and analyze stored surveillance footage for investigations.",
        },
        {
            icon: <FaDatabase />,
            title: "Context Alerts",
            description: "Receive alerts based on behavioral or contextual rule violations.",
        },
        {
            icon: <FaBrain />,
            title: "AI-Powered Assistant",
            description: "Ask contextual questions about footage using vision-language AI.",
        },
        {
            icon: <FaCloud />,
            title: "Intuitive Dashboard",
            description: "Easy-to-use UI presenting meaningful metrics & camera statuses.",
        },
        {
            icon: <FaShieldAlt />,
            title: "Footage Library",
            description: "Securely organize, tag, and retrieve footage anytime.",
        }
    ];

    const techStack = [
        { title: "Frontend", description: "React, Tailwind CSS, TypeScript, Chakra UI" },
        { title: "AI Processing", description: "Google Vision API, TensorFlow" },
        { title: "Real-time Updates", description: "Socket.IO" },
        { title: "Contextual Assistance", description: "Open Language Models" },
        { title: "Backend", description: "Node.js, Express" },
        { title: "Security", description: "OAuth2, RSA/AES Encryption" }
    ];

    return (
        <div className="text-white font-sans min-h-screen bg-slate-900">
            <header className="flex justify-between items-center p-6 bg-slate-900 fixed w-full z-50 shadow-md">
                <div className="text-2xl font-bold">CampusEye</div>
                <nav className="flex space-x-6 items-center">
                    <a href="#" className="hover:text-blue-400">Home</a>
                    <a href="#features" className="hover:text-blue-400">Features</a>
                    <a href="#dashboard" className="hover:text-blue-400">Dashboard</a>
                    <a href="#contact" className="hover:text-blue-400">Contact</a>
                </nav>
                <div className="flex space-x-4">
                    <Link to="/login">
                        <button className="bg-blue-600 py-2 px-4 rounded-full hover:bg-blue-700">Login</button>
                    </Link>
                    <Link to="/email-verification">
                        <button className="bg-blue-600 py-2 px-4 rounded-full hover:bg-blue-700">Sign Up</button>
                    </Link>
                </div>
            </header>

            <main className="pt-20">
                {/* Hero */}
                <section 
                    className="relative h-[600px] bg-cover bg-center flex flex-col items-center justify-center text-center p-4" 
                    style={{ backgroundImage: `url(${heroImage})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">CampusEye: Vigilance Beyond Sight</h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
                            A proactive AI-driven surveillance platform for smarter campus security.
                        </p>
                        <Link to="/email-verification">
                            <button className="bg-blue-600 hover:bg-blue-700 py-3 px-8 rounded-full transition-colors">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="py-20 px-4 max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <div key={i}>
                                {f.link ? (
                                    <Link to={f.link}>
                                        <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors shadow-md">
                                            <div className="text-blue-400 text-3xl mb-4">{f.icon}</div>
                                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                            <p className="text-gray-400">{f.description}</p>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="bg-slate-800 p-6 rounded-xl shadow-md hover:bg-slate-700">
                                        <div className="text-blue-400 text-3xl mb-4">{f.icon}</div>
                                        <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                                        <p className="text-gray-400">{f.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Dashboard */}
                <section id="dashboard" className="py-20 px-4 max-w-7xl mx-auto">
                    ...
                    {/* Keep your current dashboard section unchanged */}
                </section>

                {/* Tech Stack */}
                <section id="tech-stack" className="py-20 px-4 max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Tech Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {techStack.map((tech, index) => (
                            <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-lg hover:bg-slate-700 transition-colors">
                                <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                                <p className="text-gray-400">{tech.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="py-16 px-4 max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-gray-400 mb-2">
                        Email us at <a href="mailto:support@campuseye.com" className="text-blue-400 hover:underline">support@campuseye.com</a>
                    </p>
                </section>

                {/* Footer */}
                <footer className="w-full text-center py-6 border-t border-gray-700">
                    <div className="text-sm text-gray-500 space-x-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        © {new Date().getFullYear()} CampusEye. All rights reserved.
                    </p>
                </footer>
            </main>
        </div>
    );
};

export default LandingPage;