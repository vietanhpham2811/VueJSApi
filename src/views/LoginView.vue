<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Đăng nhập</h1>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Tên đăng nhập:</label>
          <input
            id="username"
            v-model="loginData.username"
            type="text"
            required
            placeholder="Nhập tên đăng nhập"
          />
        </div>

        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input
            id="password"
            v-model="loginData.password"
            type="password"
            required
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/api'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const loginData = ref({
  username: '',
  password: '',
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Gọi API login - Cookie sẽ tự động được set bởi server
    const response = await apiClient.post('/auth/login', {
      username: loginData.value.username,
      password: loginData.value.password,
    })

    // Token đã được lưu vào Cookie (HttpOnly)
    // Lưu thông tin user vào localStorage để dùng trong app
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }

    console.log('Login success:', response.data)

    // Reload trang để router.beforeEach nhận cookie mới
    window.location.href = '/'
  } catch (err) {
    error.value = err.response?.data?.message || 'Đăng nhập thất bại!'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #5568d3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
}
</style>
