<template>
    <br><br><br>
    <AppLayout>
        <div class="waiter-dashboard bga">
            <div class="row g-4">
                <!-- کارت سفارشات جدید -->
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">
                                <i class="fas fa-bell me-2"></i>
                                سفارشات جدید
                            </h5>
                            <div v-if="newOrders.length === 0" class="text-center py-4">
                                <i class="fas fa-check-circle fa-3x text-success mb-3"></i>
                                <p class="text-muted">هیچ سفارش جدیدی وجود ندارد</p>
                            </div>
                            <div v-else>
                                <div v-for="order in newOrders" :key="order.id" class="order-card bga">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <span class="badge bg-primary">سفارش #{{ order.id }}</span>
                                        <small class="text-muted">{{ formatTime(order.time) }}</small>
                                    </div>
                                    <div class="order-items bga">
                                        <div v-for="item in order.items" :key="item.id" class="order-item">
                                            <span>{{ item.quantity }}x {{ item.name }}</span>
                                            <span class="text-muted">{{ item.notes }}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-3">
                                        <span class="text-muted">میز #{{ order.tableNumber }}</span>
                                        <button class="btn btn-success btn-sm" @click="acceptOrder(order)">
                                            <i class="fas fa-check me-1"></i>
                                            پذیرش سفارش
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- کارت سفارشات در حال آماده‌سازی -->
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">
                                <i class="fas fa-clock me-2"></i>
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
                                            <div class="progress-bar bg-warning"
                                                :style="{ width: order.progress + '%' }" role="progressbar"></div>
                                        </div>
                                    </div>
                                    <div class="order-items bga">
                                        <div v-for="item in order.items" :key="item.id" class="order-item">
                                            <span>{{ item.quantity }}x {{ item.name }}</span>
                                            <span class="text-muted">{{ item.notes }}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-3">
                                        <span class="text-muted">میز #{{ order.tableNumber }}</span>
                                        <button class="btn btn-primary btn-sm" @click="markAsReady(order)"
                                            :disabled="order.progress < 100">
                                            <i class="fas fa-check-double me-1"></i>
                                            آماده تحویل
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- کارت سفارشات آماده تحویل -->
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">
                                <i class="fas fa-check-circle me-2"></i>
                                سفارشات آماده تحویل
                            </h5>
                            <div v-if="readyOrders.length === 0" class="text-center py-4">
                                <i class="fas fa-box fa-3x text-muted mb-3"></i>
                                <p class="text-muted">هیچ سفارشی آماده تحویل نیست</p>
                            </div>
                            <div v-else>
                                <div v-for="order in readyOrders" :key="order.id" class="order-card bga">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <span class="badge bg-info">آماده تحویل</span>
                                        <small class="text-muted">{{ formatTime(order.readyTime) }}</small>
                                    </div>
                                    <div class="order-items bga">
                                        <div v-for="item in order.items" :key="item.id" class="order-item">
                                            <span>{{ item.quantity }}x {{ item.name }}</span>
                                            <span class="text-muted">{{ item.notes }}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-3">
                                        <span class="text-muted">میز #{{ order.tableNumber }}</span>
                                        <button class="btn btn-success btn-sm" @click="deliverOrder(order)">
                                            <i class="fas fa-truck me-1"></i>
                                            تحویل به مشتری
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- کارت آمار -->
                <div class="col-md-6">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">
                                <i class="fas fa-chart-bar me-2"></i>
                                آمار امروز
                            </h5>
                            <div class="row g-3">
                                <div class="col-6">
                                    <div class="stat-card bg-primary text-white">
                                        <i class="fas fa-shopping-cart fa-2x mb-2"></i>
                                        <h3>{{ stats.totalOrders }}</h3>
                                        <p class="mb-0">کل سفارشات</p>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="stat-card bg-success text-white">
                                        <i class="fas fa-check-circle fa-2x mb-2"></i>
                                        <h3>{{ stats.completedOrders }}</h3>
                                        <p class="mb-0">سفارشات تکمیل شده</p>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="stat-card bg-warning text-white">
                                        <i class="fas fa-clock fa-2x mb-2"></i>
                                        <h3>{{ stats.averageTime }}</h3>
                                        <p class="mb-0">میانگین زمان (دقیقه)</p>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="stat-card bg-info text-white">
                                        <i class="fas fa-star fa-2x mb-2"></i>
                                        <h3>{{ stats.rating }}</h3>
                                        <p class="mb-0">امتیاز کلی</p>
                                    </div>
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
const newOrders = ref([
    {
        id: 1,
        time: new Date(),
        tableNumber: 5,
        items: [
            { id: 1, name: 'کاپوچینو', quantity: 2, notes: 'با شکر کم' },
            { id: 2, name: 'کیک شکلاتی', quantity: 1, notes: '' }
        ]
    }
])

const preparingOrders = ref([
    {
        id: 2,
        tableNumber: 3,
        progress: 75,
        items: [
            { id: 3, name: 'لاته', quantity: 1, notes: 'با شیر سویا' },
            { id: 4, name: 'موکا', quantity: 1, notes: 'با خامه اضافه' }
        ]
    }
])

const readyOrders = ref([
    {
        id: 3,
        tableNumber: 7,
        readyTime: new Date(),
        items: [
            { id: 5, name: 'آمریکانو', quantity: 2, notes: '' },
            { id: 6, name: 'کروسان', quantity: 2, notes: 'گرم' }
        ]
    }
])

const stats = ref({
    totalOrders: 25,
    completedOrders: 18,
    averageTime: 12,
    rating: 4.8
})

// فرمت زمان
const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fa-IR')
}

// پذیرش سفارش
const acceptOrder = (order) => {
    newOrders.value = newOrders.value.filter(o => o.id !== order.id)
    preparingOrders.value.push({
        ...order,
        progress: 0
    })
    toast.success(`سفارش #${order.id} پذیرفته شد`)
}

// علامت‌گذاری به عنوان آماده
const markAsReady = (order) => {
    preparingOrders.value = preparingOrders.value.filter(o => o.id !== order.id)
    readyOrders.value.push({
        ...order,
        readyTime: new Date()
    })
    toast.success(`سفارش #${order.id} آماده تحویل است`)
}

// تحویل سفارش
const deliverOrder = (order) => {
    readyOrders.value = readyOrders.value.filter(o => o.id !== order.id)
    stats.value.completedOrders++
    toast.success(`سفارش #${order.id} با موفقیت تحویل داده شد`)
}
</script>

<style scoped>
.waiter-dashboard {
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
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
}

.order-item:last-child {
    border-bottom: none;
}

.stat-card {
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.progress {
    height: 8px;
    border-radius: 4px;
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