import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img from "@/assets/can_you_generate_this_in_202605171046.jpeg";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/student-support")({
  head: () => ({ 
    meta: [
      { title: "留学生サポート | 合同会社 BASU LILA" },
      { name: "description", content: "留学相談から生活サポート、学生募集支援まで、留学生の日本での学びと生活をトータルにバックアップします。" }
    ] 
  }),
  component: StudentSupportPage,
});

function StudentSupportPage() {
  const { t, lang } = useI18n();
  const features = [
    { ja: "学校選びから出願までのトータル支援", en: "School Selection & Application Support" },
    { ja: "ビザ申請に関する専門的なアドバイス", en: "Expert Advice on Visa Applications" },
    { ja: "渡日直後の生活インフラ整備支援", en: "Post-Arrival Life Setup Support" },
    { ja: "アルバイト探しや進路相談", en: "Job Search & Career Consultation" },
  ];

  const flow = [
    { step: "01", ja: "留学相談", en: "Initial Consultation" },
    { step: "02", ja: "学校・プラン決定", en: "Select School/Plan" },
    { step: "03", ja: "出願・ビザ手続き", en: "Application & Visa" },
    { step: "04", ja: "日本での生活開始", en: "Start Life in Japan" },
  ];

  return (
    <ServicePageLayout title="留学生サポート" hero={img}>
      <p>日本での留学を志す学生の皆様に向けて、留学相談から渡日後の生活サポートまで、一貫した支援を行っております。学校選び、出願書類の準備、ビザ申請のご案内、住居の確保、銀行口座や携帯電話などの生活インフラ整備まで、安心して学業に専念できる環境づくりをお手伝いします。</p>
      <p>また、日本語学校・専門学校・大学などの教育機関向けに、留学生募集のサポートや、入学後の生活相談窓口の代行業務も承っております。</p>
      <p>「学びたい」という気持ちを大切に、留学生の皆様の夢の実現を、誠実にサポートしてまいります。</p>

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
