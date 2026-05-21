export const companyInfo: { label: string; value: string }[] = [
  { label: "会社名", value: "合同会社 BASU LILA" },
  { label: "所在地", value: "4-3-5 Aarigin, Osaka City, Osaka, Japan" },
  { label: "法人番号", value: "7120003086461" },
  { label: "電話番号", value: "+81 90-1856-6119" },
  { label: "メール", value: "info@basulilallc.com" },
  { label: "代表社員", value: "ラミチャネ アムリット" },
  { label: "営業時間", value: "平日 9:00〜18:00" },
  { label: "定休日", value: "土日・祝日" },
  { label: "設立", value: "2024年" },
  { label: "資本金", value: "¥5,000,000" },
];

export function CompanyTable() {
  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {companyInfo.map((row) => (
          <tr key={row.label} className="border-t border-border last:border-b">
            <th className="bg-secondary text-left font-normal text-xs md:text-sm px-4 py-3 w-32 md:w-40 border-r border-border align-top text-muted-foreground">
              {row.label}
            </th>
            <td className="px-4 py-3 text-xs md:text-sm">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
