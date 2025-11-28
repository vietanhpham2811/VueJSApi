<script setup>
import { defineProps } from 'vue'
const props = defineProps({ students: Array })
</script>

<template>
  <div>
    <h5 class="fw-bold mb-3">Danh sách sinh viên</h5>
    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle shadow rounded">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="text-center">Ảnh</th>
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
            v-for="sv in students"
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
                  border: 1px solid #ccc;
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
        </tbody>
      </table>
    </div>
  </div>
</template>
