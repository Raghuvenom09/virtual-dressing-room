import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, Sparkles, Download, RotateCcw, Shirt, User, ShoppingBag, Zap, Heart, Share2, X, Check, LogOut, Home } from "lucide-react";

const VirtualDressingRoom = () => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);

  const outfits = [
    { id: 1, name: "Summer Dress", category: "Dresses", color: "from-pink-500 to-rose-500", price: "$89" },
    { id: 2, name: "Casual Shirt", category: "Tops", color: "from-blue-500 to-cyan-500", price: "$49" },
    { id: 3, name: "Evening Gown", category: "Dresses", color: "from-purple-500 to-pink-500", price: "$199" },
    { id: 4, name: "Denim Jacket", category: "Outerwear", color: "from-indigo-500 to-blue-500", price: "$129" },
    { id: 5, name: "Blazer", category: "Formal", color: "from-slate-600 to-slate-800", price: "$159" },
    { id: 6, name: "Sweater", category: "Casual", color: "from-orange-500 to-red-500", price: "$69" },
  ];

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = () => {
    if (userImage && selectedOutfit) {
      setIsProcessing(true);
      // Simulate AI processing
      setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
      }, 3000);
    }
  };

  const handleReset = () => {
    setUserImage(null);
    setSelectedOutfit(null);
    setShowResult(false);
    setIsProcessing(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

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
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-lg"
          >
            <Home size={20} />
            <span className="hidden md:inline">Home</span>
          </button>
          <button className="text-white/70 hover:text-white transition-colors hover:bg-white/10 p-2 rounded-lg">
            <ShoppingBag size={24} />
          </button>
          <button 
            onClick={handleLogout}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2 hover:bg-white/10 px-4 py-2 rounded-lg"
          >
            <LogOut size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-6">
            <Zap className="text-yellow-400 animate-pulse" size={20} />
            <span className="text-white/90 font-medium">AI-Powered Virtual Fitting</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Virtual Dressing Room
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Upload your photo and try on outfits instantly with our AI technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Upload & Preview */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Camera className="text-purple-400" size={28} />
                Your Photo
              </h3>

              {!userImage ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-white/5 transition-all duration-300 group"
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-white/40 group-hover:text-purple-400 transition-colors" />
                  <p className="text-white/70 text-lg mb-2">Click to upload your photo</p>
                  <p className="text-white/40 text-sm">PNG, JPG up to 10MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={userImage}
                    alt="User"
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 bg-red-500/80 backdrop-blur-md rounded-full p-3 hover:bg-red-500 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="text-white" size={20} />
                  </button>
                  {showResult && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl flex items-end p-6">
                      <div className="flex gap-3 w-full">
                        <button className="flex-1 bg-white/20 backdrop-blur-md rounded-xl py-3 hover:bg-white/30 transition-all flex items-center justify-center gap-2 text-white font-semibold">
                          <Heart size={20} />
                          Save
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl py-3 hover:scale-105 transition-all flex items-center justify-center gap-2 text-white font-semibold">
                          <ShoppingBag size={20} />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {userImage && !showResult && (
                <button
                  onClick={handleTryOn}
                  disabled={!selectedOutfit || isProcessing}
                  className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                    selectedOutfit && !isProcessing
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:scale-105 text-white shadow-2xl shadow-purple-500/50'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={24} />
                      Try On Outfit
                    </>
                  )}
                </button>
              )}

              {showResult && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-white/10 hover:bg-white/20 rounded-2xl py-4 text-white font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={20} />
                    Try Another
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-105 rounded-2xl py-4 text-white font-semibold flex items-center justify-center gap-2 transition-all">
                    <Download size={20} />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Outfit Selection */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shirt className="text-pink-400" size={28} />
              Choose Your Outfit
            </h3>

            <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {outfits.map((outfit) => (
                <div
                  key={outfit.id}
                  onClick={() => setSelectedOutfit(outfit)}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedOutfit?.id === outfit.id
                      ? 'ring-4 ring-purple-500 scale-105'
                      : 'hover:scale-105'
                  }`}
                >
                  <div className={`h-48 bg-gradient-to-br ${outfit.color} flex items-center justify-center relative`}>
                    <Shirt className="text-white/80 w-16 h-16" />
                    {selectedOutfit?.id === outfit.id && (
                      <div className="absolute top-3 right-3 bg-purple-500 rounded-full p-2">
                        <Check className="text-white" size={16} />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                    <h4 className="text-white font-bold text-lg mb-1">{outfit.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">{outfit.category}</span>
                      <span className="text-white font-bold">{outfit.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
          {[
            { icon: Zap, title: "Instant Results", desc: "See yourself in new outfits in seconds" },
            { icon: Sparkles, title: "AI-Powered", desc: "Advanced technology for realistic fitting" },
            { icon: Share2, title: "Share & Save", desc: "Download and share your favorite looks" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="text-white" size={24} />
              </div>
              <h4 className="text-white font-bold text-xl mb-2">{feature.title}</h4>
              <p className="text-white/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
      `}</style>
    </div>
  );
};

export default VirtualDressingRoom;