import React, { useState, useEffect } from "react";
import { Sparkles, LogIn, Zap, ArrowRight, ShoppingBag, TrendingUp, Heart, Mail, Lock, User, Eye, EyeOff, X } from "lucide-react";

const Homepage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const words = ["Fashion", "Style", "Elegance", "Innovation"];

  useEffect(() => {
    setIsLoaded(true);
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y <= -10 ? 110 : p.y - p.speed * 0.1,
          x: p.x + Math.sin(Date.now() * 0.001 + p.id) * 0.3,
        }))
      );
    };
    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(wordInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const features = [
    { icon: ShoppingBag, text: "AI-Powered Styling", color: "from-blue-500 to-cyan-500" },
    { icon: TrendingUp, text: "Trending Collections", color: "from-purple-500 to-pink-500" },
    { icon: Heart, text: "Personalized Picks", color: "from-rose-500 to-orange-500" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your authentication logic here
    // Simulate successful login
    setTimeout(() => {
      setShowLoginModal(false);
      // Navigate to Virtual Dressing page
      // If using React Router: navigate('/virtual-dressing');
      // For now, you can redirect or show success message
      alert("Login successful! Redirecting to Virtual Dressing Room...");
      window.location.href = '/virtual-dressing';
    }, 1000);
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setIsSignup(false);
  };

  const openSignupModal = () => {
    setShowLoginModal(true);
    setIsSignup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Mouse Follow Effect */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              background: `linear-gradient(135deg, rgba(139, 92, 246, ${p.opacity}), rgba(236, 72, 153, ${p.opacity}))`,
              boxShadow: `0 0 ${p.size * 2}px rgba(139, 92, 246, 0.5)`,
              animation: `pulse ${2 + p.delay}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center px-8 py-6 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
            <Sparkles className="text-white" size={20} />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            TRY & BUY
          </h1>
        </div>

        <button 
          onClick={openLoginModal}
          className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <LogIn size={18} className="relative z-10 group-hover:rotate-12 transition-transform" />
          <span className="relative z-10 font-semibold">Login</span>
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 hover:bg-white/20 transition-all duration-300 cursor-pointer">
            <Zap className="text-yellow-400 animate-pulse" size={20} />
            <span className="text-white/90 font-medium">AI-Powered Fashion Experience</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main Heading with Word Rotation */}
          <div className="mb-4">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tight">
              Discover the Future of
            </h2>
            <div className="relative h-24 md:h-32 overflow-hidden">
              {words.map((word, index) => (
                <h2
                  key={word}
                  className={`absolute inset-0 flex items-center justify-center text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-500 ${
                    index === currentWord ? 'translate-y-0 opacity-100' : index < currentWord ? '-translate-y-full opacity-0' : 'translate-y-full opacity-0'
                  }`}
                >
                  {word}
                </h2>
              ))}
            </div>
          </div>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mb-12 leading-relaxed">
            Explore, experiment, and express yourself like never before. Experience our revolutionary AI-powered fashion ecosystem where style meets innovation.
          </p>

          {/* CTA Button */}
          <button 
            onClick={openSignupModal}
            className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white px-12 py-5 rounded-full font-bold text-xl flex items-center gap-4 hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/50 hover:shadow-pink-500/50 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Sparkles className="relative z-10 group-hover:rotate-180 transition-transform duration-500" size={24} />
            <span className="relative z-10">Start Your Journey</span>
            <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </button>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{feature.text}</h3>
                  <p className="text-white/60 text-sm">Revolutionizing the way you discover fashion</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-20">
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "50K+", label: "Products" },
            { number: "99%", label: "Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Login/Signup Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900/98 via-purple-900/98 to-slate-900/98 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-purple-500/30 overflow-hidden animate-scaleIn">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
            >
              <X className="text-white/70 group-hover:text-white group-hover:rotate-90 transition-all" size={20} />
            </button>

            {/* Form Content */}
            <div className="relative z-10 p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Sparkles className="text-white" size={28} />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-black text-center mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                {isSignup ? "Join TRY & BUY" : "Welcome Back"}
              </h2>
              <p className="text-white/60 text-center mb-8">
                {isSignup ? "Create your account to get started" : "Login to continue your journey"}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignup && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
                      required={isSignup}
                    />
                  </div>
                )}

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {isSignup && (
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
                      required={isSignup}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                )}

                {!isSignup && (
                  <div className="flex justify-end">
                    <button type="button" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">{isSignup ? "Create Account" : "Login"}</span>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-white/40 text-sm">OR</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="bg-white/5 border border-white/10 rounded-xl py-3 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-white/70 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button className="bg-white/5 border border-white/10 rounded-xl py-3 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 text-white/70 hover:text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>

              {/* Toggle Auth Mode */}
              <p className="text-center text-white/60">
                {isSignup ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {isSignup ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Homepage;