import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img from "@/assets/can_you_generate_this_in_202605171041.jpeg";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/translation")({
  head: () => ({ 
    meta: [
      { title: "通訳・翻訳サービス | 合同会社 BASU LILA" },
      { name: "description", content: "多言語対応の通訳・翻訳サービス。ビジネスから日常的な相談まで、正確で信頼性の高いコミュニケーションをサポートします。" }
    ] 
  }),
  component: TranslationPage,
});

function TranslationPage() {
  const { t, lang } = useI18n();
  const features = [
    { ja: "専門性の高いビジネス通訳", en: "Professional Business Interpretation" },
    { ja: "法的・行政書類の正確な翻訳", en: "Accurate Legal/Admin Translation" },
    { ja: "ネイティブによる校正と品質管理", en: "Native Proofreading & QC" },
    { ja: "機密情報の厳重な取り扱い", en: "Strict Confidentiality" },
  ];

  return (
    <ServicePageLayout title="通訳・翻訳サービス" hero={img}>
      <p>当社では、日本語・英語・ネパール語・ヒンディー語に対応した通訳・翻訳サービスを提供しております。企業様のビジネス通訳から、個人のお客様の生活サポートまで、幅広いニーズにお応えいたします。</p>
      <p>商談通訳、契約書翻訳、Webサイト翻訳、行政手続きの同行通訳、医療機関での通訳、教育関係の通訳など、専門性の高い分野でも経験豊富なスタッフが対応いたします。</p>
      <p>正確な言語変換だけでなく、文化的背景を踏まえたコミュニケーション支援を心がけ、お客様同士の円滑な意思疎通を支援いたします。</p>

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
          <h3 className="font-mincho text-xl mb-6 pb-2 border-b border-border">Languages</h3>
          <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
            {["日本語", "English", "नेपाली", "हिन्दी"].map((l) => (
              <div key={l} className="border border-border py-6 font-mincho text-sm">{l}</div>
            ))}
          </div>
        </section>
      </div>
    </ServicePageLayout>
  );
}
