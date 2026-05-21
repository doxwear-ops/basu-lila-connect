      import { createFileRoute } from "@tanstack/react-router";
import { BusinessCards } from "@/components/BusinessCards";
import { useI18n } from "@/lib/i18n";
import { Globe, Users, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/business")({
  head: () => ({
    meta: [
      { title: "事業内容 | 合同会社 BASU LILA" },
      { name: "description", content: "BASU LILA LLC の多角的な事業内容をご紹介します。食品販売、飲食店運営、通訳・翻訳サービス、外国人・留学生支援など。" },
    ],
  }),
  component: BusinessPage,
});

function BusinessPage() {
  const { t } = useI18n();
  const strengths = [
    { icon: <Globe className="text-primary" size={28} />, title: t("strength.1.title"), desc: t("strength.1.desc") },
    { icon: <Users className="text-primary" size={28} />, title: t("strength.2.title"), desc: t("strength.2.desc") },
    { icon: <ShieldCheck className="text-primary" size={28} />, title: t("strength.3.title"), desc: t("strength.3.desc") },
  ];

  return (
    <div>
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-14 text-center">
          <h1 className="font-mincho text-3xl md:text-4xl tracking-widest">事業内容</h1>
          <p className="mt-3 text-xs md:text-sm text-muted-foreground">Our Business</p>
        </div>
      </div>

      <div className="mx-auto max-w-[800px] px-6 py-12 md:py-16 text-center">
        <p className="font-mincho text-sm md:text-base leading-relaxed md:leading-loose text-foreground/80">
          {t("section.business.intro")}
        </p>
      </div>

      <BusinessCards />

      {/* Strengths Section */}
      <section className="bg-secondary/30 py-16 md:py-24 mt-10 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <h2 className="section-title text-center mb-12 md:mb-16">{t("section.business.strengths")}</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {strengths.map((s, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border mb-2">
                  {s.icon}
                </div>
                <h3 className="font-mincho text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
