export function formatDate(date: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${p(date.getMonth() + 1)}.${p(date.getDate())}`;
}
