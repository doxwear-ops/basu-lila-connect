"use client"; 
import React, { useState, useEffect, useRef } from "react"; 
import { cn } from "@/lib/utils"; 
import { Menu, X } from "lucide-react"; 
 
export interface MenuItem { 
  label: string; 
  href?: string; 
  onClick?: () => void; 
  icon?: React.ReactNode; 
} 
 
export interface HamburgerMenuOverlayProps { 
  /** Array of menu items */ 
  items: MenuItem[]; 
  /** Button position from top */ 
  buttonTop?: string; 
  /** Button position from left */ 
  buttonLeft?: string; 
  /** Button size */ 
  buttonSize?: "sm" | "md" | "lg"; 
  /** Button background color */ 
  buttonColor?: string; 
  /** Overlay background color/gradient */ 
  overlayBackground?: string; 
  /** Menu text color */ 
  textColor?: string; 
  /** Menu font size */ 
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl"; 
  /** Font family */ 
  fontFamily?: string; 
  /** Font weight */ 
  fontWeight?: "normal" | "medium" | "semibold" | "bold"; 
  /** Animation duration in seconds */ 
  animationDuration?: number; 
  /** Stagger delay between menu items */ 
  staggerDelay?: number; 
  /** Menu items alignment */ 
  menuAlignment?: "left" | "center" | "right"; 
  /** Custom class for container */ 
  className?: string; 
  /** Custom class for button */ 
  buttonClassName?: string; 
  /** Custom class for menu items */ 
  menuItemClassName?: string; 
  /** Disable overlay close on item click */ 
  keepOpenOnItemClick?: boolean; 
  /** Custom button content */ 
  customButton?: React.ReactNode; 
  /** ARIA label for accessibility */ 
  ariaLabel?: string; 
  /** Callback when menu opens */ 
  onOpen?: () => void; 
  /** Callback when menu closes */ 
  onClose?: () => void; 
  /** Menu items layout direction */ 
  menuDirection?: "vertical" | "horizontal"; 
  /** Enable blur backdrop */ 
  enableBlur?: boolean; 
  /** Z-index for overlay */ 
  zIndex?: number; 
} 
 
