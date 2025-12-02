<script setup>
// Có thể import các component khác nếu cần
</script>

<template>
  <div class="home-view-container py-5">
    <div class="container">
      <!-- Hero Section -->
      <div class="p-5 mb-4 bg-light rounded-3 shadow-sm text-center">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Chào mừng đến với Trang Quản Lý</h1>
          <p class="fs-4 col-md-10 mx-auto">
            Hệ thống quản lý sinh viên hiệu quả, trực quan và dễ sử dụng.
          </p>
          <router-link to="/student" class="btn btn-primary btn-lg">
            <i class="bi bi-people-fill me-2"></i>
            Bắt đầu quản lý sinh viên
          </router-link>
        </div>
      </div>

      <!-- Features Section -->
      <div class="row align-items-md-stretch text-center">
        <div class="col-md-4 mb-4">
          <div class="h-100 p-5 text-white bg-dark rounded-3 d-flex flex-column justify-content-center">
            <i class="bi bi-card-list fs-1 mb-3"></i>
            <h2>Quản lý Sinh viên</h2>
            <p>Thêm, sửa, xóa và tìm kiếm thông tin sinh viên một cách dễ dàng.</p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="h-100 p-5 bg-light border rounded-3 d-flex flex-column justify-content-center">
            <i class="bi bi-person-check-fill fs-1 mb-3"></i>
            <h2>Phân quyền Người dùng</h2>
            <p>Quản lý vai trò và quyền hạn của người dùng trong hệ thống.</p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="h-100 p-5 text-white bg-secondary rounded-3 d-flex flex-column justify-content-center">
            <i class="bi bi-file-earmark-arrow-down-fill fs-1 mb-3"></i>
            <h2>Nhập/Xuất Dữ liệu</h2>
            <p>Hỗ trợ nhập và xuất danh sách sinh viên qua file Excel tiện lợi.</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <!-- <footer class="pt-3 mt-4 text-muted border-top">
        &copy; 2025 - NewWave
      </footer> -->
    </div>
  </div>
</template>

<style scoped>
.home-view-container {
  background-color: #f8f9fa;
}

.display-5 {
  color: #343a40;
}

.fs-4 {
  color: #6c757d;
}

.feature-icon {
  font-size: 3rem;
  color: #0d6efd;
}
</style>
