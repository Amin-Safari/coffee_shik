<template>
    <br><br><br>
    <div class="reception-dashboard bga">
        <!-- کارت‌های آمار -->
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="stat-card bga" data-aos="fade-up" data-aos-delay="100">
                    <div class="stat-icon bga">
                        <i class="bi bi-people-fill"></i>
                    </div>
                    <div class="stat-info">
                        <h3>{{ stats.totalCustomers }}</h3>
                        <p>مشتریان امروز</p>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="stat-card bga" data-aos="fade-up" data-aos-delay="200">
                    <div class="stat-icon bga">
                        <i class="bi bi-cup-hot-fill"></i>
                    </div>
                    <div class="stat-info ">
                        <h3>{{ stats.totalOrders }}</h3>
                        <p>سفارشات امروز</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bga" data-aos="fade-up" data-aos-delay="300">
                    <div class="stat-icon bga">
                        <i class="bi bi-clock-history"></i>
                    </div>
                    <div class="stat-info">
                        <h3>{{ stats.avgWaitTime }}</h3>
                        <p>میانگین زمان انتظار</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card bga" data-aos="fade-up" data-aos-delay="400">
                    <div class="stat-icon bga">
                        <i class="bi bi-star-fill"></i>
                    </div>
                    <div class="stat-info">
                        <h3>{{ stats.satisfactionRate }}%</h3>
                        <p>رضایت مشتریان</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- بخش‌های اصلی -->
        <div class="row g-4">
            <!-- لیست سفارشات فعال -->
            <div class="col-md-8">
                <div class="card active-orders" data-aos="fade-right">
                    <div class="card-header">
                        <h5><i class="bi bi-list-check me-2"></i>سفارشات فعال</h5>
                    </div>
                    <div class="card-body">
                        <div class="order-list">
                            <div v-for="order in activeOrders" :key="order.id" class="order-item "
                                :class="{ 'urgent': order.isUrgent }" data-aos="fade-up">
                                <div class="order-info">
                                    <div class="order-number bga">#{{ order.id }}</div>
                                    <div class="order-details">
                                        <h6>{{ order.customerName }}</h6>
                                        <p>{{ order.items.join('، ') }}</p>
                                    </div>
                                </div>
                                <div class="order-status">
                                    <span class="badge" :class="order.statusClass">{{ order.status }}</span>
                                    <div class="order-time">{{ order.waitTime }}</div>
                                </div>
                                <div class="order-actions">
                                    <button class="btn btn-sm btn-success" @click="completeOrder(order)">
                                        <i class="bi bi-check-lg"></i>
                                    </button>
                                    <button class="btn btn-sm btn-danger" @click="cancelOrder(order)">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- بخش مدیریت صف -->
            <div class="col-md-4">
                <div class="card queue-management" data-aos="fade-left">
                    <div class="card-header">
                        <h5><i class="bi bi-arrow-left-right me-2"></i>مدیریت صف</h5>
                    </div>
                    <div class="card-body">
                        <div class="queue-stats">
                            <div class="queue-stat-item bga">
                                <span class="stat-label">در انتظار</span>
                                <span class="stat-value">{{ queueStats.waiting }}</span>
                            </div>
                            <div class="queue-stat-item bga">
                                <span class="stat-label">در حال آماده‌سازی</span>
                                <span class="stat-value">{{ queueStats.preparing }}</span>
                            </div>
                            <div class="queue-stat-item bga">
                                <span class="stat-label">آماده تحویل</span>
                                <span class="stat-value">{{ queueStats.ready }}</span>
                            </div>
                        </div>
                        <div class="queue-actions mt-4">
                            <button class="btn btn-primary w-100 mb-2" @click="addToQueue">
                                <i class="bi bi-plus-lg me-2"></i>افزودن به صف
                            </button>
                            <button class="btn btn-outline-primary w-100" @click="optimizeQueue">
                                <i class="bi bi-arrow-repeat me-2"></i>بهینه‌سازی صف
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// راه‌اندازی AOS
onMounted(() => {
    AOS.init({
        duration: 800,
        once: true
    })
})

// داده‌های نمونه
const stats = ref({
    totalCustomers: 156,
    totalOrders: 89,
    avgWaitTime: '12 دقیقه',
    satisfactionRate: 95
})

