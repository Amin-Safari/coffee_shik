<template>
  <br><br><br>
  <AppLayout>
    <div class="barista-dashboard bga ">
      <div class="row g-4">
        <!-- کارت سفارشات در انتظار -->
        <div class="col-md-6">
          <div class="card ">
            <div class="card-body ">
              <h5 class="card-title">
                <i class="fas fa-clock me-2"></i>
                سفارشات در انتظار
              </h5>
              <div v-if="pendingOrders.length === 0" class="text-center  py-4">
                <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
                <p class="text-muted">هیچ سفارشی در انتظار نیست</p>
              </div>
              <div v-else>
                <div v-for="order in pendingOrders" :key="order.id" class="order-card bga">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="badge bg-primary">سفارش #{{ order.id }}</span>
                    <small class="text-muted">{{ formatTime(order.time) }}</small>
                  </div>
                  <div class="order-items bga">
                    <div v-for="item in order.items" :key="item.id" class="order-item">
                      <div class="d-flex justify-content-between align-items-center">
                        <span>{{ item.quantity }}x {{ item.name }}</span>
                        <button
                          class="btn btn-sm btn-outline-primary"
                          @click="showRecipe(item)"
                        >
                          <i class="fas fa-book me-1"></i>
                          دستور پخت
                        </button>
                      </div>
                      <div class="item-notes" v-if="item.notes">
                        <small class="text-muted">
                          <i class="fas fa-info-circle me-1"></i>
                          {{ item.notes }}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between  align-items-center mt-3">
                    <span class="text-muted">میز #{{ order.tableNumber }}</span>
                    <button class="btn btn-success btn-sm" @click="startPreparing(order)">
                      <i class="fas fa-play me-1"></i>
                      شروع آماده‌سازی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- کارت سفارشات در حال آماده‌سازی -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-coffee me-2"></i>
                سفارشات در حال آماده‌سازی
              </h5>
              <div v-if="preparingOrders.length === 0" class="text-center py-4">
                <i class="fas fa-coffee fa-3x text-muted mb-3"></i>
                <p class="text-muted">هیچ سفارشی در حال آماده‌سازی نیست</p>
              </div>
              <div v-else>
                <div v-for="order in preparingOrders" :key="order.id" class="order-card bga">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="badge bg-warning">در حال آماده‌سازی</span>
                    <div class="progress" style="width: 60%">
                      <div
                        class="progress-bar bg-warning"
                        :style="{ width: order.progress + '%' }"
                        role="progressbar"
                      ></div>
                    </div>
                  </div>
                  <div class="order-items bga">
                    <div v-for="item in order.items" :key="item.id" class="order-item">
                      <div class="d-flex justify-content-between align-items-center">
                        <span>{{ item.quantity }}x {{ item.name }}</span>
                        <span class="badge" :class="getItemStatusClass(item.status)">
                          {{ getItemStatusText(item.status) }}
                        </span>
                      </div>
                      <div class="item-notes" v-if="item.notes">
                        <small class="text-muted">
                          <i class="fas fa-info-circle me-1"></i>
                          {{ item.notes }}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <span class="text-muted">میز #{{ order.tableNumber }}</span>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="markAsReady(order)"
                      :disabled="!isOrderReady(order)"
                    >
                      <i class="fas fa-check-double me-1"></i>
                      آماده تحویل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- کارت دستور پخت -->
        <div class="col-md-12">
          <div class="card">
            <div class="card-body ">
              <h5 class="card-title">
                <i class="fas fa-book me-2"></i>
                دستور پخت‌ها
              </h5>
              <div class="row g-4">
                <div v-for="recipe in recipes" :key="recipe.id" class="col-md-4 ">
                  <div class="recipe-card bga">
                    <div class="recipe-header ">
                      <h6>{{ recipe.name }}</h6>
                      <span class="badge bg-info">{{ recipe.time }} دقیقه</span>
                    </div>
                    <div class="recipe-ingredients">
                      <h6 class="mb-2">مواد اولیه:</h6>
                      <ul class="list-unstyled">
                        <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
                          <i class="fas fa-check me-2"></i>
                          {{ ingredient.name }}: {{ ingredient.amount }}
                        </li>
                      </ul>
                    </div>
                    <div class="recipe-steps">
                      <h6 class="mb-2">مراحل:</h6>
                      <ol>
                        <li v-for="(step, index) in recipe.steps" :key="index">
                          {{ step }}
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- مودال دستور پخت -->
      <div class="modal fade" :class="{ show: showRecipeModal }" v-if="showRecipeModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">دستور پخت {{ selectedRecipe?.name }}</h5>
              <button type="button" class="btn-close" @click="showRecipeModal = false"></button>
            </div>
            <div class="modal-body">
              <div v-if="selectedRecipe">
                <div class="recipe-ingredients mb-4">
                  <h6>مواد اولیه:</h6>
                  <ul class="list-unstyled">
                    <li v-for="ingredient in selectedRecipe.ingredients" :key="ingredient.name">
                      <i class="fas fa-check me-2"></i>
                      {{ ingredient.name }}: {{ ingredient.amount }}
                    </li>
                  </ul>
                </div>
                <div class="recipe-steps">
                  <h6>مراحل:</h6>
                  <ol>
                    <li v-for="(step, index) in selectedRecipe.steps" :key="index">
                      {{ step }}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

