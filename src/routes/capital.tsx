import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/capital")({
  head: () => ({ meta: [{ title: "資本金 — 合同会社 BASU LILA" }] }),
  component: CapitalPage,
});

function CapitalPage() {
  return (
    <div>
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-14 text-center">
          <h1 className="font-mincho text-3xl md:text-4xl tracking-widest">資本金</h1>
          <p className="mt-3 text-xs md:text-sm text-muted-foreground">Capital</p>
        </div>
      </div>
      <div className="mx-auto max-w-[800px] px-6 py-20">
        <div className="border border-border divide-y divide-border">
          <div className="grid grid-cols-[140px_1fr]">
            <div className="bg-secondary px-5 py-6 text-xs text-muted-foreground border-r border-border">資本金</div>
            <div className="px-5 py-6 font-mincho text-2xl">¥5,000,000</div>
          </div>
          <div className="grid grid-cols-[140px_1fr]">
            <div className="bg-secondary px-5 py-6 text-xs text-muted-foreground border-r border-border">法人番号</div>
            <div className="px-5 py-6 font-mincho text-lg tabular-nums">7120003086461</div>
          </div>
          <div className="grid grid-cols-[140px_1fr]">
            <div className="bg-secondary px-5 py-6 text-xs text-muted-foreground border-r border-border">設立</div>
            <div className="px-5 py-6 font-mincho text-lg">2024年</div>
          </div>
        </div>
      </div>
    </div>
  );
}
