import type { ReactNode } from "react";
export type WithChildren = Readonly<{ children: ReactNode }>;
export type NavigationItem = { label: string; href: string };
