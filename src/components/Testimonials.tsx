import React, { useState, useEffect, useRef } from "react"; 
import { motion } from "framer-motion"; 
import { Star, ArrowLeft as LucideArrowLeft, ArrowRight as LucideArrowRight } from "lucide-react"; 
import { Card, CardContent } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button"; 
import { Badge } from "@/components/ui/badge"; 
import { useI18n } from "@/lib/i18n";
  
export function Testimonials() { 
  const { t, lang } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null); 
  
  const testimonials = [ 
    { 
      name: t("testi.1.name"), 
      role: lang === "ja" ? "留学生" : "International Student", 
      content: t("testi.1.text"), 
      rating: 5, 
      avatar: "https://i.pravatar.cc/150?u=alex" 
    }, 
    { 
      name: t("testi.2.name"), 
      role: lang === "ja" ? "株式会社X 採用担当者" : "HR Manager, Company X", 
      content: t("testi.2.text"), 
      rating: 5, 
      avatar: "https://i.pravatar.cc/150?u=sarah" 
    }, 
    { 
      name: t("testi.3.name"), 
      role: lang === "ja" ? "飲食店経営者" : "Restaurant Owner", 
      content: t("testi.3.text"), 
      rating: 5, 
      avatar: "https://i.pravatar.cc/150?u=james" 
    }, 
    { 
      name: "Elena Rodriguez", 
      role: lang === "ja" ? "マーケティングディレクター" : "Marketing Director", 
      content: lang === "ja" ? "BASU LILAのサポートにより、日本でのビジネス展開が非常にスムーズに進みました。" : "Thanks to BASU LILA's support, our business expansion in Japan proceeded very smoothly.", 
      rating: 5, 
      avatar: "https://i.pravatar.cc/150?u=elena" 
    } 
  ];

  const scroll = (direction: 'left' | 'right') => { 
    if (scrollRef.current) { 
      const { scrollLeft, clientWidth } = scrollRef.current; 
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2; 
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' }); 
    } 
  }; 
  
  return ( 
    <section className="py-24 w-full bg-background overflow-hidden relative"> 
      <div className="mx-auto max-w-[1400px] px-4 mb-16 text-center"> 
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
        > 
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary font-black uppercase tracking-[0.2em] px-4 py-1.5"> 
            {lang === "ja" ? "お客様の声" : "Social Proof"}
          </Badge> 
        </motion.div> 
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black mb-4 tracking-tight font-mincho" 
        > 
          {lang === "ja" ? "信頼されるチームと共に" : "Trusted by Innovative Teams"}
        </motion.h2> 
      </div> 
  
      <div className="relative group max-w-[100vw] overflow-hidden"> 
        {/* Navigation Buttons */} 
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-[20] opacity-0 group-hover:opacity-100 transition-opacity duration-300"> 
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('left')} 
            className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-xl hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer" 
          > 
            <LucideArrowLeft className="w-6 h-6" /> 
          </Button> 
        </div> 
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-[20] opacity-0 group-hover:opacity-100 transition-opacity duration-300"> 
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('right')} 
            className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-xl hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer" 
          > 
            <LucideArrowRight className="w-6 h-6" /> 
          </Button> 
        </div> 
  
        <div 
          ref={scrollRef} 
          className="py-12 flex whitespace-nowrap gap-8 overflow-x-auto scroll-smooth no-scrollbar" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} 
        > 
          <div className="animate-marquee flex gap-8 hover:pause"> 
            {[...testimonials, ...testimonials, ...testimonials].map((t_item, i) => ( 
              <Card 
                key={i} 
                className="w-[280px] sm:w-[320px] flex-shrink-0 bg-muted/20 border-border/50 rounded-2xl backdrop-blur-sm transition-all hover:bg-muted/40 hover:border-primary/30 whitespace-normal p-0 overflow-hidden" 
              > 
                <CardContent className="p-5 sm:p-6"> 
                  <div className="flex gap-1 mb-3 sm:mb-4"> 
                    {[...Array(t_item.rating)].map((_, i) => ( 
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" /> 
                    ))} 
                  </div> 
                  <p className="text-xs sm:text-sm text-foreground/80 font-medium mb-5 sm:mb-6 leading-relaxed italic"> 
                    "{t_item.content}" 
                  </p> 
                  <div className="flex items-center gap-3 sm:gap-4"> 
                    <img 
                      src={t_item.avatar} 
                      alt={t_item.name} 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary/20" 
                    /> 
                    <div> 
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">{t_item.name}</h4> 
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{t_item.role}</p> 
                    </div> 
                  </div> 
                </CardContent> 
              </Card> 
            ))} 
          </div> 
        </div> 
  
        {/* Gradient Overlays */} 
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div> 
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div> 
      </div> 
    </section> 
  ); 
}
