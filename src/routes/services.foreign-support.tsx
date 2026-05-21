import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img from "@/assets/can_you_generate_this_a_202605171043.jpeg";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/foreign-support")({
  head: () => ({ 
    meta: [
      { title: "外国人支援業務 | 合同会社 BASU LILA" },
      { name: "description", content: "日本で生活・就労する外国人の皆様をサポート。安心できる環境づくりをお手伝いします。" }
    ] 
  }),
  component: ForeignSupportPage,
});

function ForeignSupportPage() {
  const { t, lang } = useI18n();
  const features = [
    { ja: "24時間緊急対応サポート", en: "24/7 Emergency Support" },
    { ja: "多言語による行政手続き代行", en: "Multilingual Administrative Procedures" },
    { ja: "住居探しから契約までの同行", en: "Housing Search & Contract Assistance" },
    { ja: "就労ビザ・資格変更の相談", en: "Visa & Status Change Consultation" },
  ];

  const flow = [
    { step: "01", ja: "お問い合わせ", en: "Contact Us" },
    { step: "02", ja: "ヒアリング・相談", en: "Consultation" },
    { step: "03", ja: "プラン提示・契約", en: "Plan & Contract" },
    { step: "04", ja: "支援開始", en: "Service Start" },
  ];

  return (
    <ServicePageLayout title="外国人支援事業" hero={img}>
      <p>日本で生活する外国人の方々が、安心して暮らし、働ける環境づくりを支援しています。来日直後の生活立ち上げから、長期滞在に伴う各種手続き、就労支援、住居探し、行政書類の作成補助まで、幅広くサポートいたします。</p>
      <p>多文化共生の視点から、言語・文化・制度の違いを乗り越えるための丁寧なご案内を行い、お一人おひとりに寄り添ったサポートを心がけております。</p>
      <p>企業様向けには、外国人雇用に関するご相談、雇用後の生活サポート、社内コミュニケーション支援など、外国人材の定着に向けたサービスもご提供しております。</p>

      <div className="mt-12 space-y-10">
        <section>
          <h3 className="font-mincho text-xl mb-6 pb-2 border-b border-border">{t("section.service.features")}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-secondary/30 p-4 border border-border">
                <CheckCircle2 size={18} className="text-primary shrink-0" />
                <span className="text-sm">{lang === "ja" ? f.ja : f.en}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-mincho text-xl mb-8 pb-2 border-b border-border">{t("section.service.flow")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flow.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-light text-primary/30 mb-2">{s.step}</div>
                <div className="font-mincho text-sm">{lang === "ja" ? s.ja : s.en}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ServicePageLayout>
  );
}
