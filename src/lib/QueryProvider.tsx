"use client";

import React, { ReactNode, useState } from "react";
import { QueryClientProvider } from "@/lib/queryClient";
import { createQueryClient } from "@/lib/queryClient";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => createQueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
