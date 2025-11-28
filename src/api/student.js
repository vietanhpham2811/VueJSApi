// src/services/studentService.js
import apiClient from '@/api'

export const studentService = {
  getAll: () => apiClient.get('/sinhvien'),
  create: (data) => apiClient.post('/sinhvien', data),
  update: (id, data) => apiClient.put(`/sinhvien/${id}`, data),
  delete: (id) => apiClient.delete(`/sinhvien/${id}`),
}
