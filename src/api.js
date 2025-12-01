import axios from 'axios'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
// Tạo instance axios
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Cho phép gửi cookie
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

// xử lý lỗi 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // gọi api refresh token
        await apiClient.post('/auth/refresh-token')
        // sau khi lấy được access token mới, gọi lại request cũ
        return apiClient(error.config)
      } catch (refreshError) {
        // nếu refresh cũng lỗi, chuyển về login
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    } else if (error.response?.status === 403) {
      toastr.error('Bạn không có quyền thực hiện chức năng này')
    }
    return Promise.reject(error)
  },
)

export default apiClient
