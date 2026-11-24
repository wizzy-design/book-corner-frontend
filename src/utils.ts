export function formatPrice(price?: number | null): string {
  if (typeof price !== "number" || Number.isNaN(price)) {
    return "₦0";
  }
  return `₦${price.toLocaleString()}`;
}

export interface StockStatus {
  isOutOfStock: boolean;
  isLowStock: boolean;
  shortLabel: string;
  detailedLabel: string;
}

export function getStockStatus(stock?: number | null): StockStatus {
  const safeStock = typeof stock === "number" && Number.isFinite(stock) ? stock : 0;
  const isOutOfStock = safeStock <= 0;
  const isLowStock = safeStock > 0 && safeStock <= 3;

  return {
    isOutOfStock,
    isLowStock,
    shortLabel: isOutOfStock ? "Out of stock" : `${safeStock} in stock`,
    detailedLabel: isOutOfStock
      ? "Out of Stock"
      : isLowStock
        ? `Low Stock: Only ${safeStock} left`
        : `In Stock (${safeStock} available)`,
  };
}
