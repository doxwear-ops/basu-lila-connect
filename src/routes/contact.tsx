import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "お問い合わせ — 合同会社 BASU LILA" },
      { name: "description", content: "ご相談・お見積りなど、BASU LILA LLC へのお問い合わせはこちらから。" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-14 text-center">
          <h1 className="font-mincho text-3xl md:text-4xl tracking-widest">お問い合わせ</h1>
          <p className="mt-3 text-xs md:text-sm text-muted-foreground">Contact</p>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 py-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-mincho text-xl mb-6 pb-3 border-b border-border">お問い合わせフォーム</h2>
          {sent ? (
            <div className="border border-border p-8 text-center">
              <p className="font-mincho">送信ありがとうございました。</p>
              <p className="text-xs text-muted-foreground mt-2">担当者よりご連絡いたします。</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-5 text-sm"
            >
              <div>
                <label className="block mb-2 text-xs">お名前 <span className="text-accent">*</span></label>
                <input required className="w-full border border-border px-3 py-2.5 bg-background focus:outline-none focus:border-foreground" />
              </div>
              <div>
                <label className="block mb-2 text-xs">メールアドレス <span className="text-accent">*</span></label>
                <input type="email" required className="w-full border border-border px-3 py-2.5 bg-background focus:outline-none focus:border-foreground" />
              </div>
              <div>
                <label className="block mb-2 text-xs">電話番号</label>
                <input className="w-full border border-border px-3 py-2.5 bg-background focus:outline-none focus:border-foreground" />
              </div>
              <div>
                <label className="block mb-2 text-xs">お問い合わせ内容 <span className="text-accent">*</span></label>
                <textarea required rows={6} className="w-full border border-border px-3 py-2.5 bg-background focus:outline-none focus:border-foreground" />
              </div>
              <button type="submit" className="w-full bg-foreground text-background py-3 text-sm tracking-widest hover:bg-foreground/80 transition-colors">
                送信する
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="font-mincho text-xl mb-6 pb-3 border-b border-border">会社情報</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-muted-foreground" /> <span>4-3-5 Aarigin, Osaka City, Osaka, Japan</span></li>
            <li className="flex items-center gap-3"><Phone size={18} className="text-muted-foreground" /> <a href="tel:+819018566119">+81 90-1856-6119</a></li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-muted-foreground" /> <a href="mailto:info@basulilallc.com">info@basulilallc.com</a></li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://wa.me/819018566119" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-border py-3 text-xs hover:bg-secondary transition-colors">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href="mailto:info@basulilallc.com" className="flex-1 flex items-center justify-center gap-2 border border-border py-3 text-xs hover:bg-secondary transition-colors">
              <Mail size={16} /> Email
            </a>
          </div>
          <div className="border border-border overflow-hidden">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=合同会社+BASU+LILA+大阪市阿倍野区&output=embed"
              className="w-full h-[280px] md:h-[350px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
