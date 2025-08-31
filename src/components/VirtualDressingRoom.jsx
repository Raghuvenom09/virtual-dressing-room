import React, { useState, useRef, useEffect } from "react";
import { Upload, Image, Sparkles, Zap, Camera, Wand2, Download, RefreshCw } from "lucide-react";

export default function VirtualDressingRoomEnhanced() {
  const [userImage, setUserImage] = useState(null);
  const [clothImage, setClothImage] = useState(null);
  const [userFile, setUserFile] = useState(null);
  const [clothFile, setClothFile] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [dragOver, setDragOver] = useState({ user: false, cloth: false });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  const userInputRef = useRef(null);
  const clothInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Particle animation for background
  const [particles, setParticles] = useState([]);

  // Mouse tracking for interactive cursor effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Add to cursor trail with sparkle effect
      setCursorTrail(prev => {
        const newTrail = [...prev, { 
          ...newPosition, 
          id: Date.now() + Math.random(),
          sparkle: Math.random() > 0.7 // Random sparkles
        }];
        return newTrail.slice(-12); // Keep more trail elements
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 4,
      color: ['pink', 'purple', 'blue', 'yellow', 'green', 'indigo', 'red', 'cyan'][Math.floor(Math.random() * 8)],
      shape: Math.random() > 0.5 ? 'circle' : 'star',
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    setIsReady(userFile && clothFile);
  }, [userFile, clothFile]);

  const handleDragOver = (e, type) => {
    e.preventDefault();
    setDragOver(prev => ({ ...prev, [type]: true }));
    setCursorVariant('drag');
  };

  const handleDragLeave = (e, type) => {
    e.preventDefault();
    setDragOver(prev => ({ ...prev, [type]: false }));
    setCursorVariant('default');
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setDragOver(prev => ({ ...prev, [type]: false }));
    setCursorVariant('default');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        handleFileUpload(file, type);
      }
    }
  };

  const handleFileUpload = (file, type) => {
    const url = URL.createObjectURL(file);
    
    if (type === "user") {
      setUserImage(url);
      setUserFile(file);
    } else {
      setClothImage(url);
      setClothFile(file);
    }
  };

  const handleUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileUpload(file, type);
  };

  const simulateProgress = () => {
    return new Promise((resolve) => {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            resolve();
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 200);
    });
  };

  const generateTryOn = async () => {
    if (!userFile || !clothFile) return;
    setLoading(true);
    setResultImage(null);
    setShowResult(false);
    setProgress(0);
    setCursorVariant('processing');

    // Simulate AI processing with progress
    await simulateProgress();
    
    // Additional delay for effect
    await new Promise((res) => setTimeout(res, 800));

    setResultImage(clothImage);
    setLoading(false);
    setShowResult(true);
    setCursorVariant('success');
    
    setTimeout(() => setCursorVariant('default'), 2000);
  };

  const resetAll = () => {
    setUserImage(null);
    setClothImage(null);
    setUserFile(null);
    setClothFile(null);
    setResultImage(null);
    setShowResult(false);
    setProgress(0);
    setCursorVariant('default');
  };

  const getCursorStyle = () => {
    const baseStyle = {
      left: mousePosition.x - 20,
      top: mousePosition.y - 20,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    switch (cursorVariant) {
      case 'drag':
        return {
          ...baseStyle,
          background: 'radial-gradient(circle, rgba(255, 20, 147, 0.9) 0%, rgba(138, 43, 226, 0.7) 30%, rgba(0, 191, 255, 0.5) 60%, transparent 100%)',
          transform: 'scale(2) rotate(180deg)',
          boxShadow: '0 0 30px rgba(255, 20, 147, 0.7), 0 0 60px rgba(138, 43, 226, 0.4)',
        };
      case 'processing':
        return {
          ...baseStyle,
          background: 'conic-gradient(from 0deg, rgba(255, 215, 0, 0.9), rgba(255, 69, 0, 0.8), rgba(255, 20, 147, 0.7), rgba(138, 43, 226, 0.8), rgba(255, 215, 0, 0.9))',
          transform: 'scale(1.8)',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.8), 0 0 80px rgba(255, 69, 0, 0.5)',
        };
      case 'success':
        return {
          ...baseStyle,
          background: 'radial-gradient(circle, rgba(0, 255, 127, 0.95) 0%, rgba(50, 205, 50, 0.8) 30%, rgba(255, 215, 0, 0.6) 60%, transparent 100%)',
          transform: 'scale(2.5)',
          boxShadow: '0 0 50px rgba(0, 255, 127, 0.8), 0 0 100px rgba(50, 205, 50, 0.6)',
        };
      case 'magic':
        return {
          ...baseStyle,
          background: 'conic-gradient(from 45deg, rgba(255, 20, 147, 0.9), rgba(138, 43, 226, 0.8), rgba(0, 191, 255, 0.7), rgba(255, 215, 0, 0.8), rgba(255, 20, 147, 0.9))',
          transform: 'scale(1.6)',
          boxShadow: '0 0 35px rgba(255, 20, 147, 0.7), 0 0 70px rgba(138, 43, 226, 0.5)',
        };
      case 'button':
        return {
          ...baseStyle,
          background: 'radial-gradient(circle, rgba(255, 69, 0, 0.9) 0%, rgba(255, 140, 0, 0.7) 40%, rgba(255, 215, 0, 0.5) 80%, transparent 100%)',
          transform: 'scale(1.4)',
          boxShadow: '0 0 25px rgba(255, 69, 0, 0.6)',
        };
      default:
        return {
          ...baseStyle,
          background: 'radial-gradient(circle, rgba(75, 0, 130, 0.8) 0%, rgba(138, 43, 226, 0.6) 40%, rgba(255, 20, 147, 0.4) 70%, transparent 100%)',
          transform: 'scale(1)',
          boxShadow: '0 0 15px rgba(75, 0, 130, 0.4)',
        };
    }
  };

  // Enhanced floating particles component
  const FloatingParticle = ({ particle }) => (
    <div
      className="absolute opacity-40"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        animationDelay: `${particle.delay}s`,
      }}
    >
      {particle.shape === 'star' ? (
        <div className="relative w-full h-full">
          <div className={`absolute inset-0 bg-gradient-to-r from-${particle.color}-400 to-${particle.color}-600 transform rotate-0`} 
               style={{
                 clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                 animation: `starFloat ${3 + Math.random() * 2}s ease-in-out infinite alternate, starRotate ${4 + Math.random() * 2}s linear infinite`
               }} />
        </div>
      ) : (
        <div 
          className={`w-full h-full bg-gradient-to-br from-${particle.color}-400 via-${particle.color}-500 to-${particle.color}-600 rounded-full shadow-lg`}
          style={{
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate, 
                       pulse ${2 + Math.random()}s ease-in-out infinite,
                       colorShift ${4 + Math.random() * 3}s ease-in-out infinite`,
            boxShadow: `0 0 ${particle.size}px rgba(255, 255, 255, 0.3), 
                       0 0 ${particle.size * 2}px rgba(255, 20, 147, 0.2)`
          }} 
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden cursor-none" style={{
      background: `
        radial-gradient(circle at 20% 50%, rgba(255, 20, 147, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 191, 255, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)
      `
    }}>
      {/* Enhanced Custom Cursor */}
      <div 
        className="fixed w-10 h-10 pointer-events-none z-50 rounded-full"
        style={getCursorStyle()}
      >
        {cursorVariant === 'processing' && (
          <div className="absolute inset-0 border-4 border-white/70 rounded-full animate-spin" 
               style={{ borderTopColor: 'transparent', borderRightColor: 'rgba(255, 215, 0, 0.8)' }} />
        )}
        {cursorVariant === 'success' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles size={20} className="text-white animate-bounce" />
          </div>
        )}
        {cursorVariant === 'magic' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Wand2 size={16} className="text-white animate-pulse" />
          </div>
        )}
      </div>
      
      {/* Enhanced Cursor Trail with Rainbow Sparkles */}
      {cursorTrail.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-40 rounded-full"
          style={{
            left: trail.x - 10,
            top: trail.y - 10,
            width: '20px',
            height: '20px',
            background: trail.sparkle 
              ? `conic-gradient(from ${(Date.now() / 10) % 360}deg, 
                  rgba(255, 20, 147, ${(index + 1) / cursorTrail.length * 0.9}),
                  rgba(138, 43, 226, ${(index + 1) / cursorTrail.length * 0.8}),
                  rgba(0, 191, 255, ${(index + 1) / cursorTrail.length * 0.7}),
                  rgba(255, 215, 0, ${(index + 1) / cursorTrail.length * 0.8}),
                  rgba(255, 20, 147, ${(index + 1) / cursorTrail.length * 0.9}))`
              : `radial-gradient(circle, 
                  rgba(138, 43, 226, ${(index + 1) / cursorTrail.length * 0.6}) 0%, 
                  rgba(255, 20, 147, ${(index + 1) / cursorTrail.length * 0.4}) 50%, 
                  transparent 80%)`,
            transform: `scale(${(index + 1) / cursorTrail.length * 1.2}) ${trail.sparkle ? 'rotate(45deg)' : ''}`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: trail.sparkle 
              ? `0 0 ${15 * (index + 1) / cursorTrail.length}px rgba(255, 215, 0, 0.8)` 
              : `0 0 ${10 * (index + 1) / cursorTrail.length}px rgba(138, 43, 226, 0.4)`,
          }}
        >
          {trail.sparkle && (
            <div className="w-full h-full animate-pulse relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-2 h-full mx-auto transform rotate-45 animate-spin" style={{ animationDuration: '0.5s' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent h-2 w-full my-auto transform -rotate-45 animate-spin" style={{ animationDuration: '0.5s' }} />
            </div>
          )}
        </div>
      ))}

      {/* Animated Background */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <FloatingParticle key={particle.id} particle={particle} />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-indigo-600" />
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Main Heading with Advanced Animation */}
        <div className="text-center mb-12">
          <div 
            className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            style={{
              animation: 'gradientShift 3s ease-in-out infinite, slideDown 1s ease-out',
              backgroundSize: '200% 200%',
            }}
          >
            Virtual Dressing Room
          </div>
          
          <div 
            className="flex items-center justify-center gap-3 text-lg text-indigo-600 font-medium"
            style={{ animation: 'fadeInUp 1s ease-out 0.5s both' }}
          >
            <Sparkles className="text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
            <span>AI-Powered Fashion Experience</span>
            <Wand2 className="text-purple-500 animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Main Upload Section */}
        <div 
          className="bg-white/15 backdrop-blur-3xl shadow-2xl rounded-3xl p-8 w-full max-w-4xl border border-white/40"
          style={{
            animation: 'scaleIn 0.8s ease-out 0.3s both',
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.3) 0%, 
                rgba(255, 20, 147, 0.1) 25%,
                rgba(138, 43, 226, 0.1) 50%,
                rgba(0, 191, 255, 0.1) 75%,
                rgba(255, 255, 255, 0.2) 100%)
            `,
            boxShadow: `
              0 25px 50px -12px rgba(255, 20, 147, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              0 0 100px rgba(138, 43, 226, 0.2)
            `
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Photo Upload */}
            <div
              className={`relative group transition-all duration-500 transform ${dragOver.user ? 'scale-105 rotate-1' : 'hover:scale-102'}`}
              onDragOver={(e) => handleDragOver(e, 'user')}
              onDragLeave={(e) => handleDragLeave(e, 'user')}
              onDrop={(e) => handleDrop(e, 'user')}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <label className={`
                flex flex-col items-center border-3 border-dashed rounded-2xl p-6 transition-all duration-500
                ${dragOver.user 
                  ? 'border-pink-400 bg-gradient-to-br from-pink-100/60 to-purple-100/60 shadow-xl shadow-pink-500/25' 
                  : 'border-indigo-300 hover:border-indigo-400 bg-gradient-to-br from-indigo-50/40 to-purple-50/40 hover:shadow-lg hover:shadow-indigo-500/20'
                }
                ${userImage ? 'border-solid border-green-400 bg-gradient-to-br from-green-50/60 to-emerald-50/60 shadow-lg shadow-green-500/20' : ''}
              `}>
                <div className="relative">
                  <Camera className={`w-12 h-12 mb-3 transition-all duration-500 ${userImage ? 'text-green-500' : 'text-indigo-500'}`} 
                         style={{ animation: userImage ? 'bounce 0.6s ease-out' : '' }} />
                  {userImage && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                    </div>
                  )}
                </div>
                
                <span className="font-semibold text-indigo-700 mb-2">
                  {userImage ? 'Your Photo ✓' : 'Upload Your Photo'}
                </span>
                <span className="text-sm text-indigo-600 text-center">
                  Drag & drop or click to browse
                </span>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  hidden 
                  ref={userInputRef}
                  onChange={(e) => handleUpload(e, "user")} 
                />
                
                {userImage && (
                  <div 
                    className="mt-4 rounded-xl shadow-lg overflow-hidden"
                    style={{ animation: 'photoReveal 0.8s ease-out' }}
                  >
                    <img
                      src={userImage}
                      alt="User"
                      className="w-48 h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}
              </label>
            </div>

            {/* Clothing Upload */}
            <div
              className={`relative group transition-all duration-500 transform ${dragOver.cloth ? 'scale-105 -rotate-1' : 'hover:scale-102'}`}
              onDragOver={(e) => handleDragOver(e, 'cloth')}
              onDragLeave={(e) => handleDragLeave(e, 'cloth')}
              onDrop={(e) => handleDrop(e, 'cloth')}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <label className={`
                flex flex-col items-center border-3 border-dashed rounded-2xl p-6 transition-all duration-500
                ${dragOver.cloth 
                  ? 'border-purple-400 bg-gradient-to-br from-purple-100/60 to-pink-100/60 shadow-xl shadow-purple-500/25' 
                  : 'border-purple-300 hover:border-purple-400 bg-gradient-to-br from-purple-50/40 to-pink-50/40 hover:shadow-lg hover:shadow-purple-500/20'
                }
                ${clothImage ? 'border-solid border-green-400 bg-gradient-to-br from-green-50/60 to-emerald-50/60 shadow-lg shadow-green-500/20' : ''}
              `}>
                <div className="relative">
                  <Image className={`w-12 h-12 mb-3 transition-all duration-500 ${clothImage ? 'text-green-500' : 'text-purple-500'}`}
                            style={{ animation: clothImage ? 'bounce 0.6s ease-out' : '' }} />
                  {clothImage && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                    </div>
                  )}
                </div>
                
                <span className="font-semibold text-purple-700 mb-2">
                  {clothImage ? 'Fashion Item ✓' : 'Upload Fashion Item'}
                </span>
                <span className="text-sm text-purple-600 text-center">
                  Drag & drop or click to browse
                </span>
                
                <input 
                  type="file" 
                  accept="image/*" 
                  hidden 
                  ref={clothInputRef}
                  onChange={(e) => handleUpload(e, "cloth")} 
                />
                
                {clothImage && (
                  <div 
                    className="mt-4 rounded-xl shadow-lg overflow-hidden"
                    style={{ animation: 'photoReveal 0.8s ease-out' }}
                  >
                    <img
                      src={clothImage}
                      alt="Clothing"
                      className="w-48 h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {isReady && (
              <button
                onClick={resetAll}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <RefreshCw className="w-5 h-5" />
                Reset
              </button>
            )}
            
            <button
              disabled={loading || !isReady}
              onClick={generateTryOn}
              onMouseEnter={() => !loading && isReady && setCursorVariant('magic')}
              onMouseLeave={() => setCursorVariant('default')}
              className={`
                relative overflow-hidden px-10 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform
                ${loading || !isReady
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 hover:from-pink-600 hover:via-purple-700 hover:to-blue-600 text-white shadow-xl hover:shadow-2xl hover:scale-110'
                }
              `}
              style={{
                animation: isReady && !loading ? 'pulse 2s ease-in-out infinite' : '',
              }}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AI Processing...</span>
                  <Zap className="w-5 h-5 animate-bounce" />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Wand2 className="w-6 h-6" />
                  <span>✨ Try It On!</span>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
              )}
              
              {/* Progress overlay */}
              {loading && (
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-yellow-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {loading && (
            <div className="mt-6 text-center">
              <div className="bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 transition-all duration-300 rounded-full shadow-lg"
                  style={{ 
                    width: `${progress}%`,
                    animation: 'shimmer 2s ease-in-out infinite, rainbow 3s linear infinite'
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 animate-pulse">
                {progress < 30 ? 'Analyzing your photo...' :
                 progress < 60 ? 'Processing fashion item...' :
                 progress < 90 ? 'Generating virtual try-on...' :
                 'Finalizing results...'}
              </p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {showResult && resultImage && (
          <div 
            className="mt-12 bg-white/15 backdrop-blur-3xl shadow-2xl rounded-3xl p-8 w-full max-w-md text-center border border-white/40"
            style={{
              animation: 'resultReveal 1s ease-out',
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.3) 0%, 
                  rgba(0, 255, 127, 0.1) 25%,
                  rgba(255, 215, 0, 0.1) 50%,
                  rgba(255, 20, 147, 0.1) 75%,
                  rgba(255, 255, 255, 0.2) 100%)
              `,
              boxShadow: `
                0 25px 50px -12px rgba(0, 255, 127, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                0 0 80px rgba(255, 215, 0, 0.2)
              `
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="text-yellow-500 animate-spin" style={{ animationDuration: '2s' }} />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Your Virtual Try-On
              </h2>
              <Sparkles className="text-pink-500 animate-bounce" />
            </div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 group">
              <img 
                src={resultImage} 
                alt="Virtual Try-On Result" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" 
                style={{ animation: 'imageGlow 2s ease-in-out infinite alternate' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <button 
              onMouseEnter={() => setCursorVariant('download')}
              onMouseLeave={() => setCursorVariant('default')}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >')}
              className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Download className="w-5 h-5" />
              Save Result
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Custom Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes photoReveal {
          from { transform: scale(0.8) rotateY(90deg); opacity: 0; }
          to { transform: scale(1) rotateY(0deg); opacity: 1; }
        }
        
        @keyframes resultReveal {
          from { transform: translateY(50px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: -200px 0; }
          50% { background-position: 200px 0; }
        }
        
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes imageGlow {
          from { box-shadow: 0 0 20px rgba(255, 20, 147, 0.4), 0 0 40px rgba(138, 43, 226, 0.3); }
          to { box-shadow: 0 0 40px rgba(0, 191, 255, 0.5), 0 0 80px rgba(255, 215, 0, 0.4); }
        }
        
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-25px); }
        }
        
        @keyframes starFloat {
          from { transform: translateY(0px) scale(1); }
          to { transform: translateY(-30px) scale(1.1); }
        }
        
        @keyframes starRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes colorShift {
          0%, 100% { filter: hue-rotate(0deg) saturate(1.2); }
          25% { filter: hue-rotate(90deg) saturate(1.5); }
          50% { filter: hue-rotate(180deg) saturate(1.3); }
          75% { filter: hue-rotate(270deg) saturate(1.4); }
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
}