<template>
    <br><br>
    <div class="blog-page">
        <!-- بخش جستجو و فیلتر -->
        <div class="filters-section py-4 bg-light">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <div class="search-box">
                            <input type="text" class="form-control" v-model="searchQuery"
                                placeholder="جستجوی مقالات...">
                            <i class="bi bi-search search-icon"></i>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="d-flex justify-content-end gap-3">
                            <select class="form-select" v-model="selectedCategory">
                                <option value="all">همه دسته‌بندی‌ها</option>
                                <option value="coffee">قهوه</option>
                                <option value="equipment">وسایل قهوه‌سازی</option>
                                <option value="recipes">دستور پخت</option>
                                <option value="news">اخبار</option>
                            </select>
                            <select class="form-select" v-model="sortBy">
                                <option value="newest">جدیدترین</option>
                                <option value="popular">پربازدیدترین</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- مقالات -->
        <div class="articles-section py-5">
            <div class="container">
                <div class="row g-4">
                    <div class="col-md-6 col-lg-4" v-for="article in filteredArticles" :key="article.id">
                        <div class="article-card">
                            <div class="article-image">
                                <img :src="article.image" :alt="article.title" class="article-img">
                                <div class="article-category">{{ article.category }}</div>
                            </div>
                            <div class="article-content">
                                <div class="article-meta">
                                    <span class="article-date">
                                        <i class="bi bi-calendar3 me-1"></i>
                                        {{ article.date }}
                                    </span>
                                    <span class="article-views">
                                        <i class="bi bi-eye me-1"></i>
                                        {{ article.views }}
                                    </span>
                                </div>
                                <h3 class="article-title">{{ article.title }}</h3>
                                <p class="article-excerpt">{{ article.excerpt }}</p>
                                <NuxtLink :to="`/blog/${article.slug}`" class="btn btn-outline-primary">
                                    ادامه مطلب
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- پاگینیشن -->
        <div class="pagination-section py-4">
            <div class="container">
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="currentPage--">قبلی</a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page"
                            :class="{ active: currentPage === page }">
                            <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="currentPage++">بعدی</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = 6

const articles = [
    {
        id: 1,
        title: 'راهنمای کامل انتخاب دانه قهوه',
        excerpt: 'در این مقاله به شما کمک می‌کنیم تا بهترین دانه قهوه را برای خود انتخاب کنید...',
        content: '...',
        image: '/images/blog/coffee-beans.jpg',
        category: 'قهوه',
        date: '۱۴۰۲/۱۲/۱۵',
        views: 1250,
        slug: 'coffee-beans-guide'
    },
    {
        id: 2,
        title: 'آموزش استفاده از فرنچ پرس',
        excerpt: 'نحوه استفاده صحیح از فرنچ پرس برای تهیه قهوه‌ای خوش طعم...',
        content: '...',
        image: '/images/blog/french-press.jpg',
        category: 'وسایل قهوه‌سازی',
        date: '۱۴۰۲/۱۲/۱۰',
        views: 980,
        slug: 'french-press-guide'
    },
    {
        id: 3,
        title: 'دستور پخت لاته آرت',
        excerpt: 'آموزش قدم به قدم طراحی لاته آرت برای قهوه‌های شما...',
        content: '...',
        image: '/images/blog/latte-art.jpg',
        category: 'دستور پخت',
        date: '۱۴۰۲/۱۲/۰۵',
        views: 1500,
        slug: 'latte-art-tutorial'
    },
    {
        id: 4,
        title: 'تاریخچه قهوه در ایران',
        excerpt: 'نگاهی به تاریخچه ورود و گسترش قهوه در ایران...',
        content: '...',
        image: '/images/blog/coffee-history.jpg',
        category: 'اخبار',
        date: '۱۴۰۲/۱۱/۲۸',
        views: 2100,
        slug: 'coffee-history-iran'
    }
]

const filteredArticles = computed(() => {
    let result = articles

    // فیلتر بر اساس دسته‌بندی
    if (selectedCategory.value !== 'all') {
        result = result.filter(a => a.category === selectedCategory.value)
    }

    // فیلتر بر اساس جستجو
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(a =>
            a.title.toLowerCase().includes(query) ||
            a.excerpt.toLowerCase().includes(query)
        )
    }

    // مرتب‌سازی
    if (sortBy.value === 'popular') {
        result = [...result].sort((a, b) => b.views - a.views)
    } else {
        result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    return result
})

const totalPages = computed(() => Math.ceil(filteredArticles.value.length / itemsPerPage))
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

.article-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.article-card:hover {
    transform: translateY(-5px);
}

.article-image {
    height: 200px;
    position: relative;
    overflow: hidden;
}

.article-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.article-category {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--primary-color);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
}

.article-content {
    padding: 1.5rem;
}

.article-meta {
    display: flex;
    gap: 1rem;
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.article-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.article-excerpt {
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.pagination .page-link {
    color: var(--primary-color);
}

.pagination .page-item.active .page-link {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
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
