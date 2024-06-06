export const formatCurrencyVND = (amount?: number): string => {
  if (!amount) return Number(0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
