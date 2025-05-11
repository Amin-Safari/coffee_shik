<template>
    <br><br><br>
    <AppLayout>

        <div class="bg-image">
            <div class="bga">
            <div class="customer-dashboard container ">
                <div class="row g-4">
                    <!-- کارت منو -->
                <div class="col-md-8">
                    <div class="card menu-card bga rounded-1">
                        <div class="card-body bga ">
                            <div class="d-flex justify-content-between align-items-center  mb-4">
                                <h5 class="card-title mb-0">
                                    <i class="fas fa-utensils me-2"></i>
                                    منوی کافه
                                </h5>
                                <div class="menu-filters">
                                    <button v-for="category in categories" :key="category.id" class="btn btn-sm"
                                        :class="selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'"
                                        @click="selectedCategory = category.id">
                                        {{ category.name }}
                                    </button>
                                </div>
                            </div>

                            <div class="menu-items ">
                                <div v-for="item in filteredMenuItems" :key="item.id" class="menu-item">
                                    <div class="menu-item-image">
                                        <img :src="item.image" :alt="item.name" />
                                        <div class="menu-item-overlay">
                                            <button class="btn btn-light btn-sm" @click="addToCart(item)">
                                                <i class="fas fa-plus"></i>
                                                افزودن به سبد خرید
                                            </button>
                                        </div>
                                    </div>
                                    <div class="menu-item-details bg-dark text-white">
                                        <h6>{{ item.name }}</h6>
                                        <p class="text-muted">{{ item.description }}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span class="price">{{ formatPrice(item.price) }}</span>
                                            <div class="quantity-control" v-if="getCartItemQuantity(item.id)">
                                                <button class="btn btn-sm btn-outline-primary"
                                                    @click="decreaseQuantity(item)">
                                                    <i class="fas fa-minus"></i>
                                                </button>
                                                <span class="mx-2">{{ getCartItemQuantity(item.id) }}</span>
                                                <button class="btn btn-sm btn-outline-primary"
                                                    @click="increaseQuantity(item)">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- کارت سبد خرید -->
                <div class="col-md-4">
                    <div class="card cart-card bga">
                        <div class="card-body">
                            <h5 class="card-title">
                                <i class="fas fa-shopping-cart me-2"></i>
                                سبد خرید
                            </h5>

                            <div v-if="cart.length === 0" class="empty-cart">
                                <i class="fas fa-shopping-basket fa-3x text-muted mb-3"></i>
                                <p class="text-muted">سبد خرید شما خالی است</p>
                            </div>

                            <div v-else>
                                <div class="cart-items">
                                    <div v-for="item in cart" :key="item.id" class="cart-item">
                                        <div class="cart-item-details">
                                            <h6>{{ item.name }}</h6>
                                            <p class="text-muted">{{ formatPrice(item.price) }}</p>
                                        </div>
                                        <div class="cart-item-quantity">
                                            <button class="btn btn-sm btn-outline-primary"
                                                @click="decreaseQuantity(item)">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                            <span class="mx-2">{{ item.quantity }}</span>
                                            <button class="btn btn-sm btn-outline-primary"
                                                @click="increaseQuantity(item)">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="cart-summary">
                                    <div class="d-flex justify-content-between mb-2">
                                        <span>جمع کل:</span>
                                        <span>{{ formatPrice(cartTotal) }}</span>
                                    </div>
                                    <div class="d-flex justify-content-between mb-2">
                                        <span>مالیات (۹٪):</span>
                                        <span>{{ formatPrice(tax) }}</span>
                                    </div>
                                    <div class="d-flex justify-content-between mb-3">
                                        <span class="fw-bold">مبلغ قابل پرداخت:</span>
                                        <span class="fw-bold">{{ formatPrice(finalTotal) }}</span>
                                    </div>

                                    <button class="btn btn-primary w-100" @click="checkout">
                                        <i class="fas fa-credit-card me-2"></i>
                                        پرداخت و ثبت سفارش
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- کارت سفارشات اخیر -->
                <div class="col-md-12">
                    <div class="card bga">
                        <div class="card-body">
                            <h5 class="card-title">
                                <i class="fas fa-history me-2"></i>
                                سفارشات اخیر
                            </h5>

                            <div class="table-responsive ">
                                <table class="table bga rounded-1">
                                    <thead>
                                        <tr>
                                            <th>شماره سفارش</th>
                                            <th>تاریخ</th>
                                            <th>وضعیت</th>
                                            <th>مبلغ کل</th>
                                            <th>عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bga">
                                        <tr v-for="order in recentOrders" :key="order.id">
                                            <td>#{{ order.id }}</td>
                                            <td>{{ formatDate(order.date) }}</td>
                                            <td>
                                                <span :class="['badge', getOrderStatusClass(order.status)]">
                                                    {{ getOrderStatusText(order.status) }}
                                                </span>
                                            </td>
                                            <td>{{ formatPrice(order.total) }}</td>
                                            <td>
                                                <button class="btn btn-sm btn-outline-primary"
                                                    @click="viewOrderDetails(order)">
                                                    <i class="fas fa-eye me-1"></i>
                                                    جزئیات
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- مودال جزئیات سفارش -->
            <div class="modal fade" :class="{ show: showOrderModal }" v-if="showOrderModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" @click="showOrderModal = false"></button>
                            <h5 class="modal-title">جزئیات سفارش #{{ selectedOrder?.id }}</h5>
                        </div>
                        <div class="modal-body">
                            <div v-if="selectedOrder">
                                <div class="order-details">
                                    <div class="order-info mb-4">
                                        <p><strong>تاریخ سفارش:</strong> {{ formatDate(selectedOrder.date) }}</p>
                                        <p><strong>وضعیت:</strong> {{ getOrderStatusText(selectedOrder.status) }}</p>
                                        <p><strong>میز:</strong> #{{ selectedOrder.tableNumber }}</p>
                                    </div>
                                    <div class="order-items">
                                        <h6>اقلام سفارش:</h6>
                                        <div v-for="item in selectedOrder.items" :key="item.id" class="order-item">
                                            <div class="d-flex justify-content-between">
                                                <span>{{ item.quantity }}x {{ item.name }}</span>
                                                <span>{{ formatPrice(item.price * item.quantity) }}</span>
                                            </div>
                                            <small class="text-muted" v-if="item.notes">{{ item.notes }}</small>
                                        </div>
                                    </div>
                                    <div class="order-total mt-4">
                                        <div class="d-flex justify-content-between">
                                            <span>جمع کل:</span>
                                            <span>{{ formatPrice(selectedOrder.total) }}</span>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <span>مالیات:</span>
                                            <span>{{ formatPrice(selectedOrder.tax) }}</span>
                                        </div>
                                        <div class="d-flex justify-content-between fw-bold">
                                            <span>مبلغ قابل پرداخت:</span>
                                            <span>{{ formatPrice(selectedOrder.finalTotal) }}</span>
                                        </div>
                                    </div>
                                </div>
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
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

