import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import h1 from "@/assets/hero-osaka.jpg";
import h2 from "@/assets/biz-restaurant.jpg";
import h3 from "@/assets/can_you_make_this_2K_202605151651.jpeg";
import h4 from "@/assets/can_you_generate_this_in_202605171041.jpeg";
import h5 from "@/assets/can_you_generate_this_in_202605171046.jpeg";

const slides = [h1, h2, h3, h4, h5];

export function HeroSlider() {
  const { t } = useI18n();
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        className="h-[320px] sm:h-[380px] md:h-[450px] lg:h-[520px]"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <img src={src} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/55 to-white/10 md:to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-12">
          <div className="max-w-xl">
            <h1 className="font-mincho text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-tight text-foreground tracking-wide">
              {t("hero.title")}
            </h1>
            <p className="font-mincho mt-3 md:mt-6 text-[11px] sm:text-xs md:text-sm leading-relaxed md:leading-loose text-foreground/85">
              {t("hero.sub")}
            </p>
            <div className="pointer-events-auto mt-5 md:mt-8 flex flex-wrap gap-3">
              <Link
                to="/business"
                className="border border-foreground/80 bg-background px-4 md:px-5 py-2 md:py-2.5 text-[11px] md:text-xs tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                {t("hero.cta1")}
              </Link>
              <Link
                to="/contact"
                className="bg-foreground text-background px-4 md:px-5 py-2 md:py-2.5 text-[11px] md:text-xs tracking-wider hover:bg-foreground/80 transition-colors"
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button className="hero-prev hidden md:block absolute left-2 md:left-6 top-1/2 z-20 -translate-y-1/2 p-2 text-foreground/60 hover:text-foreground transition-colors">
        <ChevronLeft size={32} strokeWidth={1} />
      </button>
      <button className="hero-next hidden md:block absolute right-2 md:right-6 top-1/2 z-20 -translate-y-1/2 p-2 text-foreground/60 hover:text-foreground transition-colors">
        <ChevronRight size={32} strokeWidth={1} />
      </button>
    </section>
  );
}
