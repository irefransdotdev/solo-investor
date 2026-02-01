import { useQuery } from "@/lib/queryClient";
import type { Stock } from "@/features/dashboard/models/stock";

export type BlueChipsResponse = {
  list_source: string;
  last_updated: string;
  buy: Stock[];
  sell: Stock[];
};

export async function fetchBlueChips(options?: {
  limit?: number;
  sector?: string;
}) {
  const params = new URLSearchParams();
  if (typeof options?.limit === "number")
    params.set("limit", String(options!.limit));
  if (options?.sector) params.set("sector", options.sector);
  const url = `/api/blue-chips${params.toString() ? `?${params.toString()}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch blue chips: ${res.status}`);
  const body = (await res.json()) as BlueChipsResponse;
  return body;
}

export function useBlueChips(options?: { limit?: number; sector?: string }) {
  const key = ["blue-chips", options ?? {}] as const;
  return useQuery({
    queryKey: key,
    queryFn: () => fetchBlueChips(options),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
