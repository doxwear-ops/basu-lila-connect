import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { BusinessCards } from "@/components/BusinessCards";
import { CompanyTable } from "@/components/CompanyTable";
import { Testimonials } from "@/components/Testimonials";
import { useI18n } from "@/lib/i18n";
import office from "@/assets/Create_a_luxury_modern_office_202605171101.jpeg";
import representative from "@/assets/IMG-20260515-WA0006.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "合同会社 BASU LILA — 公式サイト" },
      { name: "description", content: "食とサービスを通じて地域社会に貢献。食品販売、飲食店、通訳・翻訳、外国人支援など、多岐にわたる事業を展開しています。" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  return (
    <div>
      <HeroSlider />
      <BusinessCards />

      {/* Greeting */}
      <section className="bg-secondary border-y border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-6 py-14 md:py-20 grid gap-8 md:gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          <img src={representative} alt="representative" loading="lazy" className="w-full border border-border" />
          <div>
            <h2 className="font-mincho text-xl md:text-3xl mb-5 md:mb-6 pb-3 border-b border-border inline-block">{t("section.greeting")}</h2>
            <div className="space-y-3 md:space-y-4 text-sm leading-relaxed md:leading-loose text-foreground/90 font-mincho">
              <p>{t("greet.p1")}</p>
              <p>{t("greet.p2")}</p>
              <p>{t("greet.p3")}</p>
              <p>{t("greet.p4")}</p>
              <p>{t("greet.p5")}</p>
              <p>{t("greet.p6")}</p>
              <p className="text-right pt-2">{t("greet.signature")}</p>
            </div>
            <Link
              to="/company"
              className="mt-6 md:mt-8 inline-flex items-center gap-2 border border-border bg-background px-5 py-2.5 text-xs hover:bg-foreground hover:text-background transition-colors"
            >
              {t("common.more")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Company info */}
        <section className="mx-auto max-w-[1400px] px-5 md:px-6 py-14 md:py-20 grid gap-8 md:gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
          <div>
            <h2 className="font-mincho text-xl md:text-3xl mb-5 md:mb-6 pb-3 border-b border-border inline-block">{t("section.company")}</h2>
            <CompanyTable />
          </div>
          <img src={office} alt="office" loading="lazy" className="w-full border border-border" />
        </section>

      <Testimonials />
    </div>
  );
}
