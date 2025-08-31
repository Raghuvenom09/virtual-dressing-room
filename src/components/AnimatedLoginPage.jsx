import React, { useState, useEffect } from "react";
import { Sparkles, Heart, Star, Zap, Shirt, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EnhancedAnimatedLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // ✅ fade-out state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [cursorTrail, setCursorTrail] = useState([]);

  const navigate = useNavigate();

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);

      // Cursor trail
      setCursorTrail((prev) => {
        const newTrail = [...prev, { ...newPosition, id: Date.now() }];
        return newTrail.slice(-8);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // ✅ After success, fade out then navigate
    setTimeout(() => {
      setFadeOut(true); // start fade animation
      setTimeout(() => {
        navigate("/dressing-room");
      }, 1200); // wait fade animation before navigating
    }, 2000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden cursor-none transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Custom Cursor */}
      <div
        className="fixed w-8 h-8 pointer-events-none z-50 transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background:
            "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 80%, transparent 100%)",
          borderRadius: "50%",
        }}
      />

      {/* Cursor Trail */}
      {cursorTrail.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: trail.x - 8,
            top: trail.y - 8,
            width: "16px",
            height: "16px",
            background: `radial-gradient(circle, rgba(0,0,0,${
              ((index + 1) / cursorTrail.length) * 0.4
            }) 0%, rgba(0,0,0,${
              ((index + 1) / cursorTrail.length) * 0.2
            }) 50%, transparent 80%)`,
            borderRadius: "50%",
            transform: `scale(${(index + 1) / cursorTrail.length})`,
            transition: "all 0.3s ease-out",
          }}
        />
      ))}

      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x * 0.1}% ${
          mousePosition.y * 0.1
        }%, 
            rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, 
            #1e1b4b 0%, #312e81 25%, #1e3a8a 50%, #1e40af 75%, #7c3aed 100%)`,
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white opacity-20 animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${3 + p.delay}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Success Screen */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-8 rounded-3xl shadow-2xl animate-bounce">
            <div className="flex flex-col items-center space-y-4">
              <Crown size={64} className="text-yellow-300 animate-bounce" />
              <h2 className="text-2xl font-bold">
                {isLogin ? "✨ Welcome Back!" : "🎉 Account Created!"}
              </h2>
              <p className="text-green-100">
                Entering your virtual dressing room...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="relative z-10 transform transition-all duration-700 hover:scale-105">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="text-yellow-400 animate-pulse" size={32} />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                Virtual Dressing
              </h1>
              <Heart className="text-pink-400 animate-pulse" size={32} />
            </div>
            <p className="text-white/80 text-sm">
              {isLogin
                ? "Welcome back to your fashion world!"
                : "Join the style revolution!"}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="✨ Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all"
              />
            )}
            <input
              type="email"
              placeholder="📧 Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition-all"
              required
            />
            <input
              type="password"
              placeholder="🔐 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 outline-none transition-all"
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="🔒 Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-white placeholder-white/60 focus:border-green-400 focus:ring-2 focus:ring-green-400/50 outline-none transition-all"
                required
              />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:scale-105"
            >
              {isSubmitting
                ? "Processing Magic..."
                : isLogin
                ? "Enter Dressing Room"
                : "Create Account"}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6 pt-6 border-t border-white/20">
            <p className="text-white/80 text-sm mb-3">
              {isLogin
                ? "New to our fashion world?"
                : "Already part of our community?"}
            </p>
            <button
              onClick={toggleMode}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
            >
              {isLogin ? "🌟 Sign Up" : "👑 Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
