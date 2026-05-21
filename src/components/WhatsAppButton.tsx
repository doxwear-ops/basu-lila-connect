import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "819018566119";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  useEffect(() => {
    // Show the button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show the tooltip shortly after the button appears
      setTimeout(() => setShowTooltip(true), 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
          {/* Tooltip/Message Bubble */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="relative mb-2 rounded-2xl bg-white p-4 shadow-xl border border-border max-w-[240px]"
              >
                <button 
                  onClick={() => setShowTooltip(false)}
                  className="absolute -top-2 -right-2 rounded-full bg-background border border-border p-1 hover:bg-secondary transition-colors"
                >
                  <X size={12} />
                </button>
                <p className="text-xs font-medium leading-relaxed text-foreground">
                  Hello! 👋 How can we help you today? Chat with us on WhatsApp.
                </p>
                {/* Triangle for bubble */}
                <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-border bg-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgb(37,211,102,0.4)] transition-shadow hover:shadow-[0_8px_40px_rgb(37,211,102,0.6)] md:h-16 md:w-16"
            aria-label="Contact us on WhatsApp"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-white md:h-10 md:w-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045a11.815 11.815 0 001.591 5.976L0 24l6.146-1.612a11.804 11.804 0 005.904 1.577h.004c6.634 0 12.043-5.409 12.046-12.046a11.813 11.813 0 00-3.535-8.528" />
            </svg>
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}

