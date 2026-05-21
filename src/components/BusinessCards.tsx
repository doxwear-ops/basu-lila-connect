import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import grocery from "@/assets/can_you_make_this_2K_202605151651.jpeg";
import restaurant from "@/assets/biz-restaurant.jpg";
import translation from "@/assets/can_you_generate_this_in_202605171041.jpeg";
import support from "@/assets/can_you_generate_this_a_202605171043.jpeg";
import students from "@/assets/can_you_generate_this_in_202605171046.jpeg";

export const businesses = [
  { id: 1, href: "/services/food", src: grocery, titleKey: "biz.food.title", descKey: "biz.food.desc" },
  { id: 2, href: "/services/restaurant", src: restaurant, titleKey: "biz.restaurant.title", descKey: "biz.restaurant.desc" },
  { id: 3, href: "/services/translation", src: translation, titleKey: "biz.translation.title", descKey: "biz.translation.desc" },
  { id: 4, href: "/services/foreign-support", src: support, titleKey: "biz.support.title", descKey: "biz.support.desc" },
  { id: 5, href: "/services/student-support", src: students, titleKey: "biz.students.title", descKey: "biz.students.desc" },
] as const;

export function BusinessCards() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-6 py-14 md:py-20 overflow-hidden">
      <h2 className="section-title">{t("section.businesses")}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mt-10">
        {businesses.map((b, i) => (
          <motion.div
            key={b.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link
              to={b.href}
              className="group block border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={b.src}
                  alt={t(b.titleKey)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <div className="font-mincho text-sm md:text-base mb-2">{t(b.titleKey)}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{t(b.descKey)}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
