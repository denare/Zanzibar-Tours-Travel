import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show the button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip for 5 seconds after button appears
      setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 5000);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your tours. Could you help me plan my Zanzibar adventure?");
    const whatsappUrl = `https://wa.me/255678049280?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 w-64 bg-white rounded-lg shadow-lg border border-slate-200 p-4 animate-bounce">
          <div className="relative">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-0 right-0 -mt-2 -mr-2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800 mb-1">
                  Need help planning your tour?
                </p>
                <p className="text-xs text-slate-600">
                  Chat with us on WhatsApp for instant assistance!
                </p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="group bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse hover:animate-none"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Ripple effect */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75 group-hover:opacity-0"></div>
      </button>

      {/* Online indicator */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
        <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default WhatsAppFloat;