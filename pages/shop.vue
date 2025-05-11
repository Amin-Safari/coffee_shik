<template>
    <br><br>
    <div class="shop-page">
        <!-- فیلترها و جستجو -->
        <div class="filters-section py-4 bg-light">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <div class="search-box">
                            <input type="text" class="form-control" v-model="searchQuery"
                                placeholder="جستجوی محصولات...">
                            <i class="bi bi-search search-icon"></i>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="d-flex justify-content-end gap-3">
                            <select class="form-select" v-model="selectedCategory">
                                <option value="all">همه دسته‌بندی‌ها</option>
                                <option value="coffee-beans">دانه قهوه</option>
                                <option value="equipment">وسایل قهوه‌سازی</option>
                                <option value="accessories">لوازم جانبی</option>
                            </select>
                            <select class="form-select" v-model="sortBy">
                                <option value="newest">جدیدترین</option>
                                <option value="price-asc">قیمت: کم به زیاد</option>
                                <option value="price-desc">قیمت: زیاد به کم</option>
                                <option value="popular">پرفروش‌ترین</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- محصولات -->
        <div class="products-section py-5">
            <div class="container">
                <div class="row g-4">
                    <!-- دانه‌های قهوه -->
                    <div class="col-md-4" v-for="product in filteredProducts" :key="product.id">
                        <div class="product-card">
                            <div class="product-image">
                                <img :src="product.image"   :alt="product.name"
                                    class="product-img">
                                <div class="product-badge" v-if="product.isNew">جدید</div>
                            </div>
                            <div class="product-info">
                                <h3 class="product-title">{{ product.name }}</h3>
                                <p class="product-description">{{ product.description }}</p>
                                <div class="product-meta">
                                    <span class="product-price">{{ product.price.toLocaleString() }} تومان</span>
                                    <div class="product-rating">
                                        <i class="bi bi-star-fill" v-for="n in 5" :key="n"
                                            :class="{ 'text-warning': n <= product.rating }"></i>
                                    </div>
                                </div>
                                <div class="product-actions">
                                    <button class="btn btn-primary w-100" @click="addToCart(product)">
                                        <i class="bi bi-cart-plus me-2"></i>افزودن به سبد خرید
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- سبد خرید -->
        <div class="cart-section py-4 bg-light" v-if="cart.length > 0">
            <div class="container">
                <h3 class="mb-4">سبد خرید شما</h3>
                <div class="cart-items">
                    <div class="cart-item" v-for="item in cart" :key="item.id">
                        <div class="cart-item-info">
                            <img :src="item.image"  :alt="item.name" class="cart-item-image">
                            <div>
                                <h4>{{ item.name }}</h4>
                                <p class="text-muted">{{ item.price.toLocaleString() }} تومان</p>
                            </div>
                        </div>
                        <div class="cart-item-actions">
                            <button class="btn btn-sm btn-outline-danger" @click="removeFromCart(item)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="cart-summary mt-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4>جمع کل:</h4>
                        <h4>{{ totalPrice.toLocaleString() }} تومان</h4>
                    </div>
                    <button class="btn btn-success w-100 mt-3">
                        <i class="bi bi-credit-card me-2"></i>پرداخت و ثبت سفارش
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('newest')
const cart = ref([])

const products = [
    {
        id: 1,
        name: 'دانه قهوه اتیوپی',
        description: 'دانه قهوه تازه برشته شده با طعم میوه‌ای و اسیدیته متعادل',
        price: 250000,
        category: 'coffee-beans',
        rating: 5,
        image: '/images/items/etiopia.jpg',
        isNew: true
    },
    {
        id: 2,
        name: 'دانه قهوه کلمبیا',
        description: 'دانه قهوه با طعم شکلاتی و کاراملی',
        price: 280000,
        category: 'coffee-beans',
        rating: 4,
        image: '/images/items/colomba.jpg',
        isNew: false
    },
    {
        id: 3,
        name: 'فرنچ پرس',
        description: 'فرنچ پرس استیل با طراحی مدرن و کیفیت عالی',
        price: 450000,
        category: 'equipment',
        rating: 5,
        image: '/images/items/cup-straw.jpg',
        isNew: true
    },
    {
        id: 4,
        name: 'آسیاب قهوه دستی',
        description: 'آسیاب قهوه دستی با تنظیم درجه آسیاب',
        price: 350000,
        category: 'equipment',
        rating: 4,
        image: '/images/items/asiab.jpg',
        isNew: false
    },
    {
        id: 5,
        name: 'فیلتر کاغذی',
        description: 'بسته ۱۰۰ عددی فیلتر کاغذی قهوه',
        price: 45000,
        category: 'accessories',
        rating: 4,
        image: '/images/items/filter.jpg',
        isNew: false
    },
    {
        id: 6,
        name: 'ترازوی دیجیتال',
        description: 'ترازوی دیجیتال دقیق برای اندازه‌گیری قهوه',
        price: 180000,
        category: 'equipment',
        rating: 5,
        image: '/images/items/scale.jpg',
        isNew: true
    }
]

const filteredProducts = computed(() => {
    let result = products

    // فیلتر بر اساس دسته‌بندی
    if (selectedCategory.value !== 'all') {
        result = result.filter(p => p.category === selectedCategory.value)
    }

    // فیلتر بر اساس جستجو
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        )
    }

    // مرتب‌سازی
    switch (sortBy.value) {
        case 'price-asc':
            result = [...result].sort((a, b) => a.price - b.price)
            break
        case 'price-desc':
            result = [...result].sort((a, b) => b.price - a.price)
            break
        case 'popular':
            result = [...result].sort((a, b) => b.rating - a.rating)
            break
        default:
            result = [...result].sort((a, b) => b.isNew - a.isNew)
    }

    return result
})

const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + item.price, 0)
})

const addToCart = (product) => {
    cart.value.push(product)
}

const removeFromCart = (product) => {
    const index = cart.value.findIndex(item => item.id === product.id)
    if (index > -1) {
        cart.value.splice(index, 1)
    }
}
</script>

<style scoped>
.search-box {
    position: relative;
}

.search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
}

.product-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-image {
    height: 200px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.product-img {
    width: 100%;
    height: 100%;
    object-fit: fill;
}

.product-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--primary-color);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
}

.product-info {
    padding: 1.5rem;
}

.product-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.product-description {
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.product-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.product-price {
    font-weight: bold;
    color: var(--primary-color);
}

.product-rating {
    color: #ffc107;
}

.cart-item {
    background: white;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-item-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.cart-item-info i {
    font-size: 2rem;
    color: var(--primary-color);
}

.cart-item-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
}

@media (max-width: 768px) {
    .filters-section .row {
        gap: 1rem;
    }

    .filters-section .col-md-8 {
        justify-content: start !important;
    }
}
</style>
