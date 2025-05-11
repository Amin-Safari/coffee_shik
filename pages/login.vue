<template>
    <br><br>
    <div class="login-page">
        <div class="login-container">
            <div class="login-card bg-dark">
                <div class="text-center mb-4">
                    <i class="bi bi-cup-hot-fill text-warning" style="font-size: 50px;"> Coffee Shik </i>
                    <h2 class="welcome-text">به کافه شیک خوش آمدید</h2>
                    <p class="text-muted">لطفاً وارد حساب کاربری خود شوید</p>
                </div>

                <form @submit.prevent="handleLogin" class="login-form">
                    <div class="form-group mb-3">
                        <label class="form-label">نام کاربری</label>
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="username"
                                placeholder="نام کاربری خود را وارد کنید" required />
                            <span class="input-group-text bg-dark">
                                <i class="fas fa-user"></i>
                            </span>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <label class="form-label">رمز عبور</label>
                        <div class="input-group">
                            <button type="button" class="btn btn-outline-secondary"
                                @click="showPassword = !showPassword">
                                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                            <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="password"
                                placeholder="رمز عبور خود را وارد کنید" required />
                            <span class="input-group-text bg-dark">
                                <i class="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="remember" v-model="rememberMe" />
                            <label class="form-check-label" for="remember">مرا به خاطر بسپار</label>
                        </div>
                        <a href="#" class="forgot-password">رمز عبور را فراموش کرده‌اید؟</a>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 login-btn" :disabled="loading">
                        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                        {{ loading ? 'در حال ورود...' : 'ورود به سیستم' }}
                    </button>
                </form>

                <div class="role-selector mt-4">
                    <p class="text-center mb-3">ورود به عنوان:</p>
                    <div class="d-flex justify-content-center gap-2">
                        <button v-for="role in roles" :key="role.id" class="btn btn-outline-primary role-btn"
                            :class="{ active: selectedRole === role.id }" @click="selectedRole = role.id">
                            <i :class="role.icon"></i>
                            {{ role.name }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const selectedRole = ref('customer')

const roles = [
    { id: 'customer', name: 'مشتری', icon: 'fas fa-user' },
    { id: 'waiter', name: 'گارسون', icon: 'fas fa-concierge-bell' },
    { id: 'barista', name: 'باریستا', icon: 'fas fa-coffee' },
    { id: 'manager', name: 'مدیر', icon: 'fas fa-user-tie' },
    { id: 'reception', name: 'پذیرش', icon: 'fas fa-headset' },
    { id: 'finance', name: 'مالی', icon: 'fas fa-calculator' }
]

const handleLogin = async () => {
    try {
        loading.value = true
        const success = await authStore.login({
            username: username.value,
            password: password.value,
            role: selectedRole.value
        })

        if (success) {
            toast.success('ورود موفقیت‌آمیز')
            router.push(`/${selectedRole.value}/dashboard`)
        } else {
            toast.error('نام کاربری یا رمز عبور اشتباه است')
        }
    } catch (error) {
        toast.error('خطا در ورود به سیستم')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-page {
    min-height: calc(20vh - 7000006px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    padding: 20px;
}

.login-container {
    width: 100%;
    max-width: 450px;
    animation: slideUp 0.5s ease-out;
}

.login-card {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.logo {
    width: 120px;
    height: auto;
    animation: pulse 2s infinite;
}

.welcome-text {
    color: var(--primary-color);
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.login-form {
    margin-top: 2rem;
}

.form-control {
    border-radius: 8px;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(44, 62, 80, 0.25);
}

.input-group {
    direction: rtl;
    flex-direction: row-reverse;
}

.input-group-text {
    border-top-right-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.input-group .form-control {
    border-top-left-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.input-group .btn {
    border-top-left-radius: 8px !important;
    border-bottom-left-radius: 8px !important;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
}

.input-group .form-control:last-child {
    border-top-right-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.input-group .btn:last-child {
    border-top-right-radius: 8px !important;
    border-bottom-right-radius: 8px !important;
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}

.login-btn {
    padding: 0.75rem;
    border-radius: 8px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.role-btn {
    border-radius: 8px;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
}

.role-btn:hover {
    transform: translateY(-2px);
}

.role-btn.active {
    background-color: var(--primary-color);
    color: white;
}

.forgot-password {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.forgot-password:hover {
    color: var(--secondary-color);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

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

@media (max-width: 576px) {
    .login-card {
        padding: 1.5rem;
    }

    .role-btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
    }
}
</style>