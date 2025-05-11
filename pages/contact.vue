<template>
    <div class="contact-page">
        <!-- بخش اطلاعات تماس -->
        <div class="contact-info-section py-5">
            <div class="container">
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="contact-card text-center">
                            <i class="bi bi-geo-alt-fill contact-icon"></i>
                            <h3>آدرس</h3>
                            <p>تهران، خیابان ولیعصر، خیابان فرشته، پلاک ۱۲۳</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="contact-card text-center">
                            <i class="bi bi-telephone-fill contact-icon"></i>
                            <h3>تلفن تماس</h3>
                            <p>۰۲۱-۱۲۳۴۵۶۷۸</p>
                            <p>۰۹۱۲۳۴۵۶۷۸۹</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="contact-card text-center">
                            <i class="bi bi-envelope-fill contact-icon"></i>
                            <h3>ایمیل</h3>
                            <p>info@coffeeshik.com</p>
                            <p>support@coffeeshik.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- بخش فرم تماس -->
        <div class="contact-form-section py-5 bg-light bga">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="contact-form-card bga">
                            <h2 class="text-center mb-4">ارسال پیام</h2>
                            <form @submit.prevent="handleSubmit">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">نام و نام خانوادگی</label>
                                            <input type="text" class="form-control" v-model="form.name" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">ایمیل</label>
                                            <input type="email" class="form-control" v-model="form.email" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">موضوع</label>
                                            <select class="form-select" v-model="form.subject" required>
                                                <option value="">انتخاب کنید</option>
                                                <option value="suggestion">پیشنهاد</option>
                                                <option value="complaint">شکایت</option>
                                                <option value="cooperation">همکاری</option>
                                                <option value="other">سایر</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">تلفن تماس</label>
                                            <input type="tel" class="form-control" v-model="form.phone" required>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label class="form-label">پیام</label>
                                            <textarea class="form-control" rows="5" v-model="form.message"
                                                required></textarea>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                                            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                                            {{ loading ? 'در حال ارسال...' : 'ارسال پیام' }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- بخش نقشه -->
        <div class="map-section">
            <div class="map-container">
                <!-- اینجا می‌توانید یک نقشه گوگل یا هر نقشه دیگری قرار دهید -->
                <div class="map-placeholder">
                    <i class="bi bi-geo-alt-fill"></i>
                    <p>نقشه موقعیت کافه</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const loading = ref(false)
const form = ref({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
})

const handleSubmit = async () => {
    try {
        loading.value = true
        // اینجا می‌توانید منطق ارسال فرم را پیاده‌سازی کنید
        await new Promise(resolve => setTimeout(resolve, 1000)) // شبیه‌سازی ارسال
        toast.success('پیام شما با موفقیت ارسال شد')
        form.value = {
            name: '',
            email: '',
            subject: '',
            phone: '',
            message: ''
        }
    } catch (error) {
        toast.error('خطا در ارسال پیام')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.contact-page {
    padding-top: 76px;
}

.contact-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.contact-card:hover {
    transform: translateY(-5px);
}

.contact-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.contact-form-card {
    background: white;
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.map-container {
    height: 400px;
    background: #f8f9fa;
}

.map-placeholder {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    font-size: 3rem;
}

.map-placeholder p {
    margin-top: 1rem;
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .contact-card {
        margin-bottom: 1rem;
    }
}
</style>