const activeOrders = ref([
    {
        id: 1001,
        customerName: 'علی محمدی',
        items: ['کاپوچینو', 'کیک شکلاتی'],
        status: 'در حال آماده‌سازی',
        statusClass: 'bg-warning',
        waitTime: '5 دقیقه',
        isUrgent: true
    },
    {
        id: 1002,
        customerName: 'مریم احمدی',
        items: ['لاته', 'کروسان'],
        status: 'آماده تحویل',
        statusClass: 'bg-success',
        waitTime: '8 دقیقه',
        isUrgent: false
    }
])

const queueStats = ref({
    waiting: 5,
    preparing: 3,
    ready: 2
})

// متدها
const completeOrder = (order) => {
    // منطق تکمیل سفارش
    console.log('تکمیل سفارش:', order.id)
}

const cancelOrder = (order) => {
    // منطق لغو سفارش
    console.log('لغو سفارش:', order.id)
}

const addToQueue = () => {
    // منطق افزودن به صف
    console.log('افزودن به صف')
}

const optimizeQueue = () => {
    // منطق بهینه‌سازی صف
    console.log('بهینه‌سازی صف')
}
</script>

<style scoped>
.reception-dashboard {
    padding: 20px;
}

/* استایل کارت‌های آمار */
.stat-card {
    background: white;
    border-radius: 15px;
    padding: 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;
}

.stat-icon i {
    font-size: 24px;
    color: #0d6efd;
}

.stat-info h3 {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
}

.stat-info p {
    margin: 5px 0 0;
    color: #6c757d;
    font-size: 14px;
}

/* استایل لیست سفارشات */
.active-orders {
    height: 100%;
}

.order-list {
    max-height: 600px;
    overflow-y: auto;
}

.order-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
    transition: all 0.3s ease;
}

.order-item:hover {
    background: #f8f9fa;
}

.order-item.urgent {
    background: #fff3cd;
}

.order-info {
    flex: 1;
    display: flex;
    align-items: center;
}

.order-number {
    background: #e9ecef;
    padding: 5px 10px;
    border-radius: 5px;
    margin-left: 10px;
    font-weight: bold;
}

.order-details h6 {
    margin: 0;
    color: #2c3e50;
}

.order-details p {
    margin: 5px 0 0;
    color: #6c757d;
    font-size: 14px;
}

.order-status {
    text-align: center;
    margin: 0 20px;
}

.order-time {
    font-size: 12px;
    color: #6c757d;
    margin-top: 5px;
}

.order-actions {
    display: flex;
    gap: 5px;
}

/* استایل مدیریت صف */
.queue-management {
    height: 100%;
}

.queue-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    text-align: center;
}

.queue-stat-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
}

.stat-label {
    display: block;
    font-size: 12px;
    color: #6c757d;
    margin-bottom: 5px;
}

.stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
}

/* انیمیشن‌ها */
@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

.urgent {
    animation: pulse 2s infinite;
}

/* ریسپانسیو */
@media (max-width: 768px) {
    .order-item {
        flex-direction: column;
        text-align: center;
    }

    .order-status {
        margin: 10px 0;
    }

    .order-actions {
        margin-top: 10px;
    }

    .queue-stats {
        grid-template-columns: 1fr;
    }
}

/* اصلاح استایل گروه‌های input */
.input-group {
    direction: rtl;
    flex-direction: row-reverse;
}

.input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
    margin-right: -1px;
    margin-left: 0;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.input-group> :not(:last-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.input-group-text {
    border-top-right-radius: 0.375rem !important;
    border-bottom-right-radius: 0.375rem !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.input-group .form-control {
    border-top-left-radius: 0.375rem !important;
    border-bottom-left-radius: 0.375rem !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.input-group .btn {
    border-top-left-radius: 0.375rem !important;
    border-bottom-left-radius: 0.375rem !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.input-group .form-control:last-child {
    border-top-right-radius: 0.375rem !important;
    border-bottom-right-radius: 0.375rem !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.input-group .btn:last-child {
    border-top-right-radius: 0.375rem !important;
    border-bottom-right-radius: 0.375rem !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}
</style>
