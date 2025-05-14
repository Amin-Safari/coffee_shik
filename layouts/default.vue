<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary z-3 position-fixed w-100">
        <div class="container-fluid">
            <a class="navbar-brand ps-2" href="/"><i class="bi bi-cup-hot-fill"></i> Coffee Shik</a>
            <NuxtLink href="/login" class="btn btn-primary ms-3"> login</NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse bg-dark rounded-2 justify-content-center"
                id="navbarSupportedContent">
                <ul class="navbar-nav mb-2 mb-lg-0 ">
                    <li class="nav-item">
                        <NuxtLink class="nav-link me-" :class="{ 'active': $route.path === '/' }" href="/">خانه
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link me-5" :class="{ 'active': $route.path === '/menu' }"
                            href="/menu">منو
                        </NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link me-5" :class="{ 'active': $route.path === '/shop' }" href="/shop">
                            فروشگاه</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link me-5" :class="{ 'active': $route.path === '/about' }" href="/about">
                            درباره ما</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link me-5" :class="{ 'active': $route.path === '/contact' }"
                            href="/contact">تماس با ما</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link me-5" :class="{ 'active': $route.path === '/blog' }" href="/blog">بلاگ
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <slot />
    <div class="footer">
        <div class="container">
            <div class="row g-4">
                <div class="col-lg-4">
                    <div class="footer-about">
                        <h3>کافه شیک</h3>
                        <p>کافه شیک با افتخار از سال ۱۳۹۵ در خدمت شما عزیزان است. ما با ارائه بهترین قهوه‌ها و خدمات،
                            لحظات خوشی را برای شما رقم می‌زنیم.</p>
                        <div class="social-links">
                            <a href="#" class="social-link"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="social-link"><i class="bi bi-telegram"></i></a>
                            <a href="#" class="social-link"><i class="bi bi-whatsapp"></i></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="footer-links">
                        <h3>دسترسی سریع</h3>
                        <ul>
                            <li>
                                <NuxtLink to="/">صفحه اصلی</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/menu">منو</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/shop">فروشگاه</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/blog">بلاگ</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/about">درباره ما</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink to="/contact">تماس با ما</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="footer-contact">
                        <h3>اطلاعات تماس</h3>
                        <ul>
                            <li>
                                <i class="bi bi-geo-alt"></i>
                                <span>تهران، خیابان ولیعصر، خیابان فرشته، پلاک ۱۲۳</span>
                            </li>
                            <li>
                                <i class="bi bi-telephone"></i>
                                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
                            </li>
                            <li>
                                <i class="bi bi-envelope"></i>
                                <span>info@coffeeshik.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <p class="text-center mb-0">
                            تمامی حقوق برای کافه شیک محفوظ است &copy; {{ new Date().getFullYear() }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style>
/* استایل‌های عمومی */
html,
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
}

/* استایل‌های منو */
.nav-link {
    position: relative;
    transition: all 0.3s ease;
    padding: 8px 16px;
    border-radius: 4px;
}

.nav-link:hover {
    border-radius: 100px;
    background-color: rgba(255, 228, 196, 0.511);
    transform: translateY(-2px);
}

.nav-link.active {
    border-radius: 10px;
    background-color: rgba(255, 228, 196, 0.438);
    font-weight: bold;
}

/* استایل‌های محتوای اصلی */
.main-content {
    padding-top: 76px;
    /* ارتفاع منو */
    min-height: calc(100vh - 76px);
    width: 100%;
    overflow-x: hidden;
}

/* استایل‌های ریسپانسیو */
@media (max-width: 991px) {
    .navbar-collapse {
        background-color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-link {
        margin: 0.5rem 0;
    }
}

/* استایل‌های کانتینر */
.container-fluid {
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

/* استایل‌های کارت‌ها */
.card {
    margin-bottom: 1rem;
    overflow: hidden;
}

/* استایل‌های جدول */
.table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.footer {
    background-color: #1a1a1a;
    color: #fff;
    padding-top: 4rem;
    margin-top: 4rem;
}

.footer h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;
}

.footer h3::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background-color: var(--primary-color);
}

.footer-about p {
    color: #999;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: #fff;
    transition: all 0.3s ease;
}

.social-link:hover {
    background-color: var(--primary-color);
    color: #fff;
    transform: translateY(-3px);
}

.footer-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-links ul li {
    margin-bottom: 0.8rem;
}

.footer-links ul li a {
    color: #999;
    text-decoration: none;
    transition: all 0.3s ease;
}

.footer-links ul li a:hover {
    color: var(--primary-color);
    padding-right: 5px;
}

.footer-contact ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-contact ul li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    color: #999;
}

.footer-contact ul li i {
    color: var(--primary-color);
    margin-left: 1rem;
    margin-top: 5px;
}

.footer-bottom {
    background-color: #111;
    padding: 1.5rem 0;
    margin-top: 3rem;
}

.footer-bottom p {
    color: #999;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .footer {
        text-align: center;
        padding-top: 2rem;
    }

    .footer h3::after {
        right: 50%;
        transform: translateX(50%);
    }

    .social-links {
        justify-content: center;
    }

    .footer-contact ul li {
        justify-content: center;
    }

    .footer-contact ul li i {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
}
</style>