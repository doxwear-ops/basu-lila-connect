import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LoadingScreen } from "@/components/LoadingScreen";
import { I18nProvider } from "@/lib/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-mincho text-6xl">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">ページが見つかりませんでした。</p>
        <Link to="/" className="mt-6 inline-block border border-border px-5 py-2 text-xs hover:bg-secondary">
          ホームへ戻る
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-mincho text-2xl">エラーが発生しました</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 bg-foreground text-background px-5 py-2 text-xs"
        >
          再試行
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "合同会社 BASU LILA — 安心・信頼・つながり" },
      { name: "description", content: "BASU LILA LLC は食品販売・飲食店運営・通訳翻訳・外国人支援・留学生サポートを通じて地域社会に貢献する大阪の企業です。" },
      { name: "keywords", content: "BASU LILA, 食品販売, 飲食店, 通訳, 翻訳, 外国人支援, 留学生, 大阪, 地域貢献" },
      { property: "og:title", content: "合同会社 BASU LILA" },
      { property: "og:description", content: "食とサービスを通じて地域社会に貢献します。食品販売、飲食店運営、通訳翻訳など多角的に展開しています。" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BASU LILA LLC" },
      { property: "og:locale", content: "ja_JP" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "合同会社 BASU LILA" },
      { name: "twitter:description", content: "食とサービスを通じて地域社会に貢献します。" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <LoadingScreen />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </I18nProvider>
    </QueryClientProvider>
  );
}
