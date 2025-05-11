<template>
    <div class="hero-section">
        <div class="hero-content">
            <h1 class="display-4 fw-bold text-white mb-4">کافه شیک</h1>
            <p class="lead text-white mb-4">تجربه‌ای متفاوت از طعم‌های اصیل قهوه</p>
            <div class="hero-buttons">
                <NuxtLink to="/shop" class="btn btn-warning btn-lg ms-3">
                    <i class="bi bi-cart3 me-2"></i>سفارش آنلاین
                </NuxtLink>
                <NuxtLink to="/about" class="btn btn-outline-light btn-lg">
                    <i class="bi bi-info-circle me-2"></i>درباره ما
                </NuxtLink>
            </div>
        </div>
    </div>

    <div class="features-section py-5">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="feature-card text-center p-4">
                        <i class="bi bi-cup-hot-fill feature-icon"></i>
                        <h3 class="mt-3">قهوه‌های ویژه</h3>
                        <p>انتخابی از بهترین دانه‌های قهوه جهان با تفت‌دهی حرفه‌ای</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center p-4">
                        <i class="bi bi-clock-fill feature-icon"></i>
                        <h3 class="mt-3">۲۴ ساعته</h3>
                        <p>در هر ساعت از شبانه‌روز پذیرای شما هستیم</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-card text-center p-4">
                        <i class="bi bi-wifi feature-icon"></i>
                        <h3 class="mt-3">فضای کاری</h3>
                        <p>محیطی آرام با اینترنت پرسرعت برای کار و مطالعه</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="menu-preview py-5 bg-light">
        <div class="container">
            <h2 class="text-center mb-5">محصولات ویژه ما</h2>
            <div class="row g-4">
                <div class="col-md-3">
                    <div class="menu-item">
                        <div class="menu-item-image">
                            <i class="bi bi-cup-hot-fill"></i>
                        </div>
                        <h4>لاته</h4>
                        <p>ترکیبی از اسپرسو و شیر با طعمی نرم و خامه‌ای</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="menu-item">
                        <div class="menu-item-image">
                            <i class="bi bi-cup-hot-fill"></i>
                        </div>
                        <h4>کاپوچینو</h4>
                        <p>اسپرسو با کف شیر و پودر کاکائو</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="menu-item">
                        <div class="menu-item-image">
                            <i class="bi bi-cup-hot-fill"></i>
                        </div>
                        <h4>آمریکانو</h4>
                        <p>اسپرسو با آب داغ برای طعمی قوی‌تر</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="menu-item">
                        <div class="menu-item-image">
                            <i class="bi bi-cup-hot-fill"></i>
                        </div>
                        <h4>موکا</h4>
                        <p>ترکیبی از اسپرسو، شیر و شکلات</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="cta-section py-5 text-center">
        <div class="container">
            <h2 class="mb-4">به جمع ما بپیوندید</h2>
            <p class="lead mb-4">با عضویت در باشگاه مشتریان از تخفیف‌های ویژه و پیشنهادات خاص بهره‌مند شوید</p>
            <NuxtLink to="/login" class="btn btn-primary btn-lg">
                <i class="bi bi-person-plus me-2"></i>ثبت‌نام کنید
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.hero-section {
    height: calc(100vh - 76px);
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('/images/coffee-bg.jpg') center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* margin-top: 76px; */
}

.hero-content {
    max-width: 800px;
    padding: 2rem;
}

.feature-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 3rem;
    color: var(--primary-color);
}

.menu-item {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.menu-item:hover {
    transform: translateY(-5px);
}

.menu-item-image {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.cta-section {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

@media (max-width: 768px) {
    .hero-section {
        height: auto;
        padding: 4rem 0;
    }

    .hero-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .hero-buttons .btn {
        width: 100%;
    }
}
</style>
