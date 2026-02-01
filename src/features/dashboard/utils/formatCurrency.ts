export function formatCurrency(amount?: number) {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "—";
  // Use Intl.NumberFormat and replace PHP label with the currency symbol for compactness
  const formatted = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(amount);
  return formatted.replace("\u00A0PHP", "₱").replace("PHP", "₱");
}
