import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img from "@/assets/biz-restaurant.jpg";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/restaurant")({
  head: () => ({ 
    meta: [
      { title: "飲食店運営 | 合同会社 BASU LILA" },
      { name: "description", content: "本格的なアジア料理を提供するレストランの運営。心温まるサービスと最高の味をお届けします。" }
    ] 
  }),
  component: RestaurantPage,
});

function RestaurantPage() {
  const { t, lang } = useI18n();
  const features = [
    { ja: "本格的なインド・ネパール料理", en: "Authentic Indo-Nepali Cuisine" },
    { ja: "地域に根ざした親しみやすい接客", en: "Friendly Community-Focused Service" },
    { ja: "衛生管理と品質へのこだわり", en: "Commitment to Hygiene & Quality" },
    { ja: "飲食店の開業・運営サポート", en: "Restaurant Opening & Ops Support" },
  ];

  return (
    <ServicePageLayout title="飲食店運営" hero={img}>
      <p>当社では、インド・ネパール料理店の運営を通じて、本格的な料理とサービスを地域の皆様に提供しております。食を通じた文化交流や地域とのつながりを大切にし、安心してご利用いただける店舗づくりに取り組んでおります。</p>
      <p>また、これまでの飲食業に関する経験や実務知識を活かし、これから飲食店の開業を目指す方や、運営面で課題を抱える事業者様に向けたサポートも行っております。</p>
      <p>店舗立ち上げに関する基本的な流れや準備、営業許可、仕入れ、メニュー構成、スタッフ管理、接客対応、外国人スタッフとのコミュニケーション支援など、実際の現場経験に基づいたアドバイスを提供しております。</p>
      <p>今後も、飲食事業を通じて地域社会への貢献を目指すとともに、安心・信頼を大切にしたサービス提供に努めてまいります。</p>

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
      </div>
    </ServicePageLayout>
  );
}
