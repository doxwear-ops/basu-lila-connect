import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { businesses } from "@/components/BusinessCards";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({ 
    title: "サービス一覧 | 合同会社 BASU LILA",
    meta: [
      { name: "description", content: "合同会社 BASU LILA が提供する食品販売、飲食店運営、通訳・翻訳、外国人・留学生支援サービスの一覧です。" }
    ] 
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const { t, lang } = useI18n();
  return (
    <div className="bg-background">
      {/* Header Section */}
      <div className="bg-secondary/50 border-b border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-6 py-16 md:py-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mincho text-4xl md:text-6xl tracking-widest mb-6"
          >
            {t("nav.services")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl font-mincho text-sm md:text-lg leading-relaxed text-foreground/80"
          >
            {t("section.services.intro")}
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {businesses.map((b, i) => (
            <motion.div
              key={b.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link 
                to={b.href} 
                className="group block overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:border-primary/20"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={b.src} 
                    alt={t(b.titleKey)} 
                    loading="lazy" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-xs tracking-widest uppercase">{t("common.more")}</span>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="font-mincho text-2xl md:text-3xl tracking-wide group-hover:text-primary transition-colors">
                      {t(b.titleKey)}
                    </h2>
                    <ArrowRight className="text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" size={24} />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed md:leading-loose line-clamp-3">
                    {t(b.descKey)}
                  </p>
                  <div className="mt-8 inline-flex items-center text-xs font-semibold tracking-widest uppercase border-b border-primary pb-1 group-hover:border-primary/0 transition-all">
                    {t("services.explore")}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-foreground text-background py-20">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h2 className="font-mincho text-3xl md:text-4xl mb-8 tracking-widest">
            {t("services.cta_text")}
          </h2>
          <Link
            to="/contact"
            className="inline-block border border-background px-10 py-4 text-sm tracking-widest hover:bg-background hover:text-foreground transition-all duration-300"
          >
            {t("nav.contact")}
          </Link>
        </div>
      </section>
    </div>
  );
}