// داده‌های نمونه
const categories = [
    { id: 'all', name: 'همه' },
    { id: 'coffee', name: 'قهوه' },
    { id: 'tea', name: 'چای' },
    { id: 'dessert', name: 'دسر' },
    { id: 'snack', name: 'اسنک' }
]

const menuItems = ref([
    {
        id: 1,
        name: 'کاپوچینو',
        description: 'اسپرسو با شیر داغ و فوم شیر',
        price: 45000,
        category: 'coffee',
        image: '/images/cappuccino.jpg'
    },
    {
        id: 2,
        name: 'لاته',
        description: 'اسپرسو با شیر داغ و فوم شیر کمتر',
        price: 48000,
        category: 'coffee',
        image: '/images/latte.jpg'
    },
    {
        id: 3,
        name: 'کیک شکلاتی',
        description: 'کیک شکلاتی با سس شکلات',
        price: 55000,
        category: 'dessert',
        image: '/images/chocolate-cake.jpg'
    }
])

const cart = ref([])
const selectedCategory = ref('all')
const showOrderModal = ref(false)
const selectedOrder = ref(null)

const recentOrders = ref([
    {
        id: 1,
        date: new Date(),
        status: 'completed',
        total: 150000,
        tax: 13500,
        finalTotal: 163500,
        tableNumber: 5,
        items: [
            { id: 1, name: 'کاپوچینو', quantity: 2, price: 45000, notes: 'با شکر کم' },
            { id: 3, name: 'کیک شکلاتی', quantity: 1, price: 55000 }
        ]
    }
])

