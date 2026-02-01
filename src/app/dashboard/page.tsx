import BuySellColumns from "@/features/dashboard/components/BuySellColumns";
import { loadBlueChips } from "@/features/dashboard/services/dataLoader";

export const revalidate = 60 * 5; // revalidate every 5 minutes (ISR-like)

export default async function DashboardPage() {
  const data = await loadBlueChips({ limit: 10 });

  return (
    <main className="p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">PSE Blue-Chips Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Top buy/sell candidates — powered by snapshot
        </p>
      </header>

      <BuySellColumns
        buy={data.buy}
        sell={data.sell}
        listSource={data.list_source}
        lastUpdated={data.last_updated}
      />
    </main>
  );
}
