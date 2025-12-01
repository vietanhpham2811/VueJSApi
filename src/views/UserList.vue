<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api'

const users = ref([])
const error = ref('')
const currentUserRole = ref('') // ví dụ: 'admin', 'user', ...

const loadUsers = async () => {
  error.value = ''
  try {
    const res = await apiClient.get('/users')
    users.value = res.data.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Không tải được danh sách người dùng!'
  }
}

const handleChangeRole = async (userId, newRole) => {
  try {
    await apiClient.post(`/users/change-role`, { userId, role: newRole })
    loadUsers()
  } catch (err) {
    error.value = err.response?.data?.message || 'Không đổi được quyền!'
  }
}

onMounted(loadUsers)
</script>

<template>
  <div class="container py-4">
    <h4 class="fw-bold mb-3">Danh sách người dùng</h4>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <table class="table table-bordered table-hover align-middle shadow rounded">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Quyền</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <select
              v-if="currentUserRole === 'admin'"
              v-model="user.role"
              @change="handleChangeRole(user.id, user.role)"
              class="form-select form-select-sm"
              style="width: 120px"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <span v-else>{{ user.role }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
