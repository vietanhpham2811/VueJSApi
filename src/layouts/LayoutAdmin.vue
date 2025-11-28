<!-- <template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">Admin Panel</div>
      <nav>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/students">Sinh viên</router-link>
        <router-link to="/courses">Khóa học</router-link>
        <router-link to="/settings">Cài đặt</router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-wrapper">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <h2>{{ pageTitle }}</h2>
        </div>
        <div class="header-right">
          <span>{{ user?.username }}</span>
          <button @click="btnLogout">Đăng xuất</button>
        </div>
      </header>

      <!-- Content -->
      <main class="content">
        <slot />
        <!-- Nội dung trang sẽ hiển thị ở đây -->
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import apiClient from '@/api'

const router = useRouter()
const route = useRoute()

const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

const pageTitle = computed(() => {
  const titles = {
    '/': 'Dashboard',
    '/students': 'Quản lý Sinh viên',
    '/courses': 'Quản lý Khóa học',
    '/settings': 'Cài đặt',
  }
  return titles[route.path] || 'Admin'
})

const btnLogout = async () => {
  try {
    await apiClient.post('/auth/logout')
  } catch (err) {
    console.error('Logout error:', err)
  } finally {
    localStorage.removeItem('user')
    cookieStore.remove('token')
    window.location.href = '/login'
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #34495e;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

nav a {
  color: #ecf0f1;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 6px;
  transition: background 0.3s;
}

nav a:hover,
nav a.router-link-active {
  background: #34495e;
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  padding: 15px 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-right button {
  padding: 8px 16px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.header-right button:hover {
  background: #c0392b;
}

.content {
  flex: 1;
  padding: 30px;
  background: #f5f6fa;
}
</style> -->
