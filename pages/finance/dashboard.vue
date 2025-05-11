<template>
  <br><br><br>
  <AppLayout>
    <div class="finance-dashboard bga">
      <div class="row g-4">
        <!-- کارت‌های آمار مالی -->
        <div class="col-md-3">
          <div class="card stat-card bg-primary text-white">
            <div class="card-body">
              <i class="fas fa-coins fa-2x mb-3"></i>
              <h3>{{ formatPrice(stats.dailyRevenue) }}</h3>
              <p class="mb-0">درآمد امروز</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="card stat-card bg-success text-white">
            <div class="card-body">
              <i class="fas fa-chart-line fa-2x mb-3"></i>
              <h3>{{ formatPrice(stats.monthlyRevenue) }}</h3>
              <p class="mb-0">درآمد ماهانه</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="card stat-card bg-warning text-white">
            <div class="card-body">
              <i class="fas fa-shopping-cart fa-2x mb-3"></i>
              <h3>{{ formatPrice(stats.averageOrderValue) }}</h3>
              <p class="mb-0">میانگین سفارش</p>
            </div>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="card stat-card bg-info text-white">
            <div class="card-body">
              <i class="fas fa-percentage fa-2x mb-3"></i>
              <h3>{{ stats.profitMargin }}%</h3>
              <p class="mb-0">حاشیه سود</p>
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

        <!-- کارت هزینه‌ها -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-money-bill-wave me-2"></i>
                هزینه‌های اخیر
              </h5>
              <div class="expense-list ">
                <div v-for="expense in recentExpenses" :key="expense.id" class="expense-item bga">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge" :class="getExpenseCategoryClass(expense.category)">
                      {{ getExpenseCategoryText(expense.category) }}
                    </span>
                    <small class="text-muted">{{ formatDate(expense.date) }}</small>
                  </div>
                  <div class="expense-details">
                    <h6 class="mb-1">{{ expense.description }}</h6>
                    <p class="mb-0 text-muted">{{ formatPrice(expense.amount) }}</p>
                  </div>
                </div>
              </div>
              <button class="btn btn-primary w-100 mt-3" @click="showAddExpenseModal = true">
                <i class="fas fa-plus me-1"></i>
                ثبت هزینه جدید
              </button>
            </div>
          </div>
        </div>

        <!-- جدول تراکنش‌ها -->
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-exchange-alt me-2"></i>
                تراکنش‌های اخیر
              </h5>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>تاریخ</th>
                      <th>نوع</th>
                      <th>توضیحات</th>
                      <th>مبلغ</th>
                      <th>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="transaction in recentTransactions" :key="transaction.id">
                      <td>{{ formatDate(transaction.date) }}</td>
                      <td>
                        <span :class="['badge', getTransactionTypeClass(transaction.type)]">
                          {{ getTransactionTypeText(transaction.type) }}
                        </span>
                      </td>
                      <td>{{ transaction.description }}</td>
                      <td>{{ formatPrice(transaction.amount) }}</td>
                      <td>
                        <span :class="['badge', getTransactionStatusClass(transaction.status)]">
                          {{ getTransactionStatusText(transaction.status) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- مودال ثبت هزینه -->
      <div class="modal fade" :class="{ show: showAddExpenseModal }" v-if="showAddExpenseModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">ثبت هزینه جدید</h5>
              <button type="button" class="btn-close" @click="showAddExpenseModal = false"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addExpense">
                <div class="mb-3">
                  <label class="form-label">دسته‌بندی</label>
                  <select class="form-select" v-model="newExpense.category" required>
                    <option value="inventory">موجودی</option>
                    <option value="salary">حقوق</option>
                    <option value="rent">اجاره</option>
                    <option value="utilities">قبض‌ها</option>
                    <option value="other">سایر</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">توضیحات</label>
                  <input type="text" class="form-control" v-model="newExpense.description" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">مبلغ</label>
                  <input type="number" class="form-control" v-model="newExpense.amount" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">تاریخ</label>
                  <input type="date" class="form-control" v-model="newExpense.date" required>
                </div>
                <div class="text-end">
                  <button type="button" class="btn btn-secondary me-2" @click="showAddExpenseModal = false">انصراف</button>
                  <button type="submit" class="btn btn-primary">ذخیره</button>
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
  dailyRevenue: 2500000,
  monthlyRevenue: 75000000,
  averageOrderValue: 85000,
  profitMargin: 35
})

const recentExpenses = ref([
  {
    id: 1,
    category: 'inventory',
    description: 'خرید قهوه',
    amount: 5000000,
    date: new Date()
  },
  {
    id: 2,
    category: 'utilities',
    description: 'قبض برق',
    amount: 1200000,
    date: new Date()
  }
])

const recentTransactions = ref([
  {
    id: 1,
    type: 'income',
    description: 'فروش روزانه',
    amount: 2500000,
    date: new Date(),
    status: 'completed'
  },
  {
    id: 2,
    type: 'expense',
    description: 'خرید مواد اولیه',
    amount: 1500000,
    date: new Date(),
    status: 'pending'
  }
])

const showAddExpenseModal = ref(false)
const newExpense = ref({
  category: 'inventory',
  description: '',
  amount: 0,
  date: new Date().toISOString().split('T')[0]
})

// فرمت قیمت
const formatPrice = (price) => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
}

// فرمت تاریخ
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fa-IR')
}

// دریافت کلاس دسته‌بندی هزینه
const getExpenseCategoryClass = (category) => {
  switch (category) {
    case 'inventory':
      return 'bg-primary'
    case 'salary':
      return 'bg-success'
    case 'rent':
      return 'bg-warning'
    case 'utilities':
      return 'bg-info'
    default:
      return 'bg-secondary'
  }
}

// دریافت متن دسته‌بندی هزینه
const getExpenseCategoryText = (category) => {
  switch (category) {
    case 'inventory':
      return 'موجودی'
    case 'salary':
      return 'حقوق'
    case 'rent':
      return 'اجاره'
    case 'utilities':
      return 'قبض‌ها'
    default:
      return 'سایر'
  }
}

// دریافت کلاس نوع تراکنش
const getTransactionTypeClass = (type) => {
  return type === 'income' ? 'bg-success' : 'bg-danger'
}

// دریافت متن نوع تراکنش
const getTransactionTypeText = (type) => {
  return type === 'income' ? 'درآمد' : 'هزینه'
}

// دریافت کلاس وضعیت تراکنش
const getTransactionStatusClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-success'
    case 'pending':
      return 'bg-warning'
    case 'failed':
      return 'bg-danger'
    default:
      return 'bg-secondary'
  }
}

// دریافت متن وضعیت تراکنش
const getTransactionStatusText = (status) => {
  switch (status) {
    case 'completed':
      return 'تکمیل شده'
    case 'pending':
      return 'در انتظار'
    case 'failed':
      return 'ناموفق'
    default:
      return 'نامشخص'
  }
}

// افزودن هزینه جدید
const addExpense = () => {
  recentExpenses.value.unshift({
    id: recentExpenses.value.length + 1,
    ...newExpense.value,
    date: new Date(newExpense.value.date)
  })
  showAddExpenseModal.value = false
  newExpense.value = {
    category: 'inventory',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0]
  }
  toast.success('هزینه جدید با موفقیت ثبت شد')
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
.finance-dashboard {
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

.expense-item {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

.expense-item:hover {
  transform: translateX(-5px);
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
</style> 