import { createFileRoute } from "@tanstack/react-router";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import img from "@/assets/can_you_make_this_2K_202605151651.jpeg";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/food")({
  head: () => ({ 
    meta: [
      { title: "食料品販売 | 合同会社 BASU LILA" },
      { name: "description", content: "アジア各国の厳選されたスパイスや食材を販売。レストラン品質の業務用食材を小ロットからお届けします。" }
    ] 
  }),
  component: FoodPage,
});

function FoodPage() {
  const { t, lang } = useI18n();
  const features = [
    { ja: "アジア各国の厳選されたスパイス", en: "Selected Spices from Asia" },
    { ja: "レストラン品質の業務用食材", en: "Restaurant-Quality Ingredients" },
    { ja: "小ロットからの柔軟な注文対応", en: "Flexible Ordering (Small Lots)" },
    { ja: "安心の品質管理と鮮度維持", en: "Quality Control & Freshness" },
  ];

  return (
    <ServicePageLayout title="食料品販売" hero={img}>
      <p>当社では、アジア各国の食材・食品・スパイス・調味料を中心に、幅広い商品の販売を行っております。インド、ネパール、タイ、ベトナム、中国など、各地域の伝統的な食材を取り揃え、日本にお住まいの外国人の方々や、本格的な料理を楽しみたい日本のお客様にお届けしています。</p>
      <p>お米、豆類、香辛料、レトルト食品、調味料、麺類、菓子類など、家庭料理から本格的なレストラン仕入れまで対応可能な商品ラインナップを揃えております。</p>
      <p>また、業務用の卸販売、飲食店向けの定期仕入れ、個別注文への対応など、お客様のご要望に合わせた柔軟なサービスを提供しております。安全・安心な食品を、適正な価格でお届けすることをお約束いたします。</p>

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
          <h3 className="font-mincho text-xl mb-6 pb-2 border-b border-border">Product Gallery</h3>
          <div className="grid grid-cols-3 gap-3 not-prose">
            <img src={img} alt="" className="aspect-square object-cover border border-border" />
            <img src={img} alt="" className="aspect-square object-cover border border-border" />
            <img src={img} alt="" className="aspect-square object-cover border border-border" />
          </div>
        </section>
      </div>
    </ServicePageLayout>
  );
}
