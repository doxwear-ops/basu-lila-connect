import { Link, useNavigate } from "@tanstack/react-router";
import { Phone, Mail, Menu, X, Home, Briefcase, Settings, Users, MapPin, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logo from "@/assets/Untitled design (3).webp";
import { DynamicNavigation } from "./DynamicNavigation";
import { HamburgerMenuOverlay } from "./HamburgerMenuOverlay";

const links = [
  { to: "/", key: "nav.home", id: "home", icon: <Home size={14} /> },
  { to: "/business", key: "nav.business", id: "business", icon: <Briefcase size={14} /> },
  { to: "/services", key: "nav.services", id: "services", icon: <Settings size={14} /> },
  { to: "/company", key: "nav.company", id: "company", icon: <Users size={14} /> },
  { to: "/access", key: "nav.access", id: "access", icon: <MapPin size={14} /> },
  { to: "/contact", key: "nav.contact", id: "contact", icon: <Send size={14} /> },
] as const;

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 h-[80px] md:h-[90px] bg-background border-b border-border">
      <div className="mx-auto h-full max-w-[1400px] px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="BASU LILA" className="h-14 md:h-16 w-auto object-contain" />
          <span className="font-mincho text-sm md:text-base tracking-[0.15em] text-foreground hidden sm:block">
            {t("brand.name")}
          </span>
        </Link>

        <nav className="hidden lg:block flex-1 max-w-2xl mx-auto">
          <DynamicNavigation
            links={links.map((l) => ({
              id: l.id,
              label: t(l.key),
              href: l.to,
              icon: l.icon,
            }))}
            className="border-none shadow-none bg-transparent"
            glowIntensity={0}
          />
        </nav>

        <div className="hidden lg:flex items-center gap-4 text-xs">
          <div className="flex flex-col gap-0.5 text-foreground/80">
            <a href="tel:+819018566119" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone size={12} />
              <span>+81 90-1856-6119</span>
            </a>
            <a href="mailto:info@basulilallc.com" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Mail size={12} />
              <span>info@basulilallc.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1 border-l border-border pl-4 text-xs">
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "font-semibold text-foreground" : "text-muted-foreground"}
            >
              EN
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={() => setLang("ja")}
              className={lang === "ja" ? "font-semibold text-foreground" : "text-muted-foreground"}
            >
              日本語
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex flex-col items-end gap-0.5 text-[10px] text-muted-foreground mr-1">
            <a href="tel:+819018566119" className="flex items-center gap-1 hover:text-accent">
              <Phone size={10} />
              <span>+81 90-1856-6119</span>
            </a>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang("en")}
                className={lang === "en" ? "font-semibold text-foreground" : "text-muted-foreground"}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLang("ja")}
                className={lang === "ja" ? "font-semibold text-foreground" : "text-muted-foreground"}
              >
                日本語
              </button>
            </div>
          </div>
          <HamburgerMenuOverlay
              buttonTop="50%"
              buttonSize="sm"
              items={[
              ...links.map((l) => ({
                label: t(l.key),
                onClick: () => navigate({ to: l.to }),
                icon: l.icon,
              })),
              {
                label: "info@basulilallc.com",
                onClick: () => window.location.href = "mailto:info@basulilallc.com",
                icon: <Mail size={14} />,
              }
            ]}
          />
        </div>
      </div>
    </header>
  );
}
