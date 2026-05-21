import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/Untitled design (3).webp";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-footer border-t border-border mt-16 md:mt-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-6 py-10 md:py-14 grid gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <img src={logo} alt="BASU LILA" className="h-16 md:h-20 w-auto object-contain mb-4" />
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">{t("footer.about")}</p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-4">{t("footer.sitemap")}</div>
          <ul className="space-y-2.5 text-xs text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">{t("nav.home")}</Link></li>
            <li><Link to="/business" className="hover:text-foreground transition-colors">{t("nav.business")}</Link></li>
            <li><Link to="/company" className="hover:text-foreground transition-colors">{t("nav.company")}</Link></li>
            <li><Link to="/access" className="hover:text-foreground transition-colors">{t("nav.access")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold mb-4">{t("nav.services")}</div>
          <ul className="space-y-2.5 text-xs text-muted-foreground">
            <li><Link to="/services/food" className="hover:text-foreground transition-colors">{t("biz.food.title")}</Link></li>
            <li><Link to="/services/restaurant" className="hover:text-foreground transition-colors">{t("biz.restaurant.title")}</Link></li>
            <li><Link to="/services/translation" className="hover:text-foreground transition-colors">{t("biz.translation.title")}</Link></li>
            <li><Link to="/services/foreign-support" className="hover:text-foreground transition-colors">{t("biz.support.title")}</Link></li>
            <li><Link to="/services/student-support" className="hover:text-foreground transition-colors">{t("biz.students.title")}</Link></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <div className="text-sm font-semibold mb-4">{t("footer.contact")}</div>
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 shrink-0" /> <span>4-3-5 Aarigin, Osaka City, Osaka, Japan</span></li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} /> 
              <a href="tel:+819018566119" className="hover:text-foreground transition-colors">+81 90-1856-6119</a>
            </li>
            <li className="flex items-center gap-2.5 break-all">
              <Mail size={14} /> 
              <a href="mailto:info@basulilallc.com" className="hover:text-foreground transition-colors">info@basulilallc.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-4 text-xs text-center text-muted-foreground">
          {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
