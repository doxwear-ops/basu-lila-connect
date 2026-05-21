import { createFileRoute } from "@tanstack/react-router";
import { CompanyTable } from "@/components/CompanyTable";
import { Testimonials } from "@/components/Testimonials";
import office from "@/assets/Create_a_luxury_modern_office_202605171101.jpeg";
import representative from "@/assets/IMG-20260515-WA0006.jpg";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "会社概要 | 合同会社 BASU LILA" },
      { name: "description", content: "合同会社 BASU LILA の会社概要、企業理念、代表者メッセージ、拠点情報をご案内します。" },
    ],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  const { t } = useI18n();
  return (
    <div>
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-14 text-center">
          <h1 className="font-mincho text-3xl md:text-4xl tracking-widest">会社概要</h1>
          <p className="mt-3 text-xs md:text-sm text-muted-foreground">Company Profile</p>
        </div>
      </div>
      
      {/* CEO Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-[450px_1fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img src={representative} alt="Lamichhane Amrit" className="w-full border border-border shadow-lg" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary -z-10" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-mincho text-2xl md:text-4xl pb-4 border-b border-border inline-block">
              {t("section.ceo")}
            </h2>
            <div className="space-y-4">
              <div className="font-mincho">
                <p className="text-primary text-sm tracking-widest mb-1">{t("ceo.title")}</p>
                <p className="text-2xl md:text-3xl tracking-wider">{t("ceo.name")}</p>
              </div>
              <div className="font-mincho text-sm md:text-base leading-relaxed md:leading-loose text-foreground/80 space-y-4">
                <p>{t("ceo.bio.p1")}</p>
                <p>{t("ceo.bio.p2")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Table Section */}
      <section className="bg-secondary/20 border-y border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-24 grid gap-12 lg:grid-cols-[1.3fr_1fr] items-start">
          <div>
            <h2 className="font-mincho text-2xl md:text-3xl mb-8 pb-3 border-b border-border inline-block">
              {t("section.company")}
            </h2>
            <CompanyTable />
          </div>
          <img src={office} alt="オフィス" loading="lazy" className="w-full border border-border shadow-md" />
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
