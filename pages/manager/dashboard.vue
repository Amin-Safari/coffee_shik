<template>  
    <br><br><br>
    <AppLayout>
      <div class="manager-dashboard bga">
        <div class="row g-4">
          <!-- کارت‌های آمار -->
          <div class="col-md-3">
            <div class="card stat-card bg-primary text-white">
              <div class="card-body">
                <i class="fas fa-users fa-2x mb-3"></i>
                <h3>{{ stats.totalCustomers }}</h3>
                <p class="mb-0">کل مشتریان</p>
              </div>
            </div>
          </div>
  
          <div class="col-md-3">
            <div class="card stat-card bg-success text-white">
              <div class="card-body">
                <i class="fas fa-coins fa-2x mb-3"></i>
                <h3>{{ formatPrice(stats.dailyRevenue) }}</h3>
                <p class="mb-0">درآمد امروز</p>
              </div>
            </div>
          </div>
  
          <div class="col-md-3">
            <div class="card stat-card bg-warning text-white">
              <div class="card-body">
                <i class="fas fa-shopping-cart fa-2x mb-3"></i>
                <h3>{{ stats.totalOrders }}</h3>
                <p class="mb-0">سفارشات امروز</p>
              </div>
            </div>
          </div>
  
          <div class="col-md-3">
            <div class="card stat-card bg-info text-white">
              <div class="card-body">
                <i class="fas fa-star fa-2x mb-3"></i>
                <h3>{{ stats.averageRating }}</h3>
                <p class="mb-0">میانگین امتیاز</p>
              </div>
            </div>
          </div>
  
          <!-- نمودار درآمد -->
          <div class="col-md-8">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <i class="fas fa-chart-line me-2"></i>
                  نمودار درآمد
                </h5>
                <div class="chart-container">
                  <canvas ref="revenueChart"></canvas>
                </div>
              </div>
            </div>
          </div>
  
          <!-- کارت وضعیت کارکنان -->
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <i class="fas fa-user-tie me-2"></i>
                  وضعیت کارکنان
                </h5>
                <div class="staff-list">
                  <div v-for="staff in staffStatus" :key="staff.id" class="staff-item">
                    <div class="d-flex align-items-center">
                      <div class="staff-avatar">
                        <img :src="staff.avatar" :alt="staff.name" />
                        <span :class="['status-indicator', staff.status]"></span>
                      </div>
                      <div class="staff-info">
                        <h6 class="mb-1">{{ staff.name }}</h6>
                        <small class="text-muted">{{ staff.role }}</small>
                      </div>
                    </div>
                    <div class="staff-stats">
                      <div class="stat">
                        <i class="fas fa-clock"></i>
                        <span>{{ staff.hours }} ساعت</span>
                      </div>
                      <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>{{ staff.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- جدول محصولات پرفروش -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <i class="fas fa-fire me-2"></i>
                  محصولات پرفروش
                </h5>
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>نام محصول</th>
                        <th>دسته‌بندی</th>
                        <th>تعداد فروش</th>
                        <th>درآمد</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="product in topProducts" :key="product.id">
                        <td>
                          <div class="d-flex align-items-center">
                            <img :src="product.image" :alt="product.name" class="product-thumbnail" />
                            <span>{{ product.name }}</span>
                          </div>
                        </td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.sales }}</td>
                        <td>{{ formatPrice(product.revenue) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
          <!-- کارت مدیریت موجودی -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">
                  <i class="fas fa-boxes me-2"></i>
                  مدیریت موجودی
                </h5>
                <div class="inventory-list">
                  <div v-for="item in inventory" :key="item.id" class="inventory-item">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 class="mb-1">{{ item.name }}</h6>
                        <small class="text-muted">{{ item.category }}</small>
                      </div>
                      <div class="inventory-status">
                        <div class="progress" style="width: 100px">
                          <div
                            class="progress-bar"
                            :class="getInventoryStatusClass(item.quantity)"
                            :style="{ width: (item.quantity / item.maxQuantity) * 100 + '%' }"
                            role="progressbar"
                          ></div>
                        </div>
                        <small class="text-muted">{{ item.quantity }}/{{ item.maxQuantity }}</small>
                      </div>
                      <button class="btn btn-sm btn-outline-primary" @click="orderInventory(item)">
                        <i class="fas fa-plus me-1"></i>
                        سفارش
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- مودال سفارش موجودی -->
        <div class="modal fade" :class="{ show: showOrderModal }" v-if="showOrderModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">سفارش {{ selectedItem?.name }}</h5>
                <button type="button" class="btn-close" @click="showOrderModal = false"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="submitInventoryOrder">
                  <div class="mb-3">
                    <label class="form-label">تعداد</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="orderQuantity"
                      :max="selectedItem?.maxQuantity - selectedItem?.quantity"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">تاریخ تحویل</label>
                    <input type="date" class="form-control" v-model="orderDate" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">توضیحات</label>
                    <textarea class="form-control" v-model="orderNotes" rows="3"></textarea>
                  </div>
                  <div class="text-end">
                    <button type="button" class="btn btn-secondary me-2" @click="showOrderModal = false">
                      انصراف
                    </button>
                    <button type="submit" class="btn btn-primary">ثبت سفارش</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { toast } from 'vue3-toastify'
  import Chart from 'chart.js/auto'
  
  // داده‌های نمونه
  const stats = ref({
    totalCustomers: 1250,
    dailyRevenue: 2500000,
    totalOrders: 85,
    averageRating: 4.8
  })
  
  const staffStatus = ref([
    {
      id: 1,
      name: 'علی محمدی',
      role: 'باریستا',
      status: 'online',
      hours: 8,
      rating: 4.9,
      avatar: '/images/staff/1.jpg'
    },
    {
      id: 2,
      name: 'مریم احمدی',
      role: 'گارسون',
      status: 'busy',
      hours: 6,
      rating: 4.7,
      avatar: '/images/staff/2.jpg'
    }
  ])
  
  const topProducts = ref([
    {
      id: 1,
      name: 'کاپوچینو',
      category: 'قهوه',
      sales: 45,
      revenue: 2025000,
      image: '/images/cappuccino.jpg'
    },
    {
      id: 2,
      name: 'لاته',
      category: 'قهوه',
      sales: 38,
      revenue: 1824000,
      image: '/images/latte.jpg'
    }
  ])
  
  const inventory = ref([
    {
      id: 1,
      name: 'قهوه عربیکا',
      category: 'مواد اولیه',
      quantity: 5,
      maxQuantity: 20
    },
    {
      id: 2,
      name: 'شیر',
      category: 'مواد اولیه',
      quantity: 8,
      maxQuantity: 15
    }
  ])
  
  const showOrderModal = ref(false)
  const selectedItem = ref(null)
  const orderQuantity = ref(1)
  const orderDate = ref('')
  const orderNotes = ref('')
  
  // فرمت قیمت
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }
  
  // دریافت کلاس وضعیت موجودی
  const getInventoryStatusClass = (quantity) => {
    if (quantity <= 5) return 'bg-danger'
    if (quantity <= 10) return 'bg-warning'
    return 'bg-success'
  }
  
  // سفارش موجودی
  const orderInventory = (item) => {
    selectedItem.value = item
    orderQuantity.value = 1
    orderDate.value = new Date().toISOString().split('T')[0]
    orderNotes.value = ''
    showOrderModal.value = true
  }
  
  // ثبت سفارش موجودی
  const submitInventoryOrder = () => {
    // اینجا درخواست API برای ثبت سفارش قرار می‌گیرد
    toast.success('سفارش موجودی با موفقیت ثبت شد')
    showOrderModal.value = false
  }
  
  // ایجاد نمودار درآمد
  onMounted(() => {
    const ctx = document.querySelector('canvas')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
        datasets: [{
          label: 'درآمد (تومان)',
          data: [65000000, 70000000, 75000000, 72000000, 78000000, 75000000],
          borderColor: '#3498db',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    })
  })
  </script>
  
  <style scoped>
  .manager-dashboard {
    animation: fadeIn 0.5s ease-out;
  }
  
  .stat-card {
    border: none;
    border-radius: 15px;
    transition: transform 0.3s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
  }
  
  .chart-container {
    height: 300px;
    margin-top: 20px;
  }
  
  .staff-list {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .staff-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .staff-item:last-child {
    border-bottom: none;
  }
  
  .staff-avatar {
    position: relative;
    width: 40px;
    height: 40px;
    margin-left: 1rem;
  }
  
  .staff-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .status-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid white;
  }
  
  .status-indicator.online {
    background-color: #2ecc71;
  }
  
  .status-indicator.busy {
    background-color: #e74c3c;
  }
  
  .status-indicator.offline {
    background-color: #95a5a6;
  }
  
  .staff-stats {
    display: flex;
    gap: 1rem;
  }
  
  .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .product-thumbnail {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin-left: 1rem;
    object-fit: cover;
  }
  
  .inventory-list {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .inventory-item {
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .inventory-item:last-child {
    border-bottom: none;
  }
  
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    .staff-stats {
      display: none;
    }
  }
  </style>