<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '@/api'
import StudentForm from '@/components/students/StudentForm.vue'
import StudentList from '@/components/students/StudentList.vue'

const students = ref([])
const dsKhoa = ref([])
const selectedStudent = ref(null)
const error = ref('')

const loadStudents = async () => {
  error.value = ''
  try {
    const res = await apiClient.get('/sinhvien/loaddata')
    students.value = res.data.data // danh sách sinh viên
    dsKhoa.value = res.data.lstKhoa // danh sách khoa
  } catch (err) {
    error.value = err.response?.data?.message || 'Không tải được danh sách sinh viên!'
  }
}

const handleSelect = async (id) => {
  console.log('ID:', id)
  if (!id) return
  try {
    const res = await apiClient.get(`/sinhvien/detail/${id}`)

    selectedStudent.value = res.data.data
  } catch (err) {
    console.error('Lỗi lấy chi tiết sinh viên:', err)
  }
}

onMounted(loadStudents)
</script>

<template>
  <div class="container py-4">
    <div class="d-flex flex-column align-items-center mb-4">
      <div class="bg-white rounded-4 shadow px-5 py-3 position-relative" style="min-width: 340px">
        <span
          class="fs-1 fw-bold text-gradient"
          style="
            background: linear-gradient(90deg, #0d6efd, #6f42c1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          <i class="bi bi-mortarboard-fill me-2"></i>Quản Lý Sinh Viên
        </span>
        <span
          class="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-primary"
          style="font-size: 1.5rem"
          >🎓</span
        >
      </div>
    </div>
    <div class="card shadow mb-4">
      <div class="card-body">
        <StudentForm :dsKhoa="dsKhoa" :studentData="selectedStudent" @added="loadStudents" />
      </div>
    </div>
    <div class="card shadow">
      <div class="card-body">
        <StudentList :students="students" @select="handleSelect" />
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </div>
    </div>
  </div>
</template>
