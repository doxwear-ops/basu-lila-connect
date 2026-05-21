import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Mail } from "lucide-react";

interface ServicePageProps {
  title: string;
  hero: string;
  children: ReactNode;
}

export function ServicePageLayout({ title, hero, children }: ServicePageProps) {
  return (
    <div>
      <div className="relative h-[260px] md:h-[360px] w-full overflow-hidden">
        <img src={hero} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1400px] px-6 pb-10">
            <h1 className="font-mincho text-3xl md:text-5xl text-white tracking-widest">{title}</h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-12 md:py-20 grid gap-12 lg:grid-cols-[1fr_260px]">
        <article className="prose-content space-y-6 text-sm md:text-base leading-loose text-foreground/90 font-mincho">
          {children}
        </article>
        <aside className="space-y-6">
          <div className="border border-border p-5">
            <div className="font-mincho text-sm mb-4 pb-3 border-b border-border">サービス一覧</div>
            <ul className="space-y-3 text-xs">
              <li><Link to="/services/food" className="link-underline">食料品販売</Link></li>
              <li><Link to="/services/restaurant" className="link-underline">飲食店運営</Link></li>
              <li><Link to="/services/translation" className="link-underline">通訳・翻訳サービス</Link></li>
              <li><Link to="/services/foreign-support" className="link-underline">外国人支援業務</Link></li>
              <li><Link to="/services/student-support" className="link-underline">留学生サポート</Link></li>
            </ul>
          </div>
          <div className="border border-border p-5 bg-secondary">
            <div className="font-mincho text-sm mb-3">お問い合わせ</div>
            <p className="text-xs text-muted-foreground mb-4">ご相談・お見積りはお気軽に。</p>
            <div className="space-y-2 text-xs">
              <a href="tel:+819018566119" className="flex items-center gap-2"><Phone size={12} /> +81 90-1856-6119</a>
              <a href="mailto:info@basulilallc.com" className="flex items-center gap-2"><Mail size={12} /> info@basulilallc.com</a>
            </div>
            <Link to="/contact" className="mt-4 inline-block w-full text-center bg-foreground text-background py-2 text-xs hover:bg-foreground/80 transition-colors">
              お問い合わせフォーム
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