// فیلتر کردن آیتم‌های منو بر اساس دسته‌بندی
const filteredMenuItems = computed(() => {
    if (selectedCategory.value === 'all') {
        return menuItems.value
    }
    return menuItems.value.filter(item => item.category === selectedCategory.value)
})

// محاسبه مجموع سبد خرید
const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// محاسبه مالیات
const tax = computed(() => {
    return Math.round(cartTotal.value * 0.09)
})

// محاسبه مبلغ نهایی
const finalTotal = computed(() => {
    return cartTotal.value + tax.value
})

// فرمت قیمت
const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
}

// فرمت تاریخ
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fa-IR')
}

// دریافت تعداد آیتم در سبد خرید
const getCartItemQuantity = (itemId) => {
    const item = cart.value.find(item => item.id === itemId)
    return item ? item.quantity : 0
}

// افزودن به سبد خرید
const addToCart = (item) => {
    const existingItem = cart.value.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
        existingItem.quantity++
    } else {
        cart.value.push({
            ...item,
            quantity: 1
        })
    }
    toast.success(`${item.name} به سبد خرید اضافه شد`)
}

// افزایش تعداد
const increaseQuantity = (item) => {
    const cartItem = cart.value.find(cartItem => cartItem.id === item.id)
    if (cartItem) {
        cartItem.quantity++
    }
}

// کاهش تعداد
const decreaseQuantity = (item) => {
    const cartItem = cart.value.find(cartItem => cartItem.id === item.id)
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--
        } else {
            cart.value = cart.value.filter(cartItem => cartItem.id !== item.id)
        }
    }
}

// دریافت کلاس وضعیت سفارش
const getOrderStatusClass = (status) => {
    switch (status) {
        case 'completed':
            return 'bg-success'
        case 'preparing':
            return 'bg-warning'
        case 'pending':
            return 'bg-info'
        default:
            return 'bg-secondary'
    }
}

// دریافت متن وضعیت سفارش
const getOrderStatusText = (status) => {
    switch (status) {
        case 'completed':
            return 'تکمیل شده'
        case 'preparing':
            return 'در حال آماده‌سازی'
        case 'pending':
            return 'در انتظار تایید'
        default:
            return 'نامشخص'
    }
}

// مشاهده جزئیات سفارش
const viewOrderDetails = (order) => {
    selectedOrder.value = order
    showOrderModal.value = true
}

// پرداخت و ثبت سفارش
const checkout = () => {
    if (cart.value.length === 0) {
        toast.error('سبد خرید شما خالی است')
        return
    }

    // اینجا درخواست API برای ثبت سفارش قرار می‌گیرد
    toast.success('سفارش شما با موفقیت ثبت شد')
    cart.value = []
}
</script>

<style scoped>
.customer-dashboard {
    animation: fadeIn 0.5s ease-out;
}

.menu-card {
    height: 100%;
}

.menu-filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.menu-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.menu-item {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.menu-item:hover {
    transform: translateY(-5px);
}

.menu-item-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.menu-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.menu-item-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.menu-item:hover .menu-item-overlay {
    opacity: 1;
}

.menu-item-details {
    padding: 1rem;
}

.cart-card {
    position: sticky;
    top: 1rem;
}

.empty-cart {
    text-align: center;
    padding: 2rem 0;
}

.cart-items {
    max-height: 400px;
    overflow-y: auto;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-summary {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
}

.order-item {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
}

.order-item:last-child {
    border-bottom: none;
}

.bg-image{
    background-image: url('@/assets/images/bg-image.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
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
    .menu-items {
        grid-template-columns: 1fr;
    }

    .cart-card {
        position: static;
    }
}
</style>