// داده‌های نمونه
const pendingOrders = ref([
  {
    id: 1,
    time: new Date(),
    tableNumber: 5,
    items: [
      { id: 1, name: 'کاپوچینو', quantity: 2, notes: 'با شکر کم' },
      { id: 2, name: 'لاته', quantity: 1, notes: 'با شیر سویا' }
    ]
  }
])

const preparingOrders = ref([
  {
    id: 2,
    tableNumber: 3,
    progress: 75,
    items: [
      { id: 3, name: 'موکا', quantity: 1, notes: 'با خامه اضافه', status: 'ready' },
      { id: 4, name: 'آمریکانو', quantity: 1, status: 'preparing' }
    ]
  }
])

const recipes = ref([
  {
    id: 1,
    name: 'کاپوچینو',
    time: 5,
    ingredients: [
      { name: 'اسپرسو', amount: '30ml' },
      { name: 'شیر داغ', amount: '150ml' },
      { name: 'فوم شیر', amount: '2 قاشق' }
    ],
    steps: [
      'تهیه اسپرسو',
      'گرم کردن شیر',
      'ایجاد فوم شیر',
      'ریختن شیر و فوم روی اسپرسو'
    ]
  },
  {
    id: 2,
    name: 'لاته',
    time: 4,
    ingredients: [
      { name: 'اسپرسو', amount: '30ml' },
      { name: 'شیر داغ', amount: '200ml' },
      { name: 'فوم شیر', amount: '1 قاشق' }
    ],
    steps: [
      'تهیه اسپرسو',
      'گرم کردن شیر',
      'ایجاد فوم شیر',
      'ریختن شیر و فوم روی اسپرسو'
    ]
  }
])

const showRecipeModal = ref(false)
const selectedRecipe = ref(null)

// فرمت زمان
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('fa-IR')
}

// دریافت کلاس وضعیت آیتم
const getItemStatusClass = (status) => {
  switch (status) {
    case 'ready':
      return 'bg-success'
    case 'preparing':
      return 'bg-warning'
    default:
      return 'bg-secondary'
  }
}

// دریافت متن وضعیت آیتم
const getItemStatusText = (status) => {
  switch (status) {
    case 'ready':
      return 'آماده'
    case 'preparing':
      return 'در حال آماده‌سازی'
    default:
      return 'نامشخص'
  }
}

// نمایش دستور پخت
const showRecipe = (item) => {
  selectedRecipe.value = recipes.value.find(r => r.name === item.name)
  showRecipeModal.value = true
}

// شروع آماده‌سازی
const startPreparing = (order) => {
  pendingOrders.value = pendingOrders.value.filter(o => o.id !== order.id)
  preparingOrders.value.push({
    ...order,
    progress: 0,
    items: order.items.map(item => ({ ...item, status: 'preparing' }))
  })
  toast.success(`سفارش #${order.id} در حال آماده‌سازی است`)
}

// بررسی آماده بودن سفارش
const isOrderReady = (order) => {
  return order.items.every(item => item.status === 'ready')
}

// علامت‌گذاری به عنوان آماده
const markAsReady = (order) => {
  preparingOrders.value = preparingOrders.value.filter(o => o.id !== order.id)
  toast.success(`سفارش #${order.id} آماده تحویل است`)
}
</script>

<style scoped>
.barista-dashboard {
  animation: fadeIn 0.5s ease-out;
}

.order-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.order-card:hover {
  transform: translateY(-3px);
}

.order-items {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
}

.order-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.item-notes {
  margin-top: 5px;
  padding-right: 20px;
}

.recipe-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  height: 100%;
  transition: transform 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-5px);
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.recipe-ingredients {
  margin-bottom: 15px;
}

.recipe-steps {
  margin-top: 15px;
}

.progress {
  height: 8px;
  border-radius: 4px;
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