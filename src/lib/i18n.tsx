import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "ja" | "en";

const dict = {
  // Nav
  "nav.home": { ja: "ホーム", en: "Home" },
  "nav.business": { ja: "事業内容", en: "Business" },
  "nav.services": { ja: "サービス", en: "Services" },
  "section.services.intro": { 
    ja: "BASU LILAでは、日本で生活する外国人の方々や地域社会のニーズに寄り添い、多角的なサービスを提供しています。食文化の提供から言語サポート、生活基盤の構築まで、皆様の「日本での暮らし」をトータルで支えます。", 
    en: "At BASU LILA, we provide multifaceted services that cater to the needs of foreign residents and local communities in Japan. From providing food culture to language support and building a foundation for life, we support your \"life in Japan\" in total." 
  },
  "nav.company": { ja: "会社概要", en: "Company" },
  "nav.access": { ja: "アクセス", en: "Access" },
  "access.intro": { 
    ja: "大阪市内の閑静な住宅街にオフィスを構えております。JR大阪駅や主要な地下鉄駅からのアクセスも良く、お気軽にお越しいただけます。道順が不明な場合は、お電話にてご案内いたします。", 
    en: "Our office is located in a quiet residential area in Osaka City. It is easily accessible from JR Osaka Station and major subway stations. If you are unsure of the directions, please call us for guidance." 
  },
  "access.address.label": { ja: "所在地", en: "Address" },
  "access.transport.label": { ja: "交通アクセス", en: "Transportation" },
  "access.hours.label": { ja: "営業時間", en: "Business Hours" },
  "access.train.1": { ja: "JR大阪駅より車で約15分", en: "Approx. 15 mins by car from JR Osaka Station" },
  "access.train.2": { ja: "地下鉄御堂筋線「本町駅」より徒歩圏内", en: "Within walking distance from Hommachi Station (Midosuji Line)" },
  "access.train.3": { ja: "関西国際空港より電車で約60分", en: "Approx. 60 mins by train from Kansai International Airport" },
  "access.hours.value": { ja: "平日 9:00〜18:00", en: "Weekdays 9:00 AM - 6:00 PM" },
  "access.hours.note": { ja: "（土日・祝日定休）", en: "(Closed on Sat, Sun, and Holidays)" },
  "access.open_maps": { ja: "Googleマップで見る", en: "Open in Google Maps" },
  "access.visit_us": { ja: "オフィスにお越しください", en: "Visit Our Office" },
  "access.call_directions": { ja: "電話で道順を聞く", en: "Call for Directions" },
  "nav.contact": { ja: "お問い合わせ", en: "Contact" },

  // Brand
  "brand.name": { ja: "合同会社 BASU LILA", en: "BASU LILA LLC" },
  "brand.tagline": { ja: "安心・信頼・つながり", en: "Trust · Reliability · Connection" },

  // Hero
  "hero.title": { ja: "安心・信頼・つながりを大切に", en: "Trust, Reliability & Connection" },
  "hero.sub": {
    ja: "食とサービスを通じて地域社会に貢献し、日本で生活する外国人の方々、留学生の皆様、そして企業様の支えとなれる企業を目指します。",
    en: "Through food and services, we contribute to local communities and support foreign residents, international students, and businesses living in Japan.",
  },
  "hero.cta1": { ja: "サービスを見る", en: "Our Services" },
  "hero.cta2": { ja: "お問い合わせ", en: "Contact Us" },

  // Sections
  "section.businesses": { ja: "主な事業内容", en: "Our Businesses" },
  "section.greeting": { ja: "ご挨拶", en: "Greeting" },
  "section.company": { ja: "会社概要", en: "Company Profile" },
  "section.ceo": { ja: "代表挨拶・プロフィール", en: "CEO Message & Profile" },
  "ceo.name": { ja: "ラミチャネ アムリット", en: "Lamichhane Amrit" },
  "ceo.title": { ja: "合同会社 BASU LILA 代表社員", en: "CEO, BASU LILA LLC" },
  "ceo.bio.p1": { 
    ja: "ネパール出身。来日後、日本での生活やビジネスを通じて、多文化共生の大切さを実感。自身の経験を活かし、日本で挑戦する外国人や留学生、そして彼らを支える地域社会や企業のために貢献したいという想いから、BASU LILAを設立しました。", 
    en: "Originally from Nepal. After coming to Japan, I realized the importance of multicultural coexistence through my daily life and business experiences. I founded BASU LILA with the desire to use my experience to contribute to foreign residents, international students, and the local communities and companies that support them." 
  },
  "ceo.bio.p2": { 
    ja: "「安心・信頼・つながり」を理念に掲げ、食料品販売から通訳、生活支援まで、一人ひとりに寄り添った誠実なサポートを提供することをお約束します。日本と世界の架け橋となり、誰もが自分らしく輝ける社会を目指してまいります。", 
    en: "With the philosophy of \"Trust, Reliability, and Connection,\" we promise to provide sincere support tailored to each individual, from food sales to interpretation and life support. We aim to be a bridge between Japan and the world, striving for a society where everyone can shine in their own way." 
  },
  "section.business.intro": { 
    ja: "私たちは、食、サービス、そして言語サポートを通じて、日本で生活する皆様の毎日を豊かにし、安心をお届けすることを目指しています。多様なニーズにお応えするため、以下の5つの主要事業を展開しております。", 
    en: "We aim to enrich the daily lives of everyone living in Japan and provide peace of mind through food, services, and language support. To meet diverse needs, we operate the following five main businesses." 
  },
  "section.business.strengths": { ja: "当社の強み", en: "Our Strengths" },
  "strength.1.title": { ja: "多言語対応と深い文化理解", en: "Multilingual & Cultural Understanding" },
  "strength.1.desc": { ja: "日本語、英語、ネパール語、ヒンディー語に対応。単なる翻訳ではなく、文化的背景を汲み取った丁寧なコミュニケーションを実現します。", en: "Supporting Japanese, English, Nepali, and Hindi. We go beyond translation to ensure communication that respects cultural backgrounds." },
  "strength.2.title": { ja: "実体験に基づく確かなサポート", en: "Support Based on Experience" },
  "strength.2.desc": { ja: "自社での店舗運営や外国人支援の実績から得た、現場目線のノウハウを提供します。留学生や外国人居住者の視点に立った親身な対応が可能です。", en: "We provide know-how gained from our own restaurant operations and support services. We offer sincere support from the perspective of residents and students." },
  "strength.3.title": { ja: "安心・信頼のネットワーク", en: "Trusted Network" },
  "strength.3.desc": { ja: "地域社会や教育機関、行政との連携を大切にし、法的な手続きから日々の生活相談まで、一貫して任せられる体制を整えています。", en: "We value connections with local communities, schools, and government offices, providing a system you can trust for everything from legal procedures to daily life." },
  "section.service.features": { ja: "サービスの特徴", en: "Key Features" },
  "section.service.flow": { ja: "ご利用の流れ", en: "Process Flow" },
  "section.testimonials": { ja: "お客様の声", en: "Testimonials" },
  "common.more": { ja: "詳しく見る", en: "Read More" },
  "services.explore": { ja: "サービスを見る", en: "Explore Service" },
  "services.cta_text": { ja: "お気軽にご相談ください", en: "Have a question? Contact us today." },

  // Testimonials
  "testi.1.name": { ja: "A.K 様 (留学生)", en: "Mr. A.K (International Student)" },
  "testi.1.text": { 
    ja: "日本への留学手続きから生活の立ち上げまで、親身になってサポートしていただきました。言葉の不安もありましたが、母国語で相談できたのがとても心強かったです。", 
    en: "They provided great support for everything from my study abroad application to setting up my life in Japan. Being able to consult in my native language was very reassuring." 
  },
  "testi.2.name": { ja: "株式会社X 採用担当者様", en: "HR Manager, Company X" },
  "testi.2.text": { 
    ja: "外国人採用に関する相談や、入社後の通訳サポートをお願いしています。文化の違いを理解した上での的確なアドバイスにいつも助けられています。", 
    en: "We rely on them for consulting on hiring foreign talent and interpretation support after they join. Their precise advice, based on a deep understanding of cultural differences, is always helpful." 
  },
  "testi.3.name": { ja: "M.S 様 (飲食店経営)", en: "Ms. M.S (Restaurant Owner)" },
  "testi.3.text": { 
    ja: "スパイスや調味料の仕入れでお世話になっています。品質が良く、急な注文にも柔軟に対応してくれるので、安心して任せられます。", 
    en: "They help us with sourcing spices and seasonings. The quality is excellent, and they are flexible even with urgent orders, so I can trust them completely." 
  },

  // Greeting paragraphs
  "greet.p1": {
    ja: "合同会社BASU LILAのホームページをご覧いただき、誠にありがとうございます。",
    en: "Thank you for visiting the website of BASU LILA LLC.",
  },
  "greet.p2": {
    ja: "私たちは、食・サービス・言語サポートを通じて、日本で生活する外国人の方々や地域社会に貢献できる企業を目指しております。",
    en: "We strive to contribute to local communities and foreign residents in Japan through food, services, and language support.",
  },
  "greet.p3": {
    ja: "これまでの経験を通じて、人とのつながりや信頼の大切さを学び、一つひとつの出会いを大切にしながら事業を積み重ねてまいりました。",
    en: "Through our experience, we have learned the value of human connection and trust, building our business one relationship at a time.",
  },
  "greet.p4": {
    ja: "現在は、食品販売、飲食事業、通訳・翻訳サービスなど、生活に身近な分野を中心に、安心してご利用いただけるサービスづくりに取り組んでおります。",
    en: "Today we focus on food sales, restaurants, and translation services — areas close to daily life — to deliver services you can rely on.",
  },
  "greet.p5": {
    ja: "これからも「安心・信頼・つながり」を大切にし、皆様のお役に立てる企業として、誠実に成長を続けてまいります。",
    en: "We will continue to grow sincerely, valuing trust, reliability, and connection to be a company that serves you well.",
  },
  "greet.p6": {
    ja: "今後ともご支援、ご愛顧を賜りますようお願い申し上げます。",
    en: "We sincerely appreciate your continued support.",
  },
  "greet.signature": { ja: "代表社員　ラミチャネ アムリット", en: "Representative · Lamichhane Amrit" },

  // Business cards
  "biz.food.title": { ja: "食料品販売", en: "Food Retail" },
  "biz.food.desc": { ja: "アジア食品をはじめ、様々な食品を販売しています。", en: "We sell Asian groceries and a wide range of food products." },
  "biz.restaurant.title": { ja: "飲食店運営", en: "Restaurant" },
  "biz.restaurant.desc": { ja: "美味しい料理と心のこもったサービスを提供しています。", en: "Delicious food served with heartfelt hospitality." },
  "biz.translation.title": { ja: "通訳・翻訳サービス", en: "Interpretation & Translation" },
  "biz.translation.desc": { ja: "企業様や個人のお客様向けに通訳・翻訳サービスを提供します。", en: "Professional interpretation and translation for businesses and individuals." },
  "biz.support.title": { ja: "外国人支援業務", en: "Foreign Resident Support" },
  "biz.support.desc": { ja: "日本での生活や就労をサポートし、安心できる環境づくりを支援します。", en: "Supporting daily life and employment for foreign residents in Japan." },
  "biz.students.title": { ja: "留学生サポート", en: "Student Support" },
  "biz.students.desc": { ja: "留学相談や生活サポート、学生募集支援を行っています。", en: "Study-abroad consulting, life support, and student recruitment assistance." },

  // Footer
  "footer.about": { ja: "食・サービス・言語サポートを通じて、地域社会と外国人の皆様に貢献します。", en: "Contributing to local communities and foreign residents through food, services, and language support." },
  "footer.sitemap": { ja: "サイトマップ", en: "Sitemap" },
  "footer.contact": { ja: "お問い合わせ", en: "Contact" },
  "footer.rights": { ja: "© 2026 BASU LILA LLC. All Rights Reserved.", en: "© 2026 BASU LILA LLC. All Rights Reserved." },
} as const;

type Key = keyof typeof dict;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key | string) => string }>({
  lang: "ja",
  setLang: () => {},
  t: (k) => String(k),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ja");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (saved === "ja" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const t = (k: Key | string) => (dict as Record<string, { ja: string; en: string }>)[k]?.[lang] ?? String(k);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
