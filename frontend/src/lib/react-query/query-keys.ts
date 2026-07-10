import type { ListParams } from "@/lib/api/portfolio";

const normalize = (value: unknown) => (value === undefined || value === null || value === "" ? "all" : value);

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
  portfolio: {
    all: ["portfolio"] as const,
    list: (params: ListParams = {}) => [
      ...queryKeys.portfolio.all,
      "list",
      normalize(params.page ?? 0),
      normalize(params.size ?? 12),
      normalize(params.q),
      normalize(params.category),
      normalize(params.featured),
      normalize(params.tags),
      normalize(params.location),
    ] as const,
    item: (slug: string) => [...queryKeys.portfolio.all, "item", slug] as const,
    categories: () => [...queryKeys.portfolio.all, "categories"] as const,
    related: (slug: string) => [...queryKeys.portfolio.all, "related", slug] as const,
  },
  booking: {
    all: ["booking"] as const,
  },
  contact: {
    all: ["contact"] as const,
  },
  upload: {
    all: ["upload"] as const,
  },
} as const;

export type AppQueryKey =
  | ReturnType<typeof queryKeys.auth.me>
  | ReturnType<typeof queryKeys.portfolio.list>
  | ReturnType<typeof queryKeys.portfolio.item>
  | ReturnType<typeof queryKeys.portfolio.categories>
  | ReturnType<typeof queryKeys.portfolio.related>;
