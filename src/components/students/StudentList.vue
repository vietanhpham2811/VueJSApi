<script setup>
import { ref, computed } from 'vue'
import apiClient from '@/api'
import toastr from 'toastr'

const props = defineProps({ students: Array })
const emit = defineEmits(['loadStudents'])

const currentPage = ref(1)
const pageSize = 5
const totalPages = computed(() => Math.ceil(props.students.length / pageSize))
const pagedStudents = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return props.students.slice(start, start + pageSize)
})

const selectedFile = ref(null) // Biến để lưu file đã chọn
const fileInputKey = ref(0) // Key để reset input file

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const exportToExcel = async () => {
  try {
    const response = await apiClient.get('/sinhvien/exportexcel', {
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    const now = new Date()
    const timestamp = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now
      .getHours()
      .toString()
      .padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now
      .getSeconds()
      .toString()
      .padStart(2, '0')}`
    const fileName = `DanhSachSinhVien_${timestamp}.xlsx`
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Lỗi khi export Excel:', error)
    toastr.error('Không thể export file Excel.')
  }
}

// Hàm được gọi khi người dùng chọn file từ input
const handleFileSelection = (event) => {
  selectedFile.value = event.target.files[0]
}

// Hàm được gọi khi nhấn nút "Import"
const importFile = () => {
  if (!selectedFile.value) {
    toastr.warning('Vui lòng chọn một file để import.')
    return
  }

  const reader = new FileReader()

  reader.onload = async (e) => {
    try {
      // toastr.info('Đang xử lý file, vui lòng chờ...')
      // tách chuỗi để lấy phần base64
      const base64Content = e.target.result.split(',')[1]

      const param = {
        fileName: selectedFile.value.name,
        fileContent: base64Content,
      }

      // Gửi JSON lên server
      const response = await apiClient.post('/sinhvien/importexcel', param)

      if (response.data.status) {
        toastr.success(response.data.message || 'Import dữ liệu thành công!')
        emit('loadStudents')
      } else {
        toastr.error(response.data.message || 'Có lỗi xảy ra trong quá trình import.')
      }
    } catch (error) {
      toastr.error(error.response?.data?.message || 'Lỗi server khi import file.')
      console.error('Lỗi khi import Excel:', error)
    } finally {

      selectedFile.value = null
      fileInputKey.value++ // thay đổi key để reset input file
    }
  }
  reader.onerror = (error) => {
    toastr.error('Không thể đọc file đã chọn.')
    console.error('FileReader error:', error)
  }

  // Bắt đầu đọc file
  reader.readAsDataURL(selectedFile.value)
}
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-header bg-light">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Danh sách sinh viên</h5>
        <button class="btn btn-outline-success btn-sm" @click="exportToExcel">
          <i class="bi bi-file-earmark-excel me-1"></i>
          Export Excel
        </button>
      </div>
      <div class="input-group">
        <input
          type="file"
          class="form-control form-control-sm"
          @change="handleFileSelection"
          accept=".xlsx"
          :key="fileInputKey"
        />
        <button class="btn btn-primary btn-sm" type="button" @click="importFile">
          <i class="bi bi-upload me-1"></i>
          Import
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col" class="text-center" style="width: 60px">Ảnh</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Khoa</th>
              <th scope="col">Lớp</th>
              <th scope="col">Email</th>
              <th scope="col">Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="sv in pagedStudents"
              :key="sv.maSv"
              @click="$emit('select', sv.maSv)"
              style="cursor: pointer"
            >
              <td class="text-center">
                <img
                  :src="sv.anhDaiDien || '/image/default-avatar.png'"
                  alt="Ảnh"
                  style="
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 50%;
                  "
                />
              </td>
              <td>{{ sv.hoTen }}</td>
              <td>{{ sv.ngaySinh }}</td>
              <td>{{ sv.gioiTinh }}</td>
              <td>{{ sv.tenKhoa }}</td>
              <td>{{ sv.tenLop }}</td>
              <td>{{ sv.email }}</td>
              <td>{{ sv.diaChi }}</td>
            </tr>
            <tr v-if="pagedStudents.length === 0">
              <td colspan="8" class="text-center text-muted py-3">Không có dữ liệu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer bg-light" v-if="totalPages > 1">
      <nav>
        <ul class="pagination justify-content-center mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="goToPage(currentPage - 1)">Trước</button>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="goToPage(currentPage + 1)">Sau</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
