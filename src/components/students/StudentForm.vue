<script setup>
import { ref, watch } from 'vue'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import apiClient from '@/api'

const emit = defineEmits(['loadStudents'])
const props = defineProps({ dsKhoa: Array, studentData: Object })

const student = ref({
  hoTen: '',
  maSV: '',
  email: '',
  ngaySinh: '',
  gioiTinh: '',
  maKhoa: '',
  maLop: '',
  diaChi: '',
  anhDaiDien: null,
})

const dsLop = ref([])
const error = ref('')
const success = ref('')
const previewUrl = ref('/image/default-avatar.png')

const handleFileChange = (e) => {
  const file = e.target.files[0]
  student.value.anhDaiDien = file
  if (file) {
    previewUrl.value = URL.createObjectURL(file)
  }
}

watch(
  () => props.studentData,
  async (data) => {
    if (data) {
      student.value.hoTen = data.hoTen || ''
      student.value.maSV = data.maSV || ''
      student.value.email = data.email || ''
      student.value.ngaySinh = data.ngaySinh || ''
      student.value.gioiTinh = data.gioiTinh || ''
      student.value.maKhoa = data.maKhoa || ''
      student.value.maLop = data.maLop || ''
      student.value.diaChi = data.diaChi || ''
      student.value.anhDaiDien = data.anh_dai_dien || ''
      previewUrl.value = data.anh_dai_dien || '/image/default-avatar.png'
      // Gọi lại API lấy lớp theo mã khoa
      //   if (data.maKhoa) {
      //     try {
      //       const res = await apiClient.get(`/sinhvien/loadlop?maKhoa=${data.maKhoa}`)
      //       dsLop.value = res.data.lstLop || []
      //     } catch (err) {
      //       dsLop.value = []
      //     }
      //   }
    }
  },
  { immediate: true },
)
watch(
  () => student.value.maKhoa,
  async (maKhoa) => {
    if (maKhoa) {
      try {
        const res = await apiClient.get(`/sinhvien/loadlop?maKhoa=${maKhoa}`)
        dsLop.value = res.data.lstLop || []
      } catch (err) {
        dsLop.value = []
      }
    } else {
      dsLop.value = []
    }
  },
)

// watch(
//   () => props.studentData,
//   (data) => {
//     if (data) {
//       student.value.hoTen = data.hoTen || ''
//       student.value.maSV = data.maSV || ''
//       student.value.email = data.email || ''
//       student.value.ngaySinh = data.ngaySinh || ''
//       student.value.gioiTinh = data.gioiTinh || ''
//       student.value.maKhoa = data.maKhoa || ''
//       student.value.maLop = data.maLop || ''
//       student.value.diaChi = data.diaChi || ''
//       student.value.anhDaiDien = data.anh_dai_dien || ''
//       previewUrl.value = data.anh_dai_dien || '/image/default-avatar.png'
//     }
//   },
//   { immediate: true },
// )

const resetForm = () => {
  Object.keys(student.value).forEach((k) => (student.value[k] = ''))
  previewUrl.value = '/image/default-avatar.png'
  dsLop.value = []
  error.value = ''
  success.value = ''
}

const submitForm = async () => {
  error.value = ''
  success.value = ''
  try {
    const formData = new FormData()
    //
    const studentData = { ...student.value }
    //them moi mac dinh gan maSV =0
    if (!studentData.maSV) {
      studentData.maSV = 0
    }
    delete studentData.anhDaiDien
    formData.append('strData', JSON.stringify(studentData))
    // Thêm ảnh nếu có
    if (student.value.anhDaiDien) {
      formData.append('AnhDaiDien', student.value.anhDaiDien)
    }
    const res = await apiClient.post('/sinhvien/SaveData', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    if (res.data.status) {
      toastr.success('Cập nhật thông tin sinh viên thành công')
      resetForm()
      emit('loadStudents')
    } else {
      toastr.error(res.data.message || 'Có lỗi xảy ra!')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Có lỗi xảy ra!'
  }
}
</script>

<template>
  <div class="card shadow mb-4">
    <div class="card-body">
      <form @submit.prevent="submitForm">
        <div class="row g-3 align-items-center">
          <div class="col-md-3 text-center">
            <img
              :src="previewUrl"
              alt="Ảnh đại diện"
              class="rounded shadow mb-2"
              style="width: 200px; height: 200px; object-fit: cover; border: 2px solid #eee"
            />
            <input
              type="file"
              @change="handleFileChange"
              accept="image/*"
              class="form-control mt-2"
            />
          </div>
          <div class="col-md-9">
            <div class="row mb-2">
              <div class="col-md-6 d-none">
                <label class="form-label">Mã SV</label>
                <input v-model="student.maSV" class="form-control" placeholder="Mã SV" />
              </div>
              <div class="col-md-12">
                <label class="form-label">Họ tên</label>
                <input v-model="student.hoTen" class="form-control" placeholder="Họ tên" required />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input v-model="student.email" class="form-control" placeholder="Email" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Ngày sinh</label>
                <input
                  v-model="student.ngaySinh"
                  class="form-control"
                  type="date"
                  placeholder="Ngày sinh"
                />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <label class="form-label">Giới tính</label>
                <select v-model="student.gioiTinh" class="form-select">
                  <option value="">-- Chọn giới tính --</option>
                  <option>Nam</option>
                  <option>Nữ</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Địa chỉ</label>
                <input v-model="student.diaChi" class="form-control" placeholder="Địa chỉ" />
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <label class="form-label">Khoa</label>
                <select v-model="student.maKhoa" class="form-select">
                  <option value="">-- Chọn khoa --</option>
                  <option v-for="khoa in props.dsKhoa" :key="khoa.maKhoa" :value="khoa.maKhoa">
                    {{ khoa.tenKhoa }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">Lớp</label>
                <select v-model="student.maLop" class="form-select">
                  <option value="">-- Chọn lớp --</option>
                  <option v-for="lop in dsLop" :key="lop.maLop" :value="lop.maLop">
                    {{ lop.tenLop }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end gap-2 mt-3">
          <button type="submit" class="btn btn-primary btn-sm">
            {{ student.maSV ? 'Lưu' : 'Thêm mới' }}
          </button>
          <button type="button" class="btn btn-secondary btn-sm" @click="resetForm">
            Reset form
          </button>
        </div>
        <div v-if="error" class="alert alert-danger mt-2">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-2">{{ success }}</div>
      </form>
    </div>
  </div>
</template>
