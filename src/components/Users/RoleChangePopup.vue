<script setup>
import { ref, watch } from 'vue'
import apiClient from '@/api'
import toastr from 'toastr'

const props = defineProps({
  show: Boolean,
  user: Object,
})

const emit = defineEmits(['close', 'role-changed'])

const selectedRole = ref('')

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      selectedRole.value = newUser.role
    }
  },
)

const closePopup = () => {
  emit('close')
}

const saveRole = async () => {
  if (!props.user) return
  try {
    await apiClient.put(`/users/changerole/${props.user.id}`, { role: selectedRole.value })
    toastr.success('Cập nhật quyền thành công!')
    emit('role-changed')
    closePopup()
  } catch (err) {
    toastr.error(err.response?.data?.message || 'Không thể thay đổi quyền!')
  }
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="closePopup">
    <div class="modal-container card shadow">
      <div class="card-header">
        <h5 class="modal-title mb-0">
          Phân quyền cho: <strong>{{ user?.username }}</strong>
        </h5>
        <button type="button" class="btn-close" @click="closePopup"></button>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="roleSelect" class="form-label">Chọn quyền:</label>
          <select id="roleSelect" v-model="selectedRole" class="form-select">
            <!--Em làm nhanh nên hashcode đoạn này-->
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
      <div class="card-footer text-end">
        <button type="button" class="btn btn-secondary btn-sm me-2" @click="closePopup">
          Hủy
        </button>
        <button type="button" class="btn btn-primary btn-sm" @click="saveRole">Lưu thay đổi</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-container {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
