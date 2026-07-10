"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "@/lib/react-query/query-provider";

export default function QueryProviderClient({ children }: { children: ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
