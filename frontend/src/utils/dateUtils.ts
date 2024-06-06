export const formatDateToDDMMYYYY = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0') // Lấy ngày và đảm bảo có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Lấy tháng và đảm bảo có 2 chữ số (lưu ý tháng bắt đầu từ 0)
  const year = date.getFullYear().toString()

  return `${day}-${month}-${year}`
}
export const formatDateToDDMMYYWithTime = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0') // Lấy ngày và đảm bảo có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Lấy tháng và đảm bảo có 2 chữ số (lưu ý tháng bắt đầu từ 0)
  const year = date.getFullYear().toString().slice(2) // Lấy 2 chữ số cuối cùng của năm
  const hours = date.getHours() % 12 || 12 // Lấy giờ (đổi sang 12 giờ)
  const minutes = date.getMinutes().toString().padStart(2, '0') // Lấy phút và đảm bảo có 2 chữ số
  const period = date.getHours() < 12 ? 'AM' : 'PM' // Xác định buổi (AM hoặc PM)

  return `${day}-${month}-${year} ${hours}:${minutes} ${period}`
}
