<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api'
import RoleChangePopup from '@/components/Users/RoleChangePopup.vue'

const users = ref([])
const error = ref('')
const currentUserRole = ref('admin') // Giả sử admin để test

const isPopupVisible = ref(false)
const selectedUser = ref(null)

const loadUsers = async () => {
  error.value = ''
  try {
    const res = await apiClient.get('/Users/listUsers')
    users.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Không tải được danh sách người dùng!'
  }
}

const openRolePopup = (user) => {
  selectedUser.value = user
  isPopupVisible.value = true
}

const closeRolePopup = () => {
  isPopupVisible.value = false
  selectedUser.value = null
}

const onRoleChanged = () => {
  loadUsers()
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
          <th class="d-none ">ID</th>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Quyền</th>
          <th>Phân Quyền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="d-none ">{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button
              v-if="currentUserRole === 'admin'"
              class="btn btn-outline-primary btn-sm"
              @click="openRolePopup(user)"
            >
              Phân quyền
            </button>
            <span v-else>{{ user.role }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <RoleChangePopup
      :show="isPopupVisible"
      :user="selectedUser"
      @close="closeRolePopup"
      @role-changed="onRoleChanged"
    />
  </div>
</template>