export const HamburgerMenuOverlay: React.FC<HamburgerMenuOverlayProps> = ({ 
  items = [], 
  buttonTop = "40px", 
  buttonLeft = "auto", 
  buttonSize = "md", 
  buttonColor = "transparent", 
  overlayBackground = "var(--primary)", 
  textColor = "#ffffff", 
  fontSize = "md", 
  fontFamily = 'var(--font-serif)', 
  fontWeight = "bold", 
  animationDuration = 0.8, 
  staggerDelay = 0.1, 
  menuAlignment = "center", 
  className, 
  buttonClassName, 
  menuItemClassName, 
  keepOpenOnItemClick = false, 
  customButton, 
  ariaLabel = "Navigation menu", 
  onOpen, 
  onClose, 
  menuDirection = "vertical", 
  enableBlur = true, 
  zIndex = 1000, 
}) => { 
  const [isOpen, setIsOpen] = useState(false); 
  const navRef = useRef<HTMLDivElement>(null); 
  const containerRef = useRef<HTMLDivElement>(null); 
 
  const buttonSizes = { 
    sm: "w-10 h-10", 
    md: "w-12 h-12", 
    lg: "w-16 h-16", 
  }; 
 
  const fontSizes = { 
    sm: "text-2xl md:text-3xl", 
    md: "text-3xl md:text-4xl", 
    lg: "text-4xl md:text-5xl", 
    xl: "text-5xl md:text-6xl", 
    "2xl": "text-6xl md:text-7xl", 
  }; 
 
  const toggleMenu = () => { 
    const newState = !isOpen; 
    setIsOpen(newState); 
 
    if (newState) { 
      onOpen?.(); 
    } else { 
      onClose?.(); 
    } 
  }; 
 
  const handleItemClick = (item: MenuItem) => { 
    if (item.onClick) { 
      item.onClick(); 
    } 
 
    if (!keepOpenOnItemClick) { 
      setIsOpen(false); 
      onClose?.(); 
    } 
  }; 
 
  // Close menu on escape key 
  useEffect(() => { 
    const handleEscape = (e: KeyboardEvent) => { 
      if (e.key === "Escape" && isOpen) { 
        setIsOpen(false); 
        onClose?.(); 
      } 
    }; 
 
    document.addEventListener("keydown", handleEscape); 
    return () => document.removeEventListener("keydown", handleEscape); 
  }, [isOpen, onClose]); 
 
  const buttonRight = buttonLeft === "auto" ? "20px" : "auto";
  const buttonLeftValue = buttonLeft === "auto" ? "auto" : buttonLeft;

  return ( 
    <div ref={containerRef} className={cn("relative", className)}> 
      <style> 
        {` 
          .hamburger-overlay-${zIndex} { 
            position: fixed; 
            top: 0; 
            left: 0; 
            width: 100%; 
            height: 100vh; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            background: ${overlayBackground}; 
            z-index: ${zIndex}; 
            clip-path: circle(0px at ${buttonLeftValue === "auto" ? `calc(100% - ${buttonRight})` : buttonLeftValue} ${buttonTop}); 
            transition: clip-path ${animationDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
            ${enableBlur ? "backdrop-filter: blur(10px);" : ""} 
          } 
           
          .hamburger-overlay-${zIndex}.open { 
            clip-path: circle(150% at ${buttonLeftValue === "auto" ? `calc(100% - ${buttonRight})` : buttonLeftValue} ${buttonTop}); 
          } 
           
          .hamburger-button-${zIndex} { 
            position: relative; 
            z-index: ${zIndex + 1}; 
            background: ${buttonColor}; 
            border: none; 
            cursor: pointer; 
            transition: all 0.3s ease; 
            display: flex;
            align-items: center;
            justify-content: center;
          } 
           
          .hamburger-button-${zIndex}:hover { 
            transform: scale(1.1); 
          } 
           
          .hamburger-button-${zIndex}:focus { 
            outline: none;
          } 
           
          .menu-items-${zIndex} { 
            ${menuDirection === "horizontal" ? "display: flex; flex-wrap: wrap; gap: 1rem;" : ""} 
            ${menuAlignment === "center" ? "text-align: center;" : ""} 
            ${menuAlignment === "right" ? "text-align: right;" : ""} 
          } 
           
          .menu-item-${zIndex} { 
            position: relative; 
            list-style: none; 
            padding: 0.5rem 0; 
            cursor: pointer; 
            transform: translateY(20px); 
            opacity: 0; 
            transition: all 0.4s ease; 
             
            font-family: ${fontFamily};
            font-weight: ${fontWeight}; 
            color: ${textColor}; 
            ${menuDirection === "horizontal" ? "display: inline-block; margin: 0 1rem;" : ""} 
          } 
           
          .menu-item-${zIndex}.visible { 
            transform: translateY(0); 
            opacity: 1; 
          } 
           
          .menu-item-${zIndex} span { 
            opacity: 0.8; 
            transition: opacity 0.25s ease; 
            display: flex; 
            align-items: center; 
            gap: 0.75rem; 
          } 
           
          .menu-item-${zIndex}:hover span { 
            opacity: 1; 
          } 
           
          .menu-item-${zIndex}:focus { 
            outline: none;
          } 
        `} 
      </style> 
 
      {/* Hamburger Button */} 
      <button 
        className={cn( 
          `hamburger-button-${zIndex}`, 
          buttonSizes[buttonSize], 
          buttonClassName 
        )} 
        onClick={toggleMenu} 
        aria-label={ariaLabel} 
        aria-expanded={isOpen} 
        aria-controls="navigation-menu" 
      > 
        {customButton || ( 
          <div className="relative w-full h-full flex items-center justify-center"> 
            <Menu 
              className={cn( 
                "absolute transition-all duration-300 text-foreground", 
                isOpen 
                  ? "opacity-0 rotate-45 scale-0" 
                  : "opacity-100 rotate-0 scale-100" 
              )} 
              size={buttonSize === "sm" ? 24 : buttonSize === "md" ? 28 : 32} 
            /> 
            <X 
              className={cn( 
                "absolute transition-all duration-300", 
                isOpen 
                  ? "opacity-100 rotate-0 scale-100 text-white" 
                  : "opacity-0 -rotate-45 scale-0" 
              )} 
              size={buttonSize === "sm" ? 24 : buttonSize === "md" ? 28 : 32} 
            /> 
          </div> 
        )} 
      </button> 

      {/* Navigation Overlay */} 
      <div 
        ref={navRef} 
        className={cn(`hamburger-overlay-${zIndex}`, isOpen && "open")} 
        aria-hidden={!isOpen} 
      > 
        <ul 
          className={cn( 
            `menu-items-${zIndex}`, 
            menuDirection === "horizontal" && "flex flex-wrap " 
          )} 
        > 
          {items.map((item, index) => ( 
            <li 
              key={index} 
              className={cn( 
                `menu-item-${zIndex}`, 
                fontSizes[fontSize], 
                isOpen && "visible", 
                menuItemClassName 
              )} 
              style={{ 
                transitionDelay: isOpen ? `${index * staggerDelay + 0.3}s` : "0s", 
              }} 
              onClick={() => handleItemClick(item)} 
              onKeyDown={(e) => { 
                if (e.key === "Enter" || e.key === " ") { 
                  e.preventDefault(); 
                  handleItemClick(item); 
                } 
              }} 
              tabIndex={isOpen ? 0 : -1} 
              role="button" 
              aria-label={`Navigate to ${item.label}`} 
            > 
              <span> 
                {item.icon && <span className="menu-icon">{item.icon}</span>} 
                {item.label} 
              </span> 
            </li> 
          ))} 
        </ul> 
      </div> 
    </div> 
  ); 
}; 
 
export default HamburgerMenuOverlay;
