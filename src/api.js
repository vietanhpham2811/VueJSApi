import axios from 'axios'

// Tạo instance axios
const apiClient = axios.create({
  baseURL: '/api', // Proxy từ vite.config.js
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // ← QUAN TRỌNG: Cho phép gửi cookies
  timeout: 10000,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Cookie tự động gửi do withCredentials: true
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor - Xử lý lỗi 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // Gọi API refresh token
        await apiClient.post('/auth/refresh-token')
        // Sau khi lấy được access token mới, retry lại request cũ
        return apiClient(error.config)
      } catch (refreshError) {
        // Nếu refresh cũng lỗi, chuyển về login
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient
