import { NextResponse } from "next/server";
import { loadBlueChips } from "../../../features/dashboard/services/dataLoader";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limitParam = url.searchParams.get("limit");
    const sector = url.searchParams.get("sector");

    const limit = limitParam
      ? (() => {
          const parsed = parseInt(limitParam, 10);
          if (Number.isNaN(parsed)) return undefined;
          return Math.max(1, Math.min(100, parsed));
        })()
      : undefined;

    const result = await loadBlueChips({
      limit: typeof limit === "number" ? limit : undefined,
      sector: sector || undefined,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("blue-chips API error", err);
    return NextResponse.json(
      { error: "Failed to load blue-chips snapshot" },
      { status: 500 },
    );
  }
}
