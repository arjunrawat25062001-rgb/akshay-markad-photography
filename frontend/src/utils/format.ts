export function formatYear(date = new Date()) { return new Intl.DateTimeFormat("en", { year: "numeric" }).format(date); }
