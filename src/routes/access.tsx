import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Train, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-osaka.jpg";

export const Route = createFileRoute("/access")({
  head: () => ({
    title: "アクセス | 合同会社 BASU LILA",
    meta: [
      { name: "description", content: "合同会社 BASU LILA へのアクセス方法。大阪市阿倍野区の事務所への地図と交通手段をご案内します。" },
    ],
  }),
  component: AccessPage,
});

function AccessPage() {
  const { t, lang } = useI18n();
  
  const transportItems = [
    t("access.train.1"),
    t("access.train.2"),
    t("access.train.3"),
  ];

  return (
    <div className="bg-background">
      {/* Hero Header */}
      <div className="relative h-[400px] md:h-[550px] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={heroImg} alt="Osaka City" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-6"
          >
            {t("access.visit_us")}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-mincho text-4xl md:text-7xl text-white tracking-[0.1em] mb-8"
          >
            {t("nav.access")}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-20 h-0.5 bg-primary mx-auto mb-8"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto max-w-2xl font-mincho text-sm md:text-lg leading-relaxed text-white/90"
          >
            {t("access.intro")}
          </motion.p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-[1fr_1.5fr] items-start">
        {/* Info Cards */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group p-8 bg-card border border-border/60 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/5 rounded-lg">
                <MapPin className="text-primary" size={24} />
              </div>
              <h2 className="font-mincho text-xl tracking-wider">{t("access.address.label")}</h2>
            </div>
            <p className="text-sm md:text-base leading-loose text-foreground/80 mb-6">
              4-3-5 Aarigin, Osaka City, Osaka, Japan
            </p>
            <a 
              href="https://www.google.com/maps?q=合同会社+BASU+LILA+大阪市阿倍野区" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3 transition-all"
            >
              {t("access.open_maps")} <ExternalLink size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group p-8 bg-card border border-border/60 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/5 rounded-lg">
                <Train className="text-primary" size={24} />
              </div>
              <h2 className="font-mincho text-xl tracking-wider">{t("access.transport.label")}</h2>
            </div>
            <ul className="space-y-4">
              {transportItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-sm md:text-base text-foreground/80 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group p-8 bg-card border border-border/60 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/5 rounded-lg">
                <Clock className="text-primary" size={24} />
              </div>
              <h2 className="font-mincho text-xl tracking-wider">{t("access.hours.label")}</h2>
            </div>
            <div className="space-y-2">
              <p className="text-sm md:text-base text-foreground/80">{t("access.hours.value")}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                {t("access.hours.note")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative h-full min-h-[500px] border border-border/60 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-secondary/10 animate-pulse -z-10" />
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=合同会社+BASU+LILA+大阪市阿倍野区&output=embed"
            className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>

      {/* Footer CTA */}
      <section className="bg-secondary/30 border-t border-border py-20 text-center">
        <div className="mx-auto max-w-[1400px] px-6">
          <h2 className="font-mincho text-2xl md:text-3xl mb-8 tracking-widest uppercase">
            {lang === "ja" ? "お越しをお待ちしております" : "We look forward to your visit"}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+819018566119" 
              className="bg-foreground text-background px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-foreground/80 transition-all"
            >
              {t("access.call_directions")}
            </a>
            <a 
              href="/contact" 
              className="border border-border bg-background px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-all"
            >
              {t("nav.contact")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
