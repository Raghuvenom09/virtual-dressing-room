import React, { useState, useEffect } from "react";
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowLeft, Check } from "lucide-react";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [particles, setParticles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your authentication logic here
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleBackToHome = () => {
    // Replace with your navigation logic
    // Example: window.location.href = '/';
    // Or if using React Router: navigate('/');
    console.log("Navigate back to home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
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

      {/* Back to Home Button */}
      <button
        onClick={handleBackToHome}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 group"
      >
        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Sparkles className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              TRY & BUY
            </h1>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white leading-tight">
              Step Into The Future of Fashion
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Join thousands of fashion enthusiasts who are already experiencing the magic of AI-powered styling.
            </p>

            <div className="space-y-4 pt-4">
              {[
                "AI-Powered Personal Stylist",
                "Virtual Try-On Technology",
                "Exclusive Collections",
                "Smart Recommendations"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Check className="text-white" size={16} />
                  </div>
                  <span className="text-white/90 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            {[
              { number: "10K+", label: "Users" },
              { number: "50K+", label: "Products" },
              { number: "99%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="relative">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-purple-500/20 p-8 md:p-12">
            {/* Animated Background */}
            <div className="absolute inset-0 rounded-3xl opacity-30 overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Form Content */}
            <div className="relative z-10">
              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {isSignup ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-white/60">
                  {isSignup ? "Join the fashion revolution today" : "Continue your style journey"}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignup && (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-purple-400 transition-colors" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
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
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
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
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-purple-500 focus:outline-none transition-all duration-300"
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
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-white/70 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0" />
                      <span className="group-hover:text-white transition-colors">Remember me</span>
                    </label>
                    <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">{isSignup ? "Create Account" : "Sign In"}</span>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-white/40 text-sm">OR CONTINUE WITH</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-white/5 border border-white/10 rounded-2xl py-3.5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-white/70 hover:text-white group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="font-medium">Google</span>
                </button>
                <button className="bg-white/5 border border-white/10 rounded-2xl py-3.5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-white/70 hover:text-white group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-medium">Facebook</span>
                </button>
              </div>

              {/* Toggle Auth Mode */}
              <p className="text-center text-white/60 mt-6">
                {isSignup ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  {isSignup ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;