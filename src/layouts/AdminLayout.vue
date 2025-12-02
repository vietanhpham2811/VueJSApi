<template>
  <div class="d-flex min-vh-100 bg-light">
    <!-- Sidebar -->
    <aside class="bg-dark text-white p-4" style="width: 240px">
      <div class="mb-4 text-center">
        <h3 class="fw-bold">Admin Panel</h3>
      </div>
      <nav class="nav flex-column">
        <router-link class="nav-link text-white mb-2" active-class="active" to="/student">
          <i class="bi bi-people me-2"></i> Quản lý Sinh viên
        </router-link>
        <router-link class="nav-link text-white mb-2" active-class="active" to="/other">
          <i class="bi bi-grid me-2"></i> Quản lý lớp học
        </router-link>
        <router-link class="nav-link text-white mb-2" active-class="active" to="/other">
          <i class="bi bi-grid me-2"></i> Quản lý giáo viên
        </router-link>
        <router-link class="nav-link text-white mb-2" active-class="active" to="/users">
          <i class="bi bi-grid me-2"></i> Phân quyền
        </router-link>
        <router-link class="nav-link text-white mb-2" active-class="active" to="/other">
          <i class="bi bi-grid me-2"></i> Trang khác
        </router-link>
        <!-- Thêm các menu khác tại đây -->
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-grow-1 d-flex flex-column">
      <!-- Header -->
      <header
        class="bg-white shadow-sm py-3 px-4 d-flex justify-content-between align-items-center"
      >
        <div class="fw-bold fs-5">Xin chào, {{ user?.username || 'Admin' }}</div>
        <button class="btn btn-outline-danger" @click="handleLogout">Đăng xuất</button>
      </header>
      <!-- Content -->
      <main class="flex-grow-1 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

const handleLogout = async () => {
  try {
    await apiClient.post('/auth/logout')
  } catch (err) {
    // Có thể log lỗi nếu cần
  }
  localStorage.removeItem('user')
  window.location.href = '/login'
}
</script>

<style scoped>
.bg-dark {
  background: #212529 !important;
}
.nav-link.active {
  background: #495057;
  border-radius: 6px;
}
.nav-link {
  transition: background 0.2s;
}
.nav-link:hover {
  background: #343a40;
}
</style>